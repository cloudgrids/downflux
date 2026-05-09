# DownFlux

A modular media extraction and download library built with Node.js, TypeScript, `undici`, and `ffmpeg-static`.

DownFlux is organized around small services:
--- A public service validates/builds a request,
--- `ExecutionCoordinator` orchestrates extraction and download planning,
--- Transformers turn HTML into metadata,
--- Pipelines turn metadata into downloadable items
--- Downloaders pulls the buffer from url
--- File services write those items to the requested output.

## Current Project Configuration

- **Package:** `downflux@1.0.0`
- **Runtime:** Node.js `>=18.0.0`
- **Package manager:** `pnpm@10.27.0`
- **Language:** TypeScript with `strict` and `strictNullChecks` enabled
- **Build tool:** `tsup`
- **Build target:** Node 18
- **Package outputs:** CommonJS `dist/index.js`, ESM `dist/index.mjs`, and types `dist/index.d.ts`
- **Source entry point:** `src/index.ts`
- **Build entry point:** `src/index.ts`
- **Published files:** `dist`
- **Core dependencies:** `undici`, `execa`, `ffmpeg-static`
- **Development dependencies:** TypeScript, ESLint, Prettier, Jest, ts-jest, tsx, tsup

## Scripts

- `pnpm build` - Builds CJS, ESM, source maps, and declaration files into `dist/`.
- `pnpm dev` - Runs `tsup` in watch mode.
- `pnpm test` - Runs Jest with the project Jest config.
- `pnpm test:watch` - Runs Jest in watch mode.
- `pnpm test:run` - Runs `test/run.ts` through `tsx` for manual extraction checks.
- `pnpm lint:test` - Runs ESLint.
- `pnpm lint:fix` - Runs ESLint with auto-fix.
- `pnpm format` - Formats `src/**/*.ts` with Prettier.
- `pnpm make:index` - Runs `scripts/make-index.ts`.
- `pnpm release` - Runs `standard-version`.

## Installation

```bash
pnpm add downflux
```

```bash
npm install downflux
```

```bash
yarn add downflux
```

## Quick Start

```typescript
import { OkPornProvider, OutputType } from 'downflux';

async function main() {
  const service = new OkPornProvider('https://ok.porn/albums/1300/');

  const album = await service
    .setOutput(OutputType.DEVICE, { directoryPath: 'downloads' })
    .setJobOptions({
      concurrency: 5,
      extractConcurrency: 3,
      pipelineHooks: [
        {
          onExtract: (item) => console.log('Queued:', item.downloadUrl),
          onDownload: ({ result }) => console.log('Downloaded:', result.extendedFilename)
        }
      ]
    })
    .getAlbum('1300');

  console.log(album.albumTitle);
}

main().catch(console.error);
```

## Public Services

### OkPornProvider

- **Service name:** `OkPornProvider`
- **Exposes:**
  - `getAlbums(param: Range)` returns `Promise<OkPornAlbumOutput[]>`
  - `getAlbum(id: string)` returns `Promise<OkPornAlbumOutput>`
  - `getModels(range: Range)` returns `Promise<OkPornModelOutput[]>`
  - `getTags(startsWith: string)` returns `Promise<OkPornTagOutput[]>`
  - `getChannels(range: Range)` returns `Promise<OkPornChannelOutput[]>`
  - `getVideos(range: Range, options: { videoQualities?: VideoQuality[] })` returns `Promise<OkPornVideoOutput[]>`
  - `getVideo(id: string, options: { videoQualities?: VideoQuality[] })` returns `Promise<OkPornVideoOutput>`
- **Description:** Handles `https://ok.porn/` URLs.

### DefaultProvider

- **Service name:** `DefaultProvider`
- **Exposes:**
  - `getRawHtml()` returns `Promise<DefaultExtractorResult[]>`
  - `getLinks()` returns `Promise<DefaultExtractorResult[]>`
- **Description:** Handles any syntactically valid URL as a generic fallback.

### CoomerProvider

- **Service name:** `CoomerProvider`
- **Exposes:**
  - `getPosts()` returns `Promise<DefaultExtractorResult[]>`
  - `getAttachments()` returns `Promise<DefaultExtractorResult[]>`
- **Description:** Validates `coomer.st`, `coomer.party`, `kemono.su`, and `kemono.party` URLs. Current dependency maps do not include a dedicated Coomer transformer, pipeline, or downloader, so Coomer execution currently falls back through the generic/default behavior unless those mappings are added.

## Output Types

- **`OutputType.JSON`** - Default. Writes an execution result JSON file under `dirConfig.directoryPath` or `downflux_`.
- **`OutputType.DEVICE`** - Starts downloads in the background and writes files to disk.
- **`OutputType.BUFFER`** - Starts downloads in the background and stores downloaded bytes in memory results.
- **`OutputType.RETURN`** - Makes `ExecutionCoordinator` return its execution result without file output; public service methods still unwrap that result to extracted metadata.

`ExecutionCoordinator.execute` returns an `ExecutionResult` internally. The public service methods call `Service.execute`, which unwraps that result and returns `result.extracted`. For `DEVICE` and `BUFFER`, downloads continue asynchronously through `TaskCoordinator`; use `onProgress` and pipeline hooks to observe download progress from public service calls.

## ExecutionCoordinator Flow

Every public service method eventually calls `Service.execute`, which delegates to `ExecutionCoordinator.execute`.

```text
Public service method
  -> Service.buildRequest()
  -> ExecutionCoordinator.execute()
  -> TransformerRegistry.transform()
  -> DefaultTransformer / service transformer
  -> PipelineRegistry.build()
  -> BasePipeline / service pipeline
  -> TaskCoordinator output handler
  -> TransferCoordinator.download()
  -> BaseDownloader
  -> HttpHttpClient.requestStream()
  -> FileManager.createSink()
```

- **Request building:** `Service` merges defaults, fluent options, and method overrides into `ExecutionArgs`.
- **Progress start:** `ExecutionCoordinator` emits `started`.
- **Metadata extraction:** `ExecutionCoordinator.extractMetadata` processes `targets` with `extractConcurrency` or the default value `3`.
- **Transformation:** `TransformerRegistry` picks a transformer by `request.service`; if no match exists, it falls back to `DefaultTransformer`.
- **PipelineRegistry creation:** `PipelineRegistry` picks a pipeline by `request.service`; if no match exists, it falls back to `BasePipeline`.
- **Queue result:** `ExecutionCoordinator` returns an `ExecutionResult` containing `extracted`, `targetUrls`, `pipelineItems`, `downloaded`, `failed`, and `errors`.
- **Output dispatch:** `JSON` writes JSON immediately, `RETURN` returns immediately, and `DEVICE`/`BUFFER` start background downloads.
- **Background downloads:** `TaskCoordinator` applies download concurrency, respects `maxDownloads`, runs hooks, updates progress, increments `downloaded`/`failed`, and captures download errors.

## Class Reference

- **`Service`** - Abstract base for public services. Stores ExecutionCoordinator and HTTP options, provides fluent setters, builds `ExecutionArgs`, and delegates execution to `ExecutionCoordinator`.
- **`OkPornProvider`** - Public OkPorn API. Validates OkPorn URLs, builds album/video/model/tag/channel target URLs, applies OkPorn method names, and validates ranges.
- **`DefaultProvider`** - Public generic API. Validates that a URL can be parsed by `URL` and runs default extraction.
- **`CoomerProvider`** - Public Coomer/Kemono API. Validates supported hosts and exposes generic post/attachment extraction methods.
- **`ExecutionCoordinator`** - Main orchestrator. Extracts metadata, builds pipeline items, creates execution results, chooses output behavior, and connects services to transformers, pipelines, background work, files, and downloaders.
- **`TaskCoordinator`** - Runs downloads asynchronously, limits concurrency, handles hooks, emits progress events, records failures, writes JSON output, and starts device/buffer output work.
- **`TransformerRegistry`** - Registry/router for transformers. Selects the transformer for the requested service and falls back to the default transformer.
- **`DefaultTransformer`** - Fetches HTML, performs default parsing, applies `SITE_EXTRACTORS` transforms, and returns metadata.
- **`DefaultTransformer`** - Generic transformer that uses `DefaultTransformer` behavior without service-specific changes.
- **`OkPornTransformer`** - Converts default parsed metadata into OkPorn album, video, model, tag, and channel output shapes. For videos, it can also fetch the linked album and filter sources by requested video quality.
- **`PipelineRegistry`** - Registry/router for pipelines. Selects the pipeline for the requested service and falls back to `BasePipeline`.
- **`BasePipeline`** - Converts generic metadata arrays such as `images`, `sources`, `videoPosters`, `divHrefs`, and `allUrls` into `PipelineItem[]`; detects extensions and MIME types; applies allowed extension filtering.
- **`OkPornPipeline`** - Converts OkPorn metadata into structured download items for albums, videos, video albums, posters, and album previews, with OkPorn-specific output path identifiers.
- **`TransferCoordinator`** - Registry/router for downloaders. Selects the downloader for the requested service and falls back to `DefaultDownloader`.
- **`BaseDownloader`** - Downloads one `PipelineItem`, resolves filename metadata, streams bytes to the selected sink, handles HLS naming, and returns `DownloadResult`.
- **`DefaultDownloader`** - Generic downloader using `BaseDownloader` behavior.
- **`OkPornDownloader`** - OkPorn downloader using `BaseDownloader` behavior.
- **`HttpHttpClient`** - Handles HTML fetches, connection pools, redirects, decompression, direct stream downloads, HLS manifest parsing, HLS segment fetching, AES-128 segment decryption, and retrying HLS segment fetches.
- **`HtmlParserService`** - Lightweight HTML parser utilities for titles, metadata, anchors, images, sources, posters, div hrefs, arbitrary URLs, and HTML entity decoding.
- **`FileManager`** - Creates disk or memory sinks, writes JSON output, builds final paths, validates destination paths, infers file info, and remuxes `.ts` streams into `.mp4`.
- **`PathBuilder`** - Builds normalized output paths and identifier-based directory paths.
- **`FFmpegEngine`** - Wraps `ffmpeg-static` to remux transport streams into MP4 and remove the temporary `.ts` file.
- **`Exception`** - Base custom error type with `errorCode`, `context`, `metadata`, and JSON serialization.
- **`InvalidUrlException`** - Thrown when a service receives a URL outside its accepted format.
- **`InvalidRangeException`** - Thrown when an OkPorn range has negative values, a start greater than end, or page/limit values below `1`.
- **`InvalidDestinationException`** - Thrown when file output cannot safely create a path, receives an invalid filename, detects path traversal, or cannot create output directories.
- **`ProviderMismatchException`** - Custom exception for service/URL mismatch cases. It is defined and exported, but current code does not throw it.
- **`DownloadException`** - Custom exception for download failure cases. It is defined and exported, but current downloader code currently throws regular errors from fetch, stream, or file operations instead.

## Exceptions And When They Occur

- **`InvalidUrlException`**
  - `OkPornProvider` throws it when the constructor URL does not start with `https://ok.porn/`.
  - `DefaultProvider` throws it when `new URL(url)` fails.
  - `CoomerProvider` throws it when the URL cannot be parsed or the hostname is not `coomer.st`, `coomer.party`, `kemono.su`, or `kemono.party`, with optional `www.`.
- **`InvalidRangeException`**
  - `OkPornProvider.targets` throws it for index ranges where `start < 0`, `end < 0`, or `start > end`.
  - It also throws for page ranges where `page < 1` or `limit < 1`.
- **`InvalidDestinationException`**
  - `FileManager.getFilePath` throws it when the generated filename is empty.
  - It throws when the resolved output path would escape the configured output base directory.
  - It throws when directory creation fails.
- **Regular `Error` from output type validation**
  - `ExecutionCoordinator.execute` throws `Error('Invalid output type')` if the output type is not one of the known enum values.
- **Regular network/stream/fetch errors**
  - `HttpHttpClient.fetchHtml`, `requestStream`, HLS helpers, and stream piping can throw fetch, timeout, decompression, segment, or stream errors.
  - During metadata extraction, `ExecutionCoordinator.extractMetadata` catches extraction errors, logs them, and skips that target.
  - During downloads, `TaskCoordinator` catches errors per item, increments `failed`, pushes the normalized error into `result.errors`, emits `failed`, and continues processing other items.
- **`ProviderMismatchException`**
  - Available for future service-routing validation but not currently thrown.
- **`DownloadException`**
  - Available for future normalized download failures but not currently thrown by the downloader path.

## Important Types

- **`ExecutionArgs`** - Internal request object used by `ExecutionCoordinator`. Includes `service`, `method`, `entryUrl`, `targets`, `executionType`, `urlType`, and `JobOptions`.
- **`ExecutionResult<T>`** - Final ExecutionCoordinator object. Includes extracted metadata, target download URLs, pipeline items, download counts, failures, and errors.
- **`JobOptions`** - Shared options for output directory, allowed extensions, video qualities, max downloads, extraction/download concurrency, hooks, progress events, logging, output type, execution type, and abort signal.
- **`PipelineItem`** - One downloadable item with `downloadUrl`, `baseUrl`, `service`, and an identifier containing media type, MIME type, extension, and path key.
- **`DownloadResult`** - Result for one downloaded item, including original/final URL, filename, extension, MIME type, size, service, and optional buffer.
- **`DefaultExtractorResult`** - Generic metadata shape with title, description, keywords, anchors, images, sources, status, base URL, URL type, and custom fields.
- **`OkPornAlbumOutput`** - Album metadata and album image URLs.
- **`OkPornVideoOutput`** - Video metadata, source URLs with quality, poster/screenshot, optional linked album, and model details.
- **`OkPornModelOutput`** - Model listing page metadata and extracted model URLs.
- **`OkPornTagOutput`** - Tag page metadata.
- **`OkPornChannelOutput`** - Channel metadata and thumbnail.

## Directory Structure

```text
src/
  downloaders/   Download router and concrete downloader classes
  exceptions/    Custom exception classes
  fetcher/       HTTP, stream, and HLS fetching
  file/          File paths, output sinks, JSON writing, FFmpeg remuxing
  helpers/       Small helper utilities
  ExecutionCoordinator/           Job orchestration and background processing
  parser/        HTML extraction helpers
  pipelines/     Metadata-to-download-item builders
  services/      Public service APIs and dependency wiring
  transformers/  HTML-to-metadata transformers
  util/          Enums, interfaces, constants, maps, and types
```

## Service Support Matrix

- **OkPorn**
  - Service: `OkPornProvider`
  - TransformerRegistry: `OkPornTransformer`
  - PipelineRegistry: `OkPornPipeline`
  - Downloader: `OkPornDownloader`
- **Default**
  - Service: `DefaultProvider`
  - TransformerRegistry: `DefaultTransformer`
  - PipelineRegistry: `BasePipeline`
  - Downloader: `DefaultDownloader`
- **Coomer/Kemono**
  - Service: `CoomerProvider`
  - TransformerRegistry: falls back to default unless a Coomer transformer is registered
  - PipelineRegistry: falls back to default unless a Coomer pipeline is registered
  - Downloader: falls back to default unless a Coomer downloader is registered

## Progress And Hooks

- `onProgress` receives ExecutionCoordinator status events such as `started`, `extracting`, `extracted`, `queued`, `downloading`, `downloaded`, `failed`, `aborted`, and `completed`.
- `setProgressLogging(true)` prints simple progress logs to the console.
- `pipelineHooks[].onExtract` runs before an item is downloaded.
- `pipelineHooks[].onDownload` runs after an item downloads successfully.
- Hook failures are caught and logged; they do not stop the ExecutionCoordinator.

## Notes

- `Service` defaults to `OutputType.JSON` and `ExecutionType.SEQUENTIAL`.
- Public service methods return extracted metadata, not the full `ExecutionResult`.
- `ExecutionCoordinator` currently uses `extractConcurrency` for metadata extraction and `concurrency` for downloads. `executionType` is stored in the request but does not currently switch orchestration behavior.
- `maxDownloads` limits how many pipeline items are processed in the background download phase.
- HLS `.m3u8` downloads are streamed as `.ts` first and then remuxed to `.mp4` by `FFmpegEngine`.
- `allowedExtensions` filters pipeline items before download by detected extension.

## License

MIT © [forkts](https://github.com/forkts)
