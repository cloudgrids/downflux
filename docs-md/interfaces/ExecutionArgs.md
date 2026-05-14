[**downflux**](../README.md)

***

[downflux](../README.md) / ExecutionArgs

# Interface: ExecutionArgs\<S\>

Defined in: [packages/contracts/ExecutionContracts.ts:17](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L17)

Configuration options for a DownFlux ExecutionCoordinator.
Combines fetch, extraction, pipeline, and output settings.

## Extends

- [`ExecutionOptions`](ExecutionOptions.md)

## Extended by

- [`ExecutionResult`](ExecutionResult.md)
- [`BeegExecArgs`](BeegExecArgs.md)
- [`ColliderPornExecArgs`](ColliderPornExecArgs.md)
- [`CoomerExecArgs`](CoomerExecArgs.md)
- [`CumLouderExecArgs`](CumLouderExecArgs.md)
- [`DefaultExecArgs`](DefaultExecArgs.md)
- [`HqPornExecArgs`](HqPornExecArgs.md)
- [`Lesbian8ExecArgs`](Lesbian8ExecArgs.md)
- [`MegaTubeExecArgs`](MegaTubeExecArgs.md)
- [`OkPornExecArgs`](OkPornExecArgs.md)
- [`PerfectGirlsExecArgs`](PerfectGirlsExecArgs.md)
- [`Porn300ExecArgs`](Porn300ExecArgs.md)
- [`PornDoeExecArgs`](PornDoeExecArgs.md)
- [`PornHubExecArgs`](PornHubExecArgs.md)
- [`PornIdExecArgs`](PornIdExecArgs.md)
- [`PornOneExecArgs`](PornOneExecArgs.md)
- [`PornsOkExecArgs`](PornsOkExecArgs.md)
- [`PussySpaceExecArgs`](PussySpaceExecArgs.md)
- [`SexVidExecArgs`](SexVidExecArgs.md)
- [`ShamelessExecArgs`](ShamelessExecArgs.md)
- [`SuperPornExecArgs`](SuperPornExecArgs.md)
- [`SxyPornExecArgs`](SxyPornExecArgs.md)
- [`TheyAreHugeExecArgs`](TheyAreHugeExecArgs.md)
- [`TnAFlixExecArgs`](TnAFlixExecArgs.md)
- [`TubeVSexExecArgs`](TubeVSexExecArgs.md)
- [`WallHavenExecArgs`](WallHavenExecArgs.md)
- [`XGroovyExecArgs`](XGroovyExecArgs.md)
- [`XHamsterExecArgs`](XHamsterExecArgs.md)
- [`XnXXExecArgs`](XnXXExecArgs.md)
- [`XVideosExecArgs`](XVideosExecArgs.md)

## Type Parameters

### S

`S` *extends* [`ExecutionShape`](../type-aliases/ExecutionShape.md) = [`ExecutionShape`](../type-aliases/ExecutionShape.md)

## Properties

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

### provider

> **provider**: [`ProviderType`](../enumerations/ProviderType.md)

Defined in: [packages/contracts/ExecutionContracts.ts:18](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L18)

***

### method

> **method**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:19](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L19)

***

### entryUrl

> **entryUrl**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:20](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L20)

***

### targets

> **targets**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:21](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L21)

***

### executionShape

> **executionShape**: `S`

Defined in: [packages/contracts/ExecutionContracts.ts:29](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L29)

Internal runtime metadata describing
the structural shape of extracted output.

single   -> TResult
multiple -> TResult[]

***

### executionType

> **executionType**: [`ExecutionType`](../enumerations/ExecutionType.md)

Defined in: [packages/contracts/ExecutionContracts.ts:31](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L31)

Job execution strategy

#### Overrides

[`ExecutionOptions`](ExecutionOptions.md).[`executionType`](ExecutionOptions.md#executiontype)

***

### extractionTarget

> **extractionTarget**: [`ExtractionTarget`](../enumerations/ExtractionTarget.md)

Defined in: [packages/contracts/ExecutionContracts.ts:32](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L32)

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

### outputType?

> `optional` **outputType?**: [`OutputType`](../enumerations/OutputType.md)

Defined in: [packages/contracts/ExecutionContracts.ts:86](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L86)

Output format for ExecutionCoordinator results

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`outputType`](ExecutionOptions.md#outputtype)

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [packages/contracts/ExecutionContracts.ts:92](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/ExecutionContracts.ts#L92)

Abort signal for cancelling the ExecutionCoordinator

#### Inherited from

[`ExecutionOptions`](ExecutionOptions.md).[`signal`](ExecutionOptions.md#signal)
