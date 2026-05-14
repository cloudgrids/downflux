[**downflux**](../README.md)

***

[downflux](../README.md) / DownloadOptions

# Interface: DownloadOptions

Defined in: [packages/contracts/DownloadContracts.ts:6](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L6)

Configuration options for a DownFlux ExecutionCoordinator.
Combines fetch, extraction, pipeline, and output settings.

## Extends

- [`ExecutionOptions`](ExecutionOptions.md)

## Properties

### outputType

> **outputType**: [`OutputType`](../enumerations/OutputType.md)

Defined in: [packages/contracts/DownloadContracts.ts:7](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L7)

Output format for ExecutionCoordinator results

#### Overrides

[`ExecutionOptions`](ExecutionOptions.md).[`outputType`](ExecutionOptions.md#outputtype)

***

### provider

> **provider**: [`ProviderType`](../enumerations/ProviderType.md)

Defined in: [packages/contracts/DownloadContracts.ts:8](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L8)

***

### reExtract?

> `optional` **reExtract?**: (`item`) => `Promise`\<[`PipelineItem`](PipelineItem.md) \| `null`\>

Defined in: [packages/contracts/DownloadContracts.ts:9](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L9)

#### Parameters

##### item

[`PipelineItem`](PipelineItem.md)

#### Returns

`Promise`\<[`PipelineItem`](PipelineItem.md) \| `null`\>

***

### pipelineItem?

> `optional` **pipelineItem?**: [`PipelineItem`](PipelineItem.md)

Defined in: [packages/contracts/DownloadContracts.ts:10](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L10)

***

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: [packages/contracts/DownloadContracts.ts:71](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L71)

Custom request headers

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`headers`](ExecutionOptions.md#headers)

***

### timeoutMs?

> `optional` **timeoutMs?**: `number`

Defined in: [packages/contracts/DownloadContracts.ts:74](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L74)

Request timeout in milliseconds

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`timeoutMs`](ExecutionOptions.md#timeoutms)

***

### retries?

> `optional` **retries?**: `number`

Defined in: [packages/contracts/DownloadContracts.ts:77](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L77)

Failed request retry count

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`retries`](ExecutionOptions.md#retries)

***

### referer?

> `optional` **referer?**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:80](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L80)

Request referer URL

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`referer`](ExecutionOptions.md#referer)

***

### formData?

> `optional` **formData?**: `Record`\<`string`, `string`\>

Defined in: [packages/contracts/DownloadContracts.ts:83](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L83)

Optional FormData for POST requests

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`formData`](ExecutionOptions.md#formdata)

***

### dirConfig?

> `optional` **dirConfig?**: [`DirectoryOutputOptions`](DirectoryOutputOptions.md)

Defined in: [packages/contracts/ExecutionContracts.ts:41](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L41)

Directory output configuration

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`dirConfig`](ExecutionOptions.md#dirconfig)

***

### allowedExtensions?

> `optional` **allowedExtensions?**: [`AllowedExtension`](../type-aliases/AllowedExtension.md)[]

Defined in: [packages/contracts/ExecutionContracts.ts:44](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L44)

Allowed file extensions

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`allowedExtensions`](ExecutionOptions.md#allowedextensions)

***

### allowedVideoQuality?

> `optional` **allowedVideoQuality?**: [`VideoQuality`](../enumerations/VideoQuality.md)

Defined in: [packages/contracts/ExecutionContracts.ts:47](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L47)

Allowed video quality

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`allowedVideoQuality`](ExecutionOptions.md#allowedvideoquality)

***

### tagFilterOptions?

> `optional` **tagFilterOptions?**: [`TagFilterOptions`](TagFilterOptions.md)

Defined in: [packages/contracts/ExecutionContracts.ts:50](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L50)

Tag filtering options

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`tagFilterOptions`](ExecutionOptions.md#tagfilteroptions)

***

### maxDownloads?

> `optional` **maxDownloads?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:53](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L53)

Maximum number of items to download

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`maxDownloads`](ExecutionOptions.md#maxdownloads)

***

### transformOutput?

> `optional` **transformOutput?**: `boolean`

Defined in: [packages/contracts/ExecutionContracts.ts:56](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L56)

Transform output to service-specific result type

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`transformOutput`](ExecutionOptions.md#transformoutput)

***

### concurrency?

> `optional` **concurrency?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:59](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L59)

Download phase concurrency

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`concurrency`](ExecutionOptions.md#concurrency)

***

### noDownload?

> `optional` **noDownload?**: `boolean`

Defined in: [packages/contracts/ExecutionContracts.ts:62](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L62)

Iterate only-- this prop is only used for logging http-services

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`noDownload`](ExecutionOptions.md#nodownload)

***

### extractConcurrency?

> `optional` **extractConcurrency?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:65](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L65)

Extraction phase concurrency

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`extractConcurrency`](ExecutionOptions.md#extractconcurrency)

***

### transcodeOptions?

> `optional` **transcodeOptions?**: [`TranscodeOptions`](TranscodeOptions.md)

Defined in: [packages/contracts/ExecutionContracts.ts:68](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L68)

Transcoding options

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`transcodeOptions`](ExecutionOptions.md#transcodeoptions)

***

### downloadRetries?

> `optional` **downloadRetries?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:71](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L71)

Download retry count

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`downloadRetries`](ExecutionOptions.md#downloadretries)

***

### retryDelayMs?

> `optional` **retryDelayMs?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:74](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L74)

Delay between download retries in milliseconds

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`retryDelayMs`](ExecutionOptions.md#retrydelayms)

***

### pipelineHooks?

> `optional` **pipelineHooks?**: [`PipelineHook`](PipelineHook.md)[]

Defined in: [packages/contracts/ExecutionContracts.ts:77](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L77)

PipelineRegistry lifecycle hooks

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`pipelineHooks`](ExecutionOptions.md#pipelinehooks)

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

[`ExecutionOptions`](ExecutionOptions.md).[`onProgress`](ExecutionOptions.md#onprogress)

***

### logProgress?

> `optional` **logProgress?**: `boolean`

Defined in: [packages/contracts/ExecutionContracts.ts:83](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L83)

Enables console progress logging

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`logProgress`](ExecutionOptions.md#logprogress)

***

### executionType?

> `optional` **executionType?**: [`ExecutionType`](../enumerations/ExecutionType.md)

Defined in: [packages/contracts/ExecutionContracts.ts:89](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L89)

Job execution strategy

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`executionType`](ExecutionOptions.md#executiontype)

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [packages/contracts/ExecutionContracts.ts:92](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L92)

Abort signal for cancelling the ExecutionCoordinator

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`signal`](ExecutionOptions.md#signal)
