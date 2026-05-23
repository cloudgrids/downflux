# downflux

Modular TypeScript media extraction and download toolkit. Each site integration is split into a provider, parser, transformer, and pipeline so extraction rules, output mapping, and download planning stay easy to update independently.

## Installation

```bash
npm install downflux
```

```bash
pnpm add downflux
```

## Usage

```ts
import { BeegProvider } from 'downflux';

const provider = new BeegProvider('https://beeg.com/example-video-url');
const result = await provider.getVideo();

console.log(result);
```

## FFmpeg Setup

DownFlux uses ffmpeg when HLS or fragmented media needs to be finalized into a playable file. The package includes `ffmpeg-static`, but some package managers can block its postinstall script.

If you use pnpm in the consuming app, approve the bundled binary build:

```bash
pnpm approve-builds
```

Select `ffmpeg-static`, then reinstall dependencies if needed.

You can also install ffmpeg yourself:

```bash
brew install ffmpeg
```

Then point DownFlux at that executable:

```ts
import { BeegProvider, OutputType } from 'downflux';

await new BeegProvider('https://beeg.com/example-video-url')
  .setOutput(OutputType.DEVICE, { directoryPath: 'downloads' })
  .setJobOptions({
    transcodeOptions: {
      ffmpegPath: '/opt/homebrew/bin/ffmpeg'
    }
  })
  .getVideo();
```

## Documentation

The generated Markdown API docs live in [`docs-md`](docs-md/README.md).

Useful entry points:

- [BaseProvider](docs-md/classes/BaseProvider.md) - public provider API and fluent execution options.
- [BaseParser](docs-md/classes/BaseParser.md) - shared HTML extraction helpers.
- [BaseTransformer](docs-md/classes/BaseTransformer.md) - fetches pages and normalizes parser output.
- [BasePipeline](docs-md/classes/BasePipeline.md) - turns extracted metadata into downloadable items.
- [ExecutionCoordinator](docs-md/classes/ExecutionCoordinator.md) - job-level extraction and output flow.
- [TaskCoordinator](docs-md/classes/TaskCoordinator.md) - concurrency, hooks, and background downloads.
- [TransferCoordinator](docs-md/classes/TransferCoordinator.md) - streams one pipeline item into storage.
- [HttpClient](docs-md/classes/HttpClient.md), [StreamHttpClient](docs-md/classes/StreamHttpClient.md), and [HlsClient](docs-md/classes/HlsClient.md) - HTTP and HLS engines.
- [FileManager](docs-md/classes/FileManager.md) and [FFmpegEngine](docs-md/classes/FFmpegEngine.md) - output sinks, filenames, JSON, and media finalization.
- [Provider](docs-md/enumerations/Provider.md), [OutputType](docs-md/enumerations/OutputType.md), [ExecutionType](docs-md/enumerations/ExecutionType.md), [VideoQuality](docs-md/enumerations/VideoQuality.md).

Regenerate the Markdown docs with:

```bash
pnpm run docs:md
```

## How The Service Works

```mermaid
flowchart TD

    User([Caller chooses Provider])

    subgraph ProviderLayer["Provider Layer"]
        ServiceProvider[ServiceProvider]
        BaseProvider[BaseProvider<br/>• Validates URL<br/>• Builds execution request]
    end

    subgraph TransformLayer["Transformation Layer"]
        TransformerRegistry[TransformerRegistry<br/>Resolves provider transformer]

        Transformer[Transformer<br/>Coordinates extraction lifecycle]

        HttpClient[HttpClient<br/>Fetches HTML / APIs]

        ParserRegistry[ParserRegistry<br/>Loads matching parsers]

        Parser[Parser<br/>• Extracts metadata<br/>• Detects media sources<br/>• Finds identifiers]
    end

    subgraph PipelineLayer["Pipeline Layer"]
        PipelineRegistry[PipelineRegistry<br/>Loads provider pipeline]

        Pipeline[Pipeline<br/>Builds execution items]

        PipelineItems[Pipeline Items]

        URLs[URLs<br/>Media / Playlist URLs]

        MediaTypes[Media Types<br/>Video / Audio / Images]

        Identifiers[Identifiers<br/>Content IDs / Metadata]
    end

    subgraph ExecutionLayer["Execution Layer"]
        TaskCoordinator[TaskCoordinator<br/>Schedules concurrent tasks]

        TransferCoordinator[TransferCoordinator<br/>Coordinates downloads]

        StreamHttpClient[StreamHttpClient<br/>Streams remote files]

        HlsClient[HlsClient<br/>Processes m3u8 playlists]

        FileManager[FileManager<br/>Handles sinks & temp files]

        FFmpegEngine[FFmpegEngine<br/>Muxing / Conversion / Finalization]

        Output[Output<br/>JSON / Buffer / Device File]
    end

    User --> ServiceProvider
    ServiceProvider --> BaseProvider
    BaseProvider --> TransformerRegistry
    TransformerRegistry --> Transformer

    Transformer --> HttpClient
    HttpClient --> ParserRegistry
    ParserRegistry --> Parser
    Parser --> Transformer

    Transformer --> PipelineRegistry
    PipelineRegistry --> Pipeline

    Pipeline --> PipelineItems
    PipelineItems --> URLs
    PipelineItems --> MediaTypes
    PipelineItems --> Identifiers

    Pipeline --> TaskCoordinator
    TaskCoordinator --> TransferCoordinator

    TransferCoordinator --> StreamHttpClient
    StreamHttpClient --> HlsClient
    StreamHttpClient --> FileManager

    HlsClient --> FileManager

    FileManager --> FFmpegEngine
    FileManager --> Output

    FFmpegEngine --> Output

    classDef provider fill:#4f46e5,color:#fff,stroke:#312e81,stroke-width:2px;
    classDef transform fill:#0f766e,color:#fff,stroke:#134e4a,stroke-width:2px;
    classDef pipeline fill:#ca8a04,color:#fff,stroke:#854d0e,stroke-width:2px;
    classDef execution fill:#dc2626,color:#fff,stroke:#7f1d1d,stroke-width:2px;
    classDef network fill:#0369a1,color:#fff,stroke:#0c4a6e,stroke-width:2px;
    classDef parser fill:#7c3aed,color:#fff,stroke:#581c87,stroke-width:2px;
    classDef file fill:#059669,color:#fff,stroke:#064e3b,stroke-width:2px;
    classDef output fill:#ea580c,color:#fff,stroke:#7c2d12,stroke-width:2px;

    class ServiceProvider,BaseProvider provider;
    class TransformerRegistry,Transformer transform;
    class PipelineRegistry,Pipeline,PipelineItems,URLs,MediaTypes,Identifiers pipeline;
    class TaskCoordinator,TransferCoordinator execution;
    class HttpClient,StreamHttpClient,HlsClient network;
    class ParserRegistry,Parser parser;
    class FileManager,FFmpegEngine file;
    class Output output;
```

In short: a provider creates a typed request, coordinators run the extraction/download flow, registries load the correct provider-specific classes, engines handle network transport, pipelines decide what should be downloaded, and storage writes or returns the result.

## Available Sites

| Site                                                                 | Provider               | Short description                                                             |
| -------------------------------------------------------------------- | ---------------------- | ----------------------------------------------------------------------------- |
| [AnalRz](docs-md/classes/AnalRzProvider.md) <sup>new</sup>           | `AnalRzProvider`       | MP4 downloads; under development.                                             |
| [Beeg](docs-md/classes/BeegProvider.md)                              | `BeegProvider`         | MP4 downloads, HLS downloads; geo-sensitive, under development.               |
| [BlackPorn](docs-md/classes/BlackPornProvider.md) <sup>new</sup>     | `BlackPornProvider`    | MP4 downloads; under development.                                             |
| [BoKepPorn](docs-md/classes/BoKepPornProvider.md) <sup>new</sup>     | `BoKepPornProvider`    | MP4 downloads, KVS metadata; under development.                               |
| [ColliderPorn](docs-md/classes/ColliderPornProvider.md)              | `ColliderPornProvider` | MP4 downloads, HLS downloads, embeds; geo-sensitive, under development.       |
| [CumLouder](docs-md/classes/CumLouderProvider.md)                    | `CumLouderProvider`    | MP4 discovery; under development.                                             |
| [DaFreePorn](docs-md/classes/DaFreePornProvider.md) <sup>new</sup>   | `DaFreePornProvider`   | MP4 downloads, KVS metadata; under development.                               |
| [DaNude](docs-md/classes/DaNudeProvider.md) <sup>new</sup>           | `DaNudeProvider`       | MP4 downloads, KVS metadata; under development.                               |
| [EpicGfs](docs-md/classes/EpicGfsProvider.md)                        | `EpicGfsProvider`      | MP4 downloads, KVS metadata; under development.                               |
| [EPorner](docs-md/classes/EPornerProvider.md)                        | `EPornerProvider`      | MP4 downloads, HLS downloads; external API, geo-sensitive, under development. |
| [HqPorn](docs-md/classes/HqPornProvider.md)                          | `HqPornProvider`       | MP4 downloads; under development.                                             |
| [Interracial](docs-md/classes/InterracialProvider.md) <sup>new</sup> | `InterracialProvider`  | MP4 downloads, KVS metadata; under development.                               |
| [ItsPorn](docs-md/classes/ItsPornProvider.md) <sup>new</sup>         | `ItsPornProvider`      | MP4 downloads, KVS metadata; under development.                               |
| [Lesbian8](docs-md/classes/Lesbian8Provider.md)                      | `Lesbian8Provider`     | MP4 downloads, KVS metadata; under development.                               |
| [MegaTube](docs-md/classes/MegaTubeProvider.md)                      | `MegaTubeProvider`     | MP4 downloads, KVS metadata; under development.                               |
| [MomVids](docs-md/classes/MomVidsProvider.md) <sup>new</sup>         | `MomVidsProvider`      | MP4 downloads, KVS metadata; under development.                               |
| [MyLust](docs-md/classes/MyLustProvider.md)                          | `MyLustProvider`       | MP4 downloads; under development.                                             |
| [OkPorn](docs-md/classes/OkPornProvider.md)                          | `OkPornProvider`       | HLS downloads; under development.                                             |
| [PerfectGirls](docs-md/classes/PerfectGirlsProvider.md)              | `PerfectGirlsProvider` | HLS downloads; under development.                                             |
| [Porn300](docs-md/classes/Porn300Provider.md)                        | `Porn300Provider`      | MP4 discovery; under development.                                             |
| [PornDoe](docs-md/classes/PornDoeProvider.md)                        | `PornDoeProvider`      | MP4 downloads; external API, under development.                               |
| [PornHub](docs-md/classes/PornHubProvider.md)                        | `PornHubProvider`      | MP4 downloads, HLS downloads, KVS metadata; under development.                |
| [PornId](docs-md/classes/PornIdProvider.md)                          | `PornIdProvider`       | MP4 downloads, KVS metadata; under development.                               |
| [PornOne](docs-md/classes/PornOneProvider.md)                        | `PornOneProvider`      | MP4 downloads; Cloudflare challenge, under development.                       |
| [PornSeven](docs-md/classes/PornSevenProvider.md)                    | `PornSevenProvider`    | MP4 discovery; under development.                                             |
| [PornsOk](docs-md/classes/PornsOkProvider.md)                        | `PornsOkProvider`      | MP4 downloads; under development.                                             |
| [PussySpace](docs-md/classes/PussySpaceProvider.md)                  | `PussySpaceProvider`   | MP4 downloads; external API, under development.                               |
| [SexVid](docs-md/classes/SexVidProvider.md)                          | `SexVidProvider`       | MP4 downloads, KVS metadata; under development.                               |
| [Shameless](docs-md/classes/ShamelessProvider.md)                    | `ShamelessProvider`    | MP4 downloads, KVS metadata; under development.                               |
| [SuperPorn](docs-md/classes/SuperPornProvider.md)                    | `SuperPornProvider`    | MP4 downloads; under development.                                             |
| [SxyPorn](docs-md/classes/SxyPornProvider.md)                        | `SxyPornProvider`      | MP4 downloads; Cloudflare challenge, under development.                       |
| [TheyAreHuge](docs-md/classes/TheyAreHugeProvider.md)                | `TheyAreHugeProvider`  | MP4 downloads, KVS metadata; login required, under development.               |
| [TnAFlix](docs-md/classes/TnAFlixProvider.md)                        | `TnAFlixProvider`      | MP4 downloads; geo-sensitive, under development.                              |
| [TubeVSex](docs-md/classes/TubeVSexProvider.md)                      | `TubeVSexProvider`     | MP4 downloads; under development.                                             |
| [WallHaven](docs-md/classes/WallHavenProvider.md)                    | `WallHavenProvider`    | Provider-specific extraction; under development.                              |
| [XCafe](docs-md/classes/XCafeProvider.md)                            | `XCafeProvider`        | MP4 downloads; under development.                                             |
| [XDegu](docs-md/classes/XDeguProvider.md)                            | `XDeguProvider`        | MP4 downloads, KVS metadata; under development.                               |
| [XGroovy](docs-md/classes/XGroovyProvider.md)                        | `XGroovyProvider`      | MP4 downloads; under development.                                             |
| [XHamster](docs-md/classes/XHamsterProvider.md)                      | `XHamsterProvider`     | MP4 downloads, HLS downloads; under development.                              |
| [XnXX](docs-md/classes/XnXXProvider.md)                              | `XnXXProvider`         | MP4 downloads, HLS downloads; under development.                              |
| [Xozilla](docs-md/classes/XozillaProvider.md) <sup>new</sup>         | `XozillaProvider`      | MP4 downloads, KVS metadata; under development.                               |
| [XVideos](docs-md/classes/XVideosProvider.md)                        | `XVideosProvider`      | MP4 discovery, HLS downloads, KVS metadata; under development.                |
| [ZbPorn](docs-md/classes/ZbPornProvider.md) <sup>new</sup>           | `ZbPornProvider`       | MP4 downloads, KVS metadata; under development.                               |
| [ZzzTube](docs-md/classes/ZzzTubeProvider.md)                        | `ZzzTubeProvider`      | MP4 downloads; under development.                                             |

## Gallery & General Providers (not yet fully implemented)

| Site                                                               | Provider             | Short description                                                                               |
| ------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------- |
| [ArtStation](docs-md/classes/ArtStationProvider.md) <sup>new</sup> | `ArtStationProvider` | Art gallery extraction; under development.                                                      |
| [Behance](docs-md/classes/BehanceProvider.md) <sup>new</sup>       | `BehanceProvider`    | Portfolio platform extraction; requires API, under development.                                 |
| [Bluesky](docs-md/classes/BlueskyProvider.md) <sup>new</sup>       | `BlueskyProvider`    | Social media extraction; requires API, under development.                                       |
| [Danbooru](docs-md/classes/DanbooruProvider.md) <sup>new</sup>     | `DanbooruProvider`   | Anime image board extraction; under development.                                                |
| [DeviantArt](docs-md/classes/DeviantArtProvider.md) <sup>new</sup> | `DeviantArtProvider` | Art community extraction; requires API, under development.                                      |
| [Flickr](docs-md/classes/FlickrProvider.md) <sup>new</sup>         | `FlickrProvider`     | Photo sharing extraction; under development.                                                    |
| [Gelbooru](docs-md/classes/GelbooruProvider.md) <sup>new</sup>     | `GelbooruProvider`   | Anime image board extraction; under development.                                                |
| [Imgur](docs-md/classes/ImgurProvider.md) <sup>new</sup>           | `ImgurProvider`      | Image hosting extraction; under development.                                                    |
| [Instagram](docs-md/classes/InstagramProvider.md) <sup>new</sup>   | `InstagramProvider`  | Social media extraction; login required, Cloudflare challenge, under development.               |
| [MangaDex](docs-md/classes/MangaDexProvider.md) <sup>new</sup>     | `MangaDexProvider`   | Manga reader extraction; under development.                                                     |
| [Mastodon](docs-md/classes/MastodonProvider.md) <sup>new</sup>     | `MastodonProvider`   | Social media extraction; geo-sensitive, under development.                                      |
| [Newgrounds](docs-md/classes/NewgroundsProvider.md) <sup>new</sup> | `NewgroundsProvider` | Art portal extraction; under development.                                                       |
| [Pexels](docs-md/classes/PexelsProvider.md) <sup>new</sup>         | `PexelsProvider`     | Stock photo extraction; under development.                                                      |
| [Pinterest](docs-md/classes/PinterestProvider.md) <sup>new</sup>   | `PinterestProvider`  | Image sharing extraction; requires API, Cloudflare challenge, under development.                |
| [Pixiv](docs-md/classes/PixivProvider.md) <sup>new</sup>           | `PixivProvider`      | Art community extraction; requires API, login required, under development.                      |
| [Reddit](docs-md/classes/RedditProvider.md) <sup>new</sup>         | `RedditProvider`     | Social media extraction; under development.                                                     |
| [TikTok](docs-md/classes/TikTokProvider.md) <sup>new</sup>         | `TikTokProvider`     | Video platform extraction; requires API, Cloudflare challenge, under development.               |
| [Tumblr](docs-md/classes/TumblrProvider.md) <sup>new</sup>         | `TumblrProvider`     | Social media extraction; under development.                                                     |
| [Twitter](docs-md/classes/TwitterProvider.md) <sup>new</sup>       | `TwitterProvider`    | Social media extraction; requires API, login required, Cloudflare challenge, under development. |
| [Unsplash](docs-md/classes/UnsplashProvider.md) <sup>new</sup>     | `UnsplashProvider`   | Stock photo extraction; under development.                                                      |
| [WikiArt](docs-md/classes/WikiArtProvider.md) <sup>new</sup>       | `WikiArtProvider`    | Art museum extraction; under development.                                                       |
| [Wikimedia](docs-md/classes/WikimediaProvider.md) <sup>new</sup>   | `WikimediaProvider`  | Media library extraction; geo-sensitive, under development.                                     |

More incoming...

## Development

```bash
pnpm install
pnpm run build
pnpm run docs:md
```

## Add new Provider

To add a new provider you can run this following commands.

Use the --no-[registryCoordinatorType] to exclude that file.

Available flags: strategy | transformer | pipeline | method

```bash
pnpm run make:registry [registryName] OR
pnpm run make:registry --no-strategy Twitter
```

After running the previous command, run this commands sequentially for barrel imports and auto entries

```bash
pnpm run make:index
pnpm run format
pnpm run build
```

The generated docs are intentionally linked from this README so provider and API documentation remain browsable from the repository root.

## Publishing

```bash
pnpm run pack:dry-run
pnpm publish
```

`pnpm run pack:dry-run` rebuilds the package and previews the files that npm will receive.
