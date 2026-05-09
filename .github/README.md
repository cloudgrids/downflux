# DownFlux

Typescript Library for downloading and extracting sites metadata

## Currently supported Services

- **OkPorn** - Albums, videos, models, tags, channels
- **PornHub** - Videos, channels, models, video
- **WallHaven** - Albums, uploads, wallpapers, wallpaper
- **XHamster** - Videos
- **Default** - Generic URL extraction fallback

More incoming...

## Output Modes

`In all output modes it returns metadata extracted from sites`

- **`OutputType.JSON`** - Save results as JSON file (default)
- **`OutputType.DEVICE`** - Download files to disk
- **`OutputType.BUFFER`** - Returns buffer
- **`OutputType.RETURN`** - Return metadata only

## How It Works

1. Provider validates and builds request
2. Metadata extracted from target URLs
3. Transformers convert HTML to structured data
4. Pipelines generate download items
5. Downloads processed per output mode
6. Files saved or returned

## Common Options

```typescript
.setOutput(OutputType.DEVICE, { directoryPath: 'downloads' })
.setJobOptions({ concurrency: 5, logProgress: true })
.setAllowedExtensions('mp4', 'jpg')
.setMaxDownloads(10)
.onProgress((event) => console.log(event))
```

## Progress Events

- `onProgress` listens to extraction and download events
- `logProgress: true` prints progress to console
- Events include: `started`, `extracting`, `extracted`, `downloading`, `downloaded`, `failed`, `completed`

## Example Usage

```typescript
import { OkPornProvider, OutputType } from 'downflux';

const provider = new OkPornProvider('https://ok.porn/videos/search/?query=example')
  .setOutput(OutputType.DEVICE, { directoryPath: './downloads' })
  .setJobOptions({ concurrency: 3 })
  .onProgress((event) => console.log(event));

const videos = await provider.getVideos({ start: 0, end: 10 });
console.log(`Found ${videos.length} videos`);
```

## Notes

- Default output is JSON file
- HLS `.m3u8` files are remuxed to `.mp4` automatically
- Downloads run in the background with configurable concurrency
- Failed downloads are logged but don't stop the process
