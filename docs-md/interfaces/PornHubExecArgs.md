[**downflux**](../README.md)

***

[downflux](../README.md) / PornHubExecArgs

# Interface: PornHubExecArgs

Defined in: [packages/providers/pornhub/PornHubContracts.ts:9](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/pornhub/PornHubContracts.ts#L9)

Interface representing the arguments for executing a PornHub-related operation.

## Extends

- [`ExecutionArgs`](ExecutionArgs.md)

## Properties

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: [packages/contracts/DownloadContracts.ts:71](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L71)

Custom request headers

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`headers`](ExecutionArgs.md#headers)

***

### timeoutMs?

> `optional` **timeoutMs?**: `number`

Defined in: [packages/contracts/DownloadContracts.ts:74](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L74)

Request timeout in milliseconds

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`timeoutMs`](ExecutionArgs.md#timeoutms)

***

### retries?

> `optional` **retries?**: `number`

Defined in: [packages/contracts/DownloadContracts.ts:77](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L77)

Failed request retry count

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`retries`](ExecutionArgs.md#retries)

***

### referer?

> `optional` **referer?**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:80](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L80)

Request referer URL

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`referer`](ExecutionArgs.md#referer)

***

### formData?

> `optional` **formData?**: `Record`\<`string`, `string`\>

Defined in: [packages/contracts/DownloadContracts.ts:83](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L83)

Optional FormData for POST requests

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`formData`](ExecutionArgs.md#formdata)

***

### provider

> **provider**: [`ProviderType`](../enumerations/ProviderType.md)

Defined in: [packages/contracts/ExecutionContracts.ts:18](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L18)

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`provider`](ExecutionArgs.md#provider)

***

### method

> **method**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:19](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L19)

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`method`](ExecutionArgs.md#method)

***

### entryUrl

> **entryUrl**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:20](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L20)

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`entryUrl`](ExecutionArgs.md#entryurl)

***

### targets

> **targets**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:21](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L21)

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`targets`](ExecutionArgs.md#targets)

***

### executionShape

> **executionShape**: [`ExecutionShape`](../type-aliases/ExecutionShape.md)

Defined in: [packages/contracts/ExecutionContracts.ts:29](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L29)

Internal runtime metadata describing
the structural shape of extracted output.

single   -> TResult
multiple -> TResult[]

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`executionShape`](ExecutionArgs.md#executionshape)

***

### executionType

> **executionType**: [`ExecutionType`](../enumerations/ExecutionType.md)

Defined in: [packages/contracts/ExecutionContracts.ts:31](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L31)

Job execution strategy

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`executionType`](ExecutionArgs.md#executiontype)

***

### extractionTarget

> **extractionTarget**: [`ExtractionTarget`](../enumerations/ExtractionTarget.md)

Defined in: [packages/contracts/ExecutionContracts.ts:32](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L32)

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`extractionTarget`](ExecutionArgs.md#extractiontarget)

***

### dirConfig?

> `optional` **dirConfig?**: [`DirectoryOutputOptions`](DirectoryOutputOptions.md)

Defined in: [packages/contracts/ExecutionContracts.ts:41](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L41)

Directory output configuration

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`dirConfig`](ExecutionArgs.md#dirconfig)

***

### allowedExtensions?

> `optional` **allowedExtensions?**: [`AllowedExtension`](../type-aliases/AllowedExtension.md)[]

Defined in: [packages/contracts/ExecutionContracts.ts:44](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L44)

Allowed file extensions

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`allowedExtensions`](ExecutionArgs.md#allowedextensions)

***

### allowedVideoQuality?

> `optional` **allowedVideoQuality?**: [`VideoQuality`](../enumerations/VideoQuality.md)

Defined in: [packages/contracts/ExecutionContracts.ts:47](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L47)

Allowed video quality

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`allowedVideoQuality`](ExecutionArgs.md#allowedvideoquality)

***

### tagFilterOptions?

> `optional` **tagFilterOptions?**: [`TagFilterOptions`](TagFilterOptions.md)

Defined in: [packages/contracts/ExecutionContracts.ts:50](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L50)

Tag filtering options

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`tagFilterOptions`](ExecutionArgs.md#tagfilteroptions)

***

### maxDownloads?

> `optional` **maxDownloads?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:53](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L53)

Maximum number of items to download

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`maxDownloads`](ExecutionArgs.md#maxdownloads)

***

### transformOutput?

> `optional` **transformOutput?**: `boolean`

Defined in: [packages/contracts/ExecutionContracts.ts:56](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L56)

Transform output to service-specific result type

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`transformOutput`](ExecutionArgs.md#transformoutput)

***

### concurrency?

> `optional` **concurrency?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:59](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L59)

Download phase concurrency

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`concurrency`](ExecutionArgs.md#concurrency)

***

### noDownload?

> `optional` **noDownload?**: `boolean`

Defined in: [packages/contracts/ExecutionContracts.ts:62](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L62)

Iterate only-- this prop is only used for logging http-services

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`noDownload`](ExecutionArgs.md#nodownload)

***

### extractConcurrency?

> `optional` **extractConcurrency?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:65](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L65)

Extraction phase concurrency

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`extractConcurrency`](ExecutionArgs.md#extractconcurrency)

***

### transcodeOptions?

> `optional` **transcodeOptions?**: [`TranscodeOptions`](TranscodeOptions.md)

Defined in: [packages/contracts/ExecutionContracts.ts:68](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L68)

Transcoding options

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`transcodeOptions`](ExecutionArgs.md#transcodeoptions)

***

### downloadRetries?

> `optional` **downloadRetries?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:71](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L71)

Download retry count

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`downloadRetries`](ExecutionArgs.md#downloadretries)

***

### retryDelayMs?

> `optional` **retryDelayMs?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:74](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L74)

Delay between download retries in milliseconds

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`retryDelayMs`](ExecutionArgs.md#retrydelayms)

***

### pipelineHooks?

> `optional` **pipelineHooks?**: [`PipelineHook`](PipelineHook.md)[]

Defined in: [packages/contracts/ExecutionContracts.ts:77](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L77)

PipelineRegistry lifecycle hooks

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`pipelineHooks`](ExecutionArgs.md#pipelinehooks)

***

### onProgress?

> `optional` **onProgress?**: (`event`) => `void`

Defined in: [packages/contracts/ExecutionContracts.ts:80](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L80)

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

Defined in: [packages/contracts/ExecutionContracts.ts:83](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L83)

Enables console progress logging

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`logProgress`](ExecutionArgs.md#logprogress)

***

### outputType?

> `optional` **outputType?**: [`OutputType`](../enumerations/OutputType.md)

Defined in: [packages/contracts/ExecutionContracts.ts:86](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L86)

Output format for ExecutionCoordinator results

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`outputType`](ExecutionArgs.md#outputtype)

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [packages/contracts/ExecutionContracts.ts:92](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L92)

Abort signal for cancelling the ExecutionCoordinator

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`signal`](ExecutionArgs.md#signal)

***

### username?

> `optional` **username?**: `string`

Defined in: [packages/providers/pornhub/PornHubContracts.ts:11](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/pornhub/PornHubContracts.ts#L11)

username of the model/channel/pornstar

***

### videosArgs?

> `optional` **videosArgs?**: [`PornHubVideosExecArgs`](PornHubVideosExecArgs.md)

Defined in: [packages/providers/pornhub/PornHubContracts.ts:14](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/pornhub/PornHubContracts.ts#L14)

Arguments for getting videos from channel or model or pornstar
