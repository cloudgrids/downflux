[**downflux**](../README.md)

***

[downflux](../README.md) / ExecutionArgs

# Interface: ExecutionArgs\<S\>

Defined in: [packages/contracts/ExecutionContracts.ts:20](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L20)

Configuration options for a DownFlux ExecutionCoordinator.
Combines fetch, extraction, pipeline, and output settings.

## Extends

- [`ExecutionOptions`](ExecutionOptions.md)

## Extended by

- [`ExecutionResult`](ExecutionResult.md)
- [`AnalRzExecArgs`](AnalRzExecArgs.md)
- [`ArtStationExecArgs`](ArtStationExecArgs.md)
- [`BeegExecArgs`](BeegExecArgs.md)
- [`BehanceExecArgs`](BehanceExecArgs.md)
- [`BlackPornExecArgs`](BlackPornExecArgs.md)
- [`BlueskyExecArgs`](BlueskyExecArgs.md)
- [`BoKepPornExecArgs`](BoKepPornExecArgs.md)
- [`ColliderPornExecArgs`](ColliderPornExecArgs.md)
- [`CumLouderExecArgs`](CumLouderExecArgs.md)
- [`DaFreePornExecArgs`](DaFreePornExecArgs.md)
- [`DanbooruExecArgs`](DanbooruExecArgs.md)
- [`DaNudeExecArgs`](DaNudeExecArgs.md)
- [`DefaultExecArgs`](DefaultExecArgs.md)
- [`DeviantArtExecArgs`](DeviantArtExecArgs.md)
- [`EpicGfsExecArgs`](EpicGfsExecArgs.md)
- [`EPornerExecArgs`](EPornerExecArgs.md)
- [`FlickrExecArgs`](FlickrExecArgs.md)
- [`GelbooruExecArgs`](GelbooruExecArgs.md)
- [`HqPornExecArgs`](HqPornExecArgs.md)
- [`ImgurExecArgs`](ImgurExecArgs.md)
- [`InstagramExecArgs`](InstagramExecArgs.md)
- [`InterracialExecArgs`](InterracialExecArgs.md)
- [`ItsPornExecArgs`](ItsPornExecArgs.md)
- [`Lesbian8ExecArgs`](Lesbian8ExecArgs.md)
- [`MangaDexExecArgs`](MangaDexExecArgs.md)
- [`MastodonExecArgs`](MastodonExecArgs.md)
- [`MegaTubeExecArgs`](MegaTubeExecArgs.md)
- [`MomVidsExecArgs`](MomVidsExecArgs.md)
- [`MyLustExecArgs`](MyLustExecArgs.md)
- [`NewgroundsExecArgs`](NewgroundsExecArgs.md)
- [`OkPornExecArgs`](OkPornExecArgs.md)
- [`PerfectGirlsExecArgs`](PerfectGirlsExecArgs.md)
- [`PexelsExecArgs`](PexelsExecArgs.md)
- [`PinterestExecArgs`](PinterestExecArgs.md)
- [`PixivExecArgs`](PixivExecArgs.md)
- [`Porn300ExecArgs`](Porn300ExecArgs.md)
- [`PornDoeExecArgs`](PornDoeExecArgs.md)
- [`PornHubExecArgs`](PornHubExecArgs.md)
- [`PornIdExecArgs`](PornIdExecArgs.md)
- [`PornOneExecArgs`](PornOneExecArgs.md)
- [`PornSevenExecArgs`](PornSevenExecArgs.md)
- [`PornsOkExecArgs`](PornsOkExecArgs.md)
- [`PussySpaceExecArgs`](PussySpaceExecArgs.md)
- [`RedditExecArgs`](RedditExecArgs.md)
- [`SexVidExecArgs`](SexVidExecArgs.md)
- [`ShamelessExecArgs`](ShamelessExecArgs.md)
- [`SuperPornExecArgs`](SuperPornExecArgs.md)
- [`SxyPornExecArgs`](SxyPornExecArgs.md)
- [`TheyAreHugeExecArgs`](TheyAreHugeExecArgs.md)
- [`TikTokExecArgs`](TikTokExecArgs.md)
- [`TnAFlixExecArgs`](TnAFlixExecArgs.md)
- [`TubeVSexExecArgs`](TubeVSexExecArgs.md)
- [`TumblrExecArgs`](TumblrExecArgs.md)
- [`TwitterExecArgs`](TwitterExecArgs.md)
- [`UnsplashExecArgs`](UnsplashExecArgs.md)
- [`WallHavenExecArgs`](WallHavenExecArgs.md)
- [`WikiArtExecArgs`](WikiArtExecArgs.md)
- [`WikimediaExecArgs`](WikimediaExecArgs.md)
- [`XCafeExecArgs`](XCafeExecArgs.md)
- [`XDeguExecArgs`](XDeguExecArgs.md)
- [`XGroovyExecArgs`](XGroovyExecArgs.md)
- [`XHamsterExecArgs`](XHamsterExecArgs.md)
- [`XnXXExecArgs`](XnXXExecArgs.md)
- [`XozillaExecArgs`](XozillaExecArgs.md)
- [`XVideosExecArgs`](XVideosExecArgs.md)
- [`ZbPornExecArgs`](ZbPornExecArgs.md)
- [`ZzzTubeExecArgs`](ZzzTubeExecArgs.md)

## Type Parameters

### S

`S` *extends* [`ExecutionShape`](../type-aliases/ExecutionShape.md) = [`ExecutionShape`](../type-aliases/ExecutionShape.md)

## Properties

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: [packages/contracts/DownloadContracts.ts:76](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L76)

Custom request headers

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`headers`](ExecutionOptions.md#headers)

***

### timeoutMs?

> `optional` **timeoutMs?**: `number`

Defined in: [packages/contracts/DownloadContracts.ts:79](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L79)

Request timeout in milliseconds

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`timeoutMs`](ExecutionOptions.md#timeoutms)

***

### retries?

> `optional` **retries?**: `number`

Defined in: [packages/contracts/DownloadContracts.ts:82](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L82)

Failed request retry count

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`retries`](ExecutionOptions.md#retries)

***

### referer?

> `optional` **referer?**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:85](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L85)

Request referer URL

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`referer`](ExecutionOptions.md#referer)

***

### formData?

> `optional` **formData?**: `Record`\<`string`, `string`\>

Defined in: [packages/contracts/DownloadContracts.ts:88](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L88)

Optional FormData for POST requests

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`formData`](ExecutionOptions.md#formdata)

***

### provider

> **provider**: [`Provider`](../enumerations/Provider.md)

Defined in: [packages/contracts/ExecutionContracts.ts:21](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L21)

***

### method

> **method**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:22](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L22)

***

### entryUrl

> **entryUrl**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:23](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L23)

***

### targets

> **targets**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:24](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L24)

***

### executionShape

> **executionShape**: `S`

Defined in: [packages/contracts/ExecutionContracts.ts:29](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L29)

Internal runtime metadata describing the structural shape of extracted output.
single -> TResult; multiple -> TResult[]

***

### executionType?

> `optional` **executionType?**: [`ExecutionType`](../enumerations/ExecutionType.md)

Defined in: [packages/contracts/ExecutionContracts.ts:31](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L31)

Job execution strategy

#### Overrides

[`ExecutionOptions`](ExecutionOptions.md).[`executionType`](ExecutionOptions.md#executiontype)

***

### extractionTarget

> **extractionTarget**: [`ExtractionTarget`](../enumerations/ExtractionTarget.md)

Defined in: [packages/contracts/ExecutionContracts.ts:32](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L32)

***

### providerMetadata?

> `optional` **providerMetadata?**: [`ProviderMetadata`](ProviderMetadata.md)

Defined in: [packages/contracts/ExecutionContracts.ts:35](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L35)

Provider capabilities and restrictions

***

### dirConfig?

> `optional` **dirConfig?**: [`DirectoryOutputOptions`](DirectoryOutputOptions.md)

Defined in: [packages/contracts/ExecutionContracts.ts:68](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L68)

Directory output configuration

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`dirConfig`](ExecutionOptions.md#dirconfig)

***

### allowedExtensions?

> `optional` **allowedExtensions?**: [`AllowedExtension`](../type-aliases/AllowedExtension.md)[]

Defined in: [packages/contracts/ExecutionContracts.ts:71](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L71)

Allowed file extensions

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`allowedExtensions`](ExecutionOptions.md#allowedextensions)

***

### allowedVideoQuality?

> `optional` **allowedVideoQuality?**: [`VideoQuality`](../enumerations/VideoQuality.md)

Defined in: [packages/contracts/ExecutionContracts.ts:74](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L74)

Allowed video quality

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`allowedVideoQuality`](ExecutionOptions.md#allowedvideoquality)

***

### preferredVideoFormat?

> `optional` **preferredVideoFormat?**: [`VideoFormat`](../enumerations/VideoFormat.md)

Defined in: [packages/contracts/ExecutionContracts.ts:77](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L77)

Preferred video format (e.g. hls, mp4)

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`preferredVideoFormat`](ExecutionOptions.md#preferredvideoformat)

***

### preferredVideoCodec?

> `optional` **preferredVideoCodec?**: [`VideoCodec`](../enumerations/VideoCodec.md)

Defined in: [packages/contracts/ExecutionContracts.ts:80](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L80)

Preferred video codec (e.g. h264, av1)

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`preferredVideoCodec`](ExecutionOptions.md#preferredvideocodec)

***

### tagFilterOptions?

> `optional` **tagFilterOptions?**: [`TagFilterOptions`](TagFilterOptions.md)

Defined in: [packages/contracts/ExecutionContracts.ts:83](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L83)

Tag filtering options

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`tagFilterOptions`](ExecutionOptions.md#tagfilteroptions)

***

### maxDownloads?

> `optional` **maxDownloads?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:86](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L86)

Maximum number of items to download

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`maxDownloads`](ExecutionOptions.md#maxdownloads)

***

### transformOutput?

> `optional` **transformOutput?**: `boolean`

Defined in: [packages/contracts/ExecutionContracts.ts:89](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L89)

Transform output to service-specific result type

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`transformOutput`](ExecutionOptions.md#transformoutput)

***

### concurrency?

> `optional` **concurrency?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:92](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L92)

Download phase concurrency

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`concurrency`](ExecutionOptions.md#concurrency)

***

### noDownload?

> `optional` **noDownload?**: `boolean`

Defined in: [packages/contracts/ExecutionContracts.ts:95](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L95)

Iterate only-- this prop is only used for logging http-services

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`noDownload`](ExecutionOptions.md#nodownload)

***

### extractConcurrency?

> `optional` **extractConcurrency?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:98](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L98)

Extraction phase concurrency

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`extractConcurrency`](ExecutionOptions.md#extractconcurrency)

***

### transcodeOptions?

> `optional` **transcodeOptions?**: [`TranscodeOptions`](TranscodeOptions.md)

Defined in: [packages/contracts/ExecutionContracts.ts:101](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L101)

Transcoding options

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`transcodeOptions`](ExecutionOptions.md#transcodeoptions)

***

### downloadRetries?

> `optional` **downloadRetries?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:104](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L104)

Download retry count

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`downloadRetries`](ExecutionOptions.md#downloadretries)

***

### retryDelayMs?

> `optional` **retryDelayMs?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:107](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L107)

Delay between download retries in milliseconds

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`retryDelayMs`](ExecutionOptions.md#retrydelayms)

***

### pipelineHooks?

> `optional` **pipelineHooks?**: [`PipelineHook`](PipelineHook.md)[]

Defined in: [packages/contracts/ExecutionContracts.ts:110](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L110)

PipelineRegistry lifecycle hooks

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`pipelineHooks`](ExecutionOptions.md#pipelinehooks)

***

### onProgress?

> `optional` **onProgress?**: (`event`) => `void`

Defined in: [packages/contracts/ExecutionContracts.ts:113](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L113)

Progress event handler

#### Parameters

##### event

[`JobProgressEvent`](JobProgressEvent.md)

#### Returns

`void`

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`onProgress`](ExecutionOptions.md#onprogress)

***

### logProgress?

> `optional` **logProgress?**: `boolean`

Defined in: [packages/contracts/ExecutionContracts.ts:116](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L116)

Enables console progress logging

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`logProgress`](ExecutionOptions.md#logprogress)

***

### outputType?

> `optional` **outputType?**: [`OutputType`](../enumerations/OutputType.md)

Defined in: [packages/contracts/ExecutionContracts.ts:119](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L119)

Output format for ExecutionCoordinator results

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`outputType`](ExecutionOptions.md#outputtype)

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [packages/contracts/ExecutionContracts.ts:125](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L125)

Abort signal for cancelling the ExecutionCoordinator

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`signal`](ExecutionOptions.md#signal)

***

### userAgent?

> `optional` **userAgent?**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:129](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L129)

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`userAgent`](ExecutionOptions.md#useragent)

***

### enableSniSpoofing?

> `optional` **enableSniSpoofing?**: `boolean`

Defined in: [packages/contracts/ExecutionContracts.ts:131](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L131)

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`enableSniSpoofing`](ExecutionOptions.md#enablesnispoofing)

***

### proxy?

> `optional` **proxy?**: [`ProxyOptions`](ProxyOptions.md)

Defined in: [packages/contracts/ExecutionContracts.ts:133](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L133)

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`proxy`](ExecutionOptions.md#proxy)

***

### dispatcher?

> `optional` **dispatcher?**: `Dispatcher`

Defined in: [packages/contracts/ExecutionContracts.ts:135](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L135)

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`dispatcher`](ExecutionOptions.md#dispatcher)
