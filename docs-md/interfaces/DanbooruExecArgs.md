[**downflux**](../README.md)

***

[downflux](../README.md) / DanbooruExecArgs

# Interface: DanbooruExecArgs

Defined in: [packages/providers/danbooru/DanbooruContracts.ts:3](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/danbooru/DanbooruContracts.ts#L3)

Configuration options for a DownFlux ExecutionCoordinator.
Combines fetch, extraction, pipeline, and output settings.

## Extends

- [`ExecutionArgs`](ExecutionArgs.md)

## Properties

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: [packages/contracts/DownloadContracts.ts:76](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L76)

Custom request headers

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`headers`](ExecutionArgs.md#headers)

***

### timeoutMs?

> `optional` **timeoutMs?**: `number`

Defined in: [packages/contracts/DownloadContracts.ts:79](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L79)

Request timeout in milliseconds

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`timeoutMs`](ExecutionArgs.md#timeoutms)

***

### retries?

> `optional` **retries?**: `number`

Defined in: [packages/contracts/DownloadContracts.ts:82](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L82)

Failed request retry count

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`retries`](ExecutionArgs.md#retries)

***

### referer?

> `optional` **referer?**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:85](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L85)

Request referer URL

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`referer`](ExecutionArgs.md#referer)

***

### formData?

> `optional` **formData?**: `Record`\<`string`, `string`\>

Defined in: [packages/contracts/DownloadContracts.ts:88](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L88)

Optional FormData for POST requests

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`formData`](ExecutionArgs.md#formdata)

***

### provider

> **provider**: [`Provider`](../enumerations/Provider.md)

Defined in: [packages/contracts/ExecutionContracts.ts:21](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L21)

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`provider`](ExecutionArgs.md#provider)

***

### method

> **method**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:22](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L22)

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`method`](ExecutionArgs.md#method)

***

### entryUrl

> **entryUrl**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:23](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L23)

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`entryUrl`](ExecutionArgs.md#entryurl)

***

### targets

> **targets**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:24](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L24)

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`targets`](ExecutionArgs.md#targets)

***

### executionShape

> **executionShape**: [`ExecutionShape`](../type-aliases/ExecutionShape.md)

Defined in: [packages/contracts/ExecutionContracts.ts:29](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L29)

Internal runtime metadata describing the structural shape of extracted output.
single -> TResult; multiple -> TResult[]

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`executionShape`](ExecutionArgs.md#executionshape)

***

### executionType?

> `optional` **executionType?**: [`ExecutionType`](../enumerations/ExecutionType.md)

Defined in: [packages/contracts/ExecutionContracts.ts:31](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L31)

Job execution strategy

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`executionType`](ExecutionArgs.md#executiontype)

***

### extractionTarget

> **extractionTarget**: [`ExtractionTarget`](../enumerations/ExtractionTarget.md)

Defined in: [packages/contracts/ExecutionContracts.ts:32](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L32)

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`extractionTarget`](ExecutionArgs.md#extractiontarget)

***

### providerMetadata?

> `optional` **providerMetadata?**: [`ProviderMetadata`](ProviderMetadata.md)

Defined in: [packages/contracts/ExecutionContracts.ts:35](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L35)

Provider capabilities and restrictions

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`providerMetadata`](ExecutionArgs.md#providermetadata)

***

### dirConfig?

> `optional` **dirConfig?**: [`DirectoryOutputOptions`](DirectoryOutputOptions.md)

Defined in: [packages/contracts/ExecutionContracts.ts:68](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L68)

Directory output configuration

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`dirConfig`](ExecutionArgs.md#dirconfig)

***

### allowedExtensions?

> `optional` **allowedExtensions?**: [`AllowedExtension`](../type-aliases/AllowedExtension.md)[]

Defined in: [packages/contracts/ExecutionContracts.ts:71](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L71)

Allowed file extensions

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`allowedExtensions`](ExecutionArgs.md#allowedextensions)

***

### allowedVideoQuality?

> `optional` **allowedVideoQuality?**: [`VideoQuality`](../enumerations/VideoQuality.md)

Defined in: [packages/contracts/ExecutionContracts.ts:74](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L74)

Allowed video quality

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`allowedVideoQuality`](ExecutionArgs.md#allowedvideoquality)

***

### preferredVideoFormat?

> `optional` **preferredVideoFormat?**: [`VideoFormat`](../enumerations/VideoFormat.md)

Defined in: [packages/contracts/ExecutionContracts.ts:77](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L77)

Preferred video format (e.g. hls, mp4)

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`preferredVideoFormat`](ExecutionArgs.md#preferredvideoformat)

***

### preferredVideoCodec?

> `optional` **preferredVideoCodec?**: [`VideoCodec`](../enumerations/VideoCodec.md)

Defined in: [packages/contracts/ExecutionContracts.ts:80](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L80)

Preferred video codec (e.g. h264, av1)

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`preferredVideoCodec`](ExecutionArgs.md#preferredvideocodec)

***

### tagFilterOptions?

> `optional` **tagFilterOptions?**: [`TagFilterOptions`](TagFilterOptions.md)

Defined in: [packages/contracts/ExecutionContracts.ts:83](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L83)

Tag filtering options

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`tagFilterOptions`](ExecutionArgs.md#tagfilteroptions)

***

### maxDownloads?

> `optional` **maxDownloads?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:86](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L86)

Maximum number of items to download

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`maxDownloads`](ExecutionArgs.md#maxdownloads)

***

### transformOutput?

> `optional` **transformOutput?**: `boolean`

Defined in: [packages/contracts/ExecutionContracts.ts:89](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L89)

Transform output to service-specific result type

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`transformOutput`](ExecutionArgs.md#transformoutput)

***

### concurrency?

> `optional` **concurrency?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:92](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L92)

Download phase concurrency

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`concurrency`](ExecutionArgs.md#concurrency)

***

### noDownload?

> `optional` **noDownload?**: `boolean`

Defined in: [packages/contracts/ExecutionContracts.ts:95](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L95)

Iterate only-- this prop is only used for logging http-services

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`noDownload`](ExecutionArgs.md#nodownload)

***

### extractConcurrency?

> `optional` **extractConcurrency?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:98](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L98)

Extraction phase concurrency

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`extractConcurrency`](ExecutionArgs.md#extractconcurrency)

***

### transcodeOptions?

> `optional` **transcodeOptions?**: [`TranscodeOptions`](TranscodeOptions.md)

Defined in: [packages/contracts/ExecutionContracts.ts:101](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L101)

Transcoding options

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`transcodeOptions`](ExecutionArgs.md#transcodeoptions)

***

### downloadRetries?

> `optional` **downloadRetries?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:104](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L104)

Download retry count

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`downloadRetries`](ExecutionArgs.md#downloadretries)

***

### retryDelayMs?

> `optional` **retryDelayMs?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:107](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L107)

Delay between download retries in milliseconds

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`retryDelayMs`](ExecutionArgs.md#retrydelayms)

***

### pipelineHooks?

> `optional` **pipelineHooks?**: [`PipelineHook`](PipelineHook.md)[]

Defined in: [packages/contracts/ExecutionContracts.ts:110](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L110)

PipelineRegistry lifecycle hooks

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`pipelineHooks`](ExecutionArgs.md#pipelinehooks)

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

[`ExecutionArgs`](ExecutionArgs.md).[`onProgress`](ExecutionArgs.md#onprogress)

***

### logProgress?

> `optional` **logProgress?**: `boolean`

Defined in: [packages/contracts/ExecutionContracts.ts:116](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L116)

Enables console progress logging

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`logProgress`](ExecutionArgs.md#logprogress)

***

### outputType?

> `optional` **outputType?**: [`OutputType`](../enumerations/OutputType.md)

Defined in: [packages/contracts/ExecutionContracts.ts:119](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L119)

Output format for ExecutionCoordinator results

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`outputType`](ExecutionArgs.md#outputtype)

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [packages/contracts/ExecutionContracts.ts:125](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L125)

Abort signal for cancelling the ExecutionCoordinator

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`signal`](ExecutionArgs.md#signal)

***

### userAgent?

> `optional` **userAgent?**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:129](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L129)

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`userAgent`](ExecutionArgs.md#useragent)

***

### enableSniSpoofing?

> `optional` **enableSniSpoofing?**: `boolean`

Defined in: [packages/contracts/ExecutionContracts.ts:131](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L131)

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`enableSniSpoofing`](ExecutionArgs.md#enablesnispoofing)

***

### proxy?

> `optional` **proxy?**: [`ProxyOptions`](ProxyOptions.md)

Defined in: [packages/contracts/ExecutionContracts.ts:133](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L133)

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`proxy`](ExecutionArgs.md#proxy)

***

### dispatcher?

> `optional` **dispatcher?**: `Dispatcher`

Defined in: [packages/contracts/ExecutionContracts.ts:135](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L135)

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`dispatcher`](ExecutionArgs.md#dispatcher)
