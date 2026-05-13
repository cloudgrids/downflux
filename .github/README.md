# DownFlux

Typescript Library for downloading and extracting sites metadata

## Currently Supported Services

| Provider         | Site URLs                    | Methods                                                                                                     | Returns                |
| :--------------- | :--------------------------- | :---------------------------------------------------------------------------------------------------------- | :--------------------- |
| **Default**      | _Any supported URL fallback_ | _Generic URL Extraction_                                                                                    | `ExtractItem`          |
| **Beeg**         | `beeg.com`                   | `getVideo`, `getVideos`                                                                                     | Video                  |
| **Coomer**       | `coomer.su`, `coomer.party`  | `getPosts`, `getPost`, `getTags`, `getModels`                                                               | Post / Metadata        |
| **HqPorn**       | `hqporn.tv`, `hqporn.com`    | `getVideo`, `getVideos`                                                                                     | Video                  |
| **OkPorn**       | `ok.porn`, `ok.xxx`          | `getAlbums`, `getAlbum`, `getModels`, `getTags`, `getChannels`, `getVideos`, `getVideo`, `getModelVideoIds` | Models, Videos, Albums |
| **PerfectGirls** | `perfectgirls.net`           | `getVideo`, `getVideos`                                                                                     | Video                  |
| **Porn300**      | `porn300.com`                | `getVideo`, `getVideos`                                                                                     | Video                  |
| **PornHub**      | `pornhub.com`                | `getVideo`, `getModel`, `getChannels`, `getTags`, `getVideos`                                               | Video, Channel, Model  |
| **PornOne**      | `pornone.com`                | `getVideo`, `getVideos`                                                                                     | Video                  |
| **PornsOk**      | `porns.ok`                   | `getVideo`, `getVideos`                                                                                     | Video                  |
| **SexVid**       | `sexvid.xxx`                 | `getVideo`, `getVideos`                                                                                     | Video                  |
| **SuperPorn**    | `superporn.com`              | `getVideo`, `getVideos`                                                                                     | Video                  |
| **SxyPorn**      | `sxyporn.com`                | `getVideo`, `getVideos`                                                                                     | Video                  |
| **TnAFlix**      | `tnaflix.com`                | `getVideo`, `getVideos`                                                                                     | Video                  |
| **WallHaven**    | `wallhaven.cc`               | `getWallPapers`, `getWallPaper`, `getUserUploads`, `getUserFavorites`, `getUserFavoriteCollections`         | Images, Uploads        |
| **XGroovy**      | `xgroovy.com`                | `getVideo`, `getVideos`                                                                                     | Video                  |
| **XHamster**     | `xhamster.com`               | `getVideo`, `getVideos`                                                                                     | Video                  |
| **XnXX**         | `xnxx.com`                   | `getVideo`, `getVideos`                                                                                     | Video                  |
| **XVideos**      | `xvideos.com`                | `getVideo`, `getVideos`                                                                                     | Video                  |

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
