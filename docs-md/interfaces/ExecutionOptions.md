[**downflux**](../README.md)

***

[downflux](../README.md) / ExecutionOptions

# Interface: ExecutionOptions

Defined in: [packages/contracts/ExecutionContracts.ts:66](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L66)

Configuration options for a DownFlux ExecutionCoordinator.
Combines fetch, extraction, pipeline, and output settings.

## Extends

- [`HttpFetchOptions`](HttpFetchOptions.md)

## Extended by

- [`ExecutionArgs`](ExecutionArgs.md)

## Properties

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: [packages/contracts/DownloadContracts.ts:76](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L76)

Custom request headers

#### Inherited from

[`HttpFetchOptions`](HttpFetchOptions.md).[`headers`](HttpFetchOptions.md#headers)

***

### timeoutMs?

> `optional` **timeoutMs?**: `number`

Defined in: [packages/contracts/DownloadContracts.ts:79](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L79)

Request timeout in milliseconds

#### Inherited from

[`HttpFetchOptions`](HttpFetchOptions.md).[`timeoutMs`](HttpFetchOptions.md#timeoutms)

***

### retries?

> `optional` **retries?**: `number`

Defined in: [packages/contracts/DownloadContracts.ts:82](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L82)

Failed request retry count

#### Inherited from

[`HttpFetchOptions`](HttpFetchOptions.md).[`retries`](HttpFetchOptions.md#retries)

***

### referer?

> `optional` **referer?**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:85](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L85)

Request referer URL

#### Inherited from

[`HttpFetchOptions`](HttpFetchOptions.md).[`referer`](HttpFetchOptions.md#referer)

***

### formData?

> `optional` **formData?**: `Record`\<`string`, `string`\>

Defined in: [packages/contracts/DownloadContracts.ts:88](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L88)

Optional FormData for POST requests

#### Inherited from

[`HttpFetchOptions`](HttpFetchOptions.md).[`formData`](HttpFetchOptions.md#formdata)

***

### dirConfig?

> `optional` **dirConfig?**: [`DirectoryOutputOptions`](DirectoryOutputOptions.md)

Defined in: [packages/contracts/ExecutionContracts.ts:68](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L68)

Directory output configuration

***

### allowedExtensions?

> `optional` **allowedExtensions?**: [`AllowedExtension`](../type-aliases/AllowedExtension.md)[]

Defined in: [packages/contracts/ExecutionContracts.ts:71](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L71)

Allowed file extensions

***

### allowedVideoQuality?

> `optional` **allowedVideoQuality?**: [`VideoQuality`](../enumerations/VideoQuality.md)

Defined in: [packages/contracts/ExecutionContracts.ts:74](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L74)

Allowed video quality

***

### preferredVideoFormat?

> `optional` **preferredVideoFormat?**: [`VideoFormat`](../enumerations/VideoFormat.md)

Defined in: [packages/contracts/ExecutionContracts.ts:77](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L77)

Preferred video format (e.g. hls, mp4)

***

### preferredVideoCodec?

> `optional` **preferredVideoCodec?**: [`VideoCodec`](../enumerations/VideoCodec.md)

Defined in: [packages/contracts/ExecutionContracts.ts:80](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L80)

Preferred video codec (e.g. h264, av1)

***

### tagFilterOptions?

> `optional` **tagFilterOptions?**: [`TagFilterOptions`](TagFilterOptions.md)

Defined in: [packages/contracts/ExecutionContracts.ts:83](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L83)

Tag filtering options

***

### maxDownloads?

> `optional` **maxDownloads?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:86](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L86)

Maximum number of items to download

***

### transformOutput?

> `optional` **transformOutput?**: `boolean`

Defined in: [packages/contracts/ExecutionContracts.ts:89](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L89)

Transform output to service-specific result type

***

### concurrency?

> `optional` **concurrency?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:92](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L92)

Download phase concurrency

***

### noDownload?

> `optional` **noDownload?**: `boolean`

Defined in: [packages/contracts/ExecutionContracts.ts:95](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L95)

Iterate only-- this prop is only used for logging http-services

***

### extractConcurrency?

> `optional` **extractConcurrency?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:98](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L98)

Extraction phase concurrency

***

### transcodeOptions?

> `optional` **transcodeOptions?**: [`TranscodeOptions`](TranscodeOptions.md)

Defined in: [packages/contracts/ExecutionContracts.ts:101](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L101)

Transcoding options

***

### downloadRetries?

> `optional` **downloadRetries?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:104](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L104)

Download retry count

***

### retryDelayMs?

> `optional` **retryDelayMs?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:107](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L107)

Delay between download retries in milliseconds

***

### pipelineHooks?

> `optional` **pipelineHooks?**: [`PipelineHook`](PipelineHook.md)[]

Defined in: [packages/contracts/ExecutionContracts.ts:110](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L110)

PipelineRegistry lifecycle hooks

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

***

### logProgress?

> `optional` **logProgress?**: `boolean`

Defined in: [packages/contracts/ExecutionContracts.ts:116](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L116)

Enables console progress logging

***

### outputType?

> `optional` **outputType?**: [`OutputType`](../enumerations/OutputType.md)

Defined in: [packages/contracts/ExecutionContracts.ts:119](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L119)

Output format for ExecutionCoordinator results

***

### executionType?

> `optional` **executionType?**: [`ExecutionType`](../enumerations/ExecutionType.md)

Defined in: [packages/contracts/ExecutionContracts.ts:122](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L122)

Job execution strategy

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [packages/contracts/ExecutionContracts.ts:125](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L125)

Abort signal for cancelling the ExecutionCoordinator

***

### userAgent?

> `optional` **userAgent?**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:129](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L129)

#### Inherited from

[`HttpFetchOptions`](HttpFetchOptions.md).[`userAgent`](HttpFetchOptions.md#useragent)

***

### enableSniSpoofing?

> `optional` **enableSniSpoofing?**: `boolean`

Defined in: [packages/contracts/ExecutionContracts.ts:131](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L131)

#### Inherited from

[`HttpFetchOptions`](HttpFetchOptions.md).[`enableSniSpoofing`](HttpFetchOptions.md#enablesnispoofing)

***

### proxy?

> `optional` **proxy?**: [`ProxyOptions`](ProxyOptions.md)

Defined in: [packages/contracts/ExecutionContracts.ts:133](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L133)

#### Inherited from

[`HttpFetchOptions`](HttpFetchOptions.md).[`proxy`](HttpFetchOptions.md#proxy)

***

### dispatcher?

> `optional` **dispatcher?**: `Dispatcher`

Defined in: [packages/contracts/ExecutionContracts.ts:135](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L135)

#### Inherited from

[`HttpFetchOptions`](HttpFetchOptions.md).[`dispatcher`](HttpFetchOptions.md#dispatcher)
