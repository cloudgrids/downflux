# DownFlux

A modular, highly scalable media downflux, scraper, and downloader tool built with Node.js, TypeScript, and `undici`.

## Features

- **Async-First Architecture:** Metadata extraction returns immediately; downloads fire non-blocking in the background via hooks
- **Builder Pattern API:** Easy-to-use chainable methods (`new OkPornService(url).getAlbum(id)`, `setOutput()`, etc.)
- **Type-Safe Pipeline:** Full TypeScript generics throughout extraction → pipeline → download flow
- **Service-Specific Extractors:** Generic `BaseExtractor<T>` with service-specific transformers (OkPorn, Default, Coomer)
- **Progressive Pipelines:** Service-specific pipeline builders extract correct URLs based on metadata type (albums, videos, models, channels)
- **Hook System:** User-defined callbacks for `onExtract` and `onDownload` phases enabling real-time UI updates
- **Advanced HTTP Fetching:** Uses `undici` for robust connection pooling and chunk streaming
- **Multiple Output Targets:** Pipe to local disk (DEVICE), memory (BUFFER), JSON file (JSON), or get ExecutionResult (RETURN)
- **Modular Architecture:** Clean dependency injection separating transformers, parsers, extractors, pipelines, and downloaders
- **Dual module support:** Provides both CommonJS (`index.js`) and ESM (`index.mjs`) exports

## Installation

Install using your preferred package manager:

```bash
pnpm add downflux
# or
npm install downflux
# or
yarn add downflux
```

## Quick Start / Usage

### Basic Album Extraction

```typescript
import { OkPornService, OutputType } from 'downflux';

async function main() {
  const url = 'https://ok.porn/albums/1300/';
  const service = new OkPornService(url);

  // Extract album and save to disk
  const result = await service
    .setOutput(OutputType.DEVICE)
    .setJobOptions({ dirConfig: { path: 'downloads' } })
    .getAlbum('1300');

  console.log('Downloaded:', result.downloaded, 'files');
  console.log('Failed:', result.failed);
}

main().catch(console.error);
```

### With Progressive Hooks

```typescript
import { OkPornService, OutputType } from 'downflux';

async function main() {
  const service = new OkPornService('https://ok.porn/albums/1300/');

  const result = await service
    .setOutput(OutputType.DEVICE)
    .setJobOptions({
      dirConfig: { path: 'downloads' },
      pipelineHooks: [
        {
          // Called when each URL is extracted
          onExtract: async (item) => {
            console.log('Extracting:', item.downloadUrl);
          },
          // Called after each file is downloaded
          onDownload: async (result) => {
            console.log('Downloaded:', result.extendedFilename);
          }
        }
      ]
    })
    .getAlbum('1300');

  console.log('Complete! Downloaded:', result.downloaded, 'files');
}

main().catch(console.error);
```

### JSON Output (Metadata Only)

```typescript
import { OkPornService, OutputType } from 'downflux';

async function main() {
  const service = new OkPornService('https://ok.porn/albums/1300/');

  // Returns immediately with extracted metadata
  const result = await service.setOutput(OutputType.JSON).getAlbum('1300');

  // result.extracted contains service-specific metadata
  console.log('Extracted metadata:', result.extracted);
  // Downloads still happen in background if you add hooks
}

main().catch(console.error);
```

## Supported Services

Currently, the library provides handlers for:

- **OkPornService** - Albums, videos, models, channels, tags
- **DefaultService** - Generic HTML parsing fallback

Each Service inherits from `BaseService` and exposes methods tailored specifically to its media source patterns.

## Architecture

### Service Routing

The system routes requests through multiple service-specific layers:

```
User Request
    ↓
BaseService (validates, builds ExecutionArguments)
    ↓
JobService.execute<T>() (orchestrates)
    ↓
TransformerService.transform<T>()
    → OkPornTransformer | DefaultTransformer
    ↓
PipelineService.build<T>()
    → OkPornPipeline | DefaultPipeline
    ↓
DownloaderService.download()
    → OkPornDownloader | DefaultDownloader
    ↓
FileService.saveToDevice()
```

### Type Flow

Generic type `T` flows through the entire pipeline:

- **Input:** `ExecutionArguments` with `targets: string[]`
- **Extraction:** `TransformerService.transform<T>()` returns service-specific metadata
  - `OkPornAlbumOutput` (albums)
  - `OkPornVideoOutput` (videos)
  - `OkPornModelOutput` (models)
  - `OkPornChannelOutput` (channels)
  - `DefaultExtractorResult` (generic fallback)
- **Pipeline:** `PipelineService.build<T>()` creates `PipelineItem[]` for each downloadable URL
- **Download:** `DownloaderService.download()` processes each item
- **Output:** `ExecutionResult<T>` with extracted metadata and download stats

### Async-First Design

The key architectural innovation:

1. **Metadata returns immediately** (extracted without waiting for downloads)
2. **Downloads fire in background** (non-blocking, via `handleDeviceOutputAsync()`)
3. **Hooks enable real-time updates** (`onExtract`, `onDownload` callbacks)

```typescript
// Returns immediately with extracted metadata
const result = await service.getAlbum('1300');
// Downloads continue in background, triggering hooks
// result.downloaded increments as files complete
```

## Output Types

- **JSON:** Save results to JSON file, metadata only
- **DEVICE:** Save downloaded files to disk with directory structure
- **BUFFER:** Keep downloaded files in memory
- **RETURN:** Return ExecutionResult with metadata (no file I/O)

## Development

Clone the project and install dependencies:

```bash
git clone https://github.com/forkts/downflux.git
cd downflux
pnpm install
```

### Useful Scripts

- `pnpm test:run` - Runs the test executor (via `tsx`) to manually verify extraction routines
- `pnpm build` - Compiles TypeScript to `dist/` and generates ESM wrappers
- `pnpm format` - Auto-formats code via Prettier
- `pnpm lint:test` - Lints the codebase using ESLint

### Directory Structure

```
src/
├── services/          # Service implementations (OkPorn, Default)
├── transformers/      # Service-specific metadata extractors
├── pipelines/         # URL extraction from metadata (service-specific)
├── downloaders/       # Service-specific download logic
├── types/             # TypeScript type definitions
├── enums/             # Service and method enums
├── fetcher/           # HTTP fetching service
├── parser/            # HTML parsing service
├── file/              # File I/O service
├── helpers/           # Utility functions
├── job/               # JobService orchestrator
├── common/            # Common utilities
└── exceptions/        # Custom error types
```

## Documentation

- [ARCHITECTURE_GRAPH.md](./ARCHITECTURE_GRAPH.md) - Detailed architecture diagrams and complete data flow
- [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - Implementation patterns and usage examples
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Summary of recent architecture changes
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical architecture overview

## Key Concepts

### Pipeline Items

Each extracted URL becomes a `PipelineItem`:

```typescript
interface PipelineItem {
  sourceUrl: string; // Original metadata source
  downloadUrl: string; // URL to download
  resourceType: 'image' | 'video' | 'audio'; // File type
  service: ServiceType; // Which service extracted this
}
```

### Execution Result

The return value after execution:

```typescript
interface ExecutionResult<T> {
  extracted: T[]; // Service-specific metadata
  service: ServiceType; // Which service
  method: ServiceMethod; // Which method was called
  targets: string[]; // URLs that were processed
  downloaded: number; // Count of successful downloads
  failed: number; // Count of failed downloads
  errors: Error[]; // Any errors encountered
  outputType: OutputType; // Output type used
  targetUrls: string[]; // URLs extracted for download
}
```

### Hooks

User-defined callbacks for monitoring extraction and download:

```typescript
interface PipelineHook {
  onExtract?: (item: PipelineItem) => Promise<void>;
  onDownload?: (result: DownloadResult) => Promise<void>;
}
```

## License

MIT © [forkts](https://github.com/forkts)
