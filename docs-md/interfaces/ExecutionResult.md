[**downflux**](../README.md)

***

[downflux](../README.md) / ExecutionResult

# Interface: ExecutionResult\<TExtracted\>

Defined in: [util/interfaces/common/ExecutionResult.ts:4](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/ExecutionResult.ts#L4)

Configuration options for a DownFlux job.
Combines fetch, extraction, pipeline, and output settings.

## Extends

- [`ExecutionArgs`](ExecutionArgs.md)

## Type Parameters

### TExtracted

`TExtracted` = `unknown`

## Properties

### service

> **service**: [`ServiceType`](../enumerations/ServiceType.md)

Defined in: [util/interfaces/common/ExecutionArgs.ts:13](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/ExecutionArgs.ts#L13)

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`service`](ExecutionArgs.md#service)

***

### method

> **method**: `string`

Defined in: [util/interfaces/common/ExecutionArgs.ts:14](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/ExecutionArgs.ts#L14)

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`method`](ExecutionArgs.md#method)

***

### entryUrl

> **entryUrl**: `string`

Defined in: [util/interfaces/common/ExecutionArgs.ts:15](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/ExecutionArgs.ts#L15)

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`entryUrl`](ExecutionArgs.md#entryurl)

***

### targets

> **targets**: `string`[]

Defined in: [util/interfaces/common/ExecutionArgs.ts:16](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/ExecutionArgs.ts#L16)

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`targets`](ExecutionArgs.md#targets)

***

### executionType

> **executionType**: [`ExecutionType`](../enumerations/ExecutionType.md)

Defined in: [util/interfaces/common/ExecutionArgs.ts:17](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/ExecutionArgs.ts#L17)

Job execution strategy

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`executionType`](ExecutionArgs.md#executiontype)

***

### urlType

> **urlType**: [`UrlType`](../enumerations/UrlType.md)

Defined in: [util/interfaces/common/ExecutionArgs.ts:18](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/ExecutionArgs.ts#L18)

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`urlType`](ExecutionArgs.md#urltype)

***

### extracted

> **extracted**: `TExtracted`[]

Defined in: [util/interfaces/common/ExecutionResult.ts:5](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/ExecutionResult.ts#L5)

***

### targetUrls

> **targetUrls**: `string`[]

Defined in: [util/interfaces/common/ExecutionResult.ts:6](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/ExecutionResult.ts#L6)

***

### downloaded

> **downloaded**: `number`

Defined in: [util/interfaces/common/ExecutionResult.ts:7](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/ExecutionResult.ts#L7)

***

### failed

> **failed**: `number`

Defined in: [util/interfaces/common/ExecutionResult.ts:8](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/ExecutionResult.ts#L8)

***

### errors

> **errors**: `Error`[]

Defined in: [util/interfaces/common/ExecutionResult.ts:9](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/ExecutionResult.ts#L9)

***

### pipelineItems

> **pipelineItems**: [`PipelineItem`](PipelineItem.md)[]

Defined in: [util/interfaces/common/ExecutionResult.ts:10](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/ExecutionResult.ts#L10)

***

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: [util/interfaces/common/HttpFetchOptions.ts:7](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/HttpFetchOptions.ts#L7)

Custom request headers

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`headers`](ExecutionArgs.md#headers)

***

### timeoutMs?

> `optional` **timeoutMs?**: `number`

Defined in: [util/interfaces/common/HttpFetchOptions.ts:10](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/HttpFetchOptions.ts#L10)

Request timeout in milliseconds

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`timeoutMs`](ExecutionArgs.md#timeoutms)

***

### retries?

> `optional` **retries?**: `number`

Defined in: [util/interfaces/common/HttpFetchOptions.ts:13](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/HttpFetchOptions.ts#L13)

Failed request retry count

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`retries`](ExecutionArgs.md#retries)

***

### referer?

> `optional` **referer?**: `string`

Defined in: [util/interfaces/common/HttpFetchOptions.ts:16](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/HttpFetchOptions.ts#L16)

Request referer URL

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`referer`](ExecutionArgs.md#referer)

***

### dirConfig?

> `optional` **dirConfig?**: [`DirectoryOutputOptions`](DirectoryOutputOptions.md)

Defined in: [util/interfaces/common/JobOptions.ts:15](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L15)

Directory output configuration

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`dirConfig`](ExecutionArgs.md#dirconfig)

***

### allowedExtensions?

> `optional` **allowedExtensions?**: [`AllowedExtension`](../type-aliases/AllowedExtension.md)[]

Defined in: [util/interfaces/common/JobOptions.ts:18](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L18)

Allowed file extensions

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`allowedExtensions`](ExecutionArgs.md#allowedextensions)

***

### videoQualities?

> `optional` **videoQualities?**: [`VideoQuality`](../enumerations/VideoQuality.md)[]

Defined in: [util/interfaces/common/JobOptions.ts:21](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L21)

Allowed video qualities

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`videoQualities`](ExecutionArgs.md#videoqualities)

***

### tagFilterOptions?

> `optional` **tagFilterOptions?**: [`TagFilterOptions`](TagFilterOptions.md)

Defined in: [util/interfaces/common/JobOptions.ts:24](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L24)

Tag filtering options

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`tagFilterOptions`](ExecutionArgs.md#tagfilteroptions)

***

### maxDownloads?

> `optional` **maxDownloads?**: `number`

Defined in: [util/interfaces/common/JobOptions.ts:27](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L27)

Maximum number of items to download

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`maxDownloads`](ExecutionArgs.md#maxdownloads)

***

### concurrency?

> `optional` **concurrency?**: `number`

Defined in: [util/interfaces/common/JobOptions.ts:30](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L30)

Download phase concurrency

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`concurrency`](ExecutionArgs.md#concurrency)

***

### extractConcurrency?

> `optional` **extractConcurrency?**: `number`

Defined in: [util/interfaces/common/JobOptions.ts:33](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L33)

Extraction phase concurrency

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`extractConcurrency`](ExecutionArgs.md#extractconcurrency)

***

### downloadRetries?

> `optional` **downloadRetries?**: `number`

Defined in: [util/interfaces/common/JobOptions.ts:36](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L36)

Download retry count

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`downloadRetries`](ExecutionArgs.md#downloadretries)

***

### retryDelayMs?

> `optional` **retryDelayMs?**: `number`

Defined in: [util/interfaces/common/JobOptions.ts:39](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L39)

Delay between download retries in milliseconds

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`retryDelayMs`](ExecutionArgs.md#retrydelayms)

***

### pipelineHooks?

> `optional` **pipelineHooks?**: [`PipelineHook`](PipelineHook.md)[]

Defined in: [util/interfaces/common/JobOptions.ts:42](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L42)

Pipeline lifecycle hooks

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`pipelineHooks`](ExecutionArgs.md#pipelinehooks)

***

### onProgress?

> `optional` **onProgress?**: (`event`) => `void`

Defined in: [util/interfaces/common/JobOptions.ts:45](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L45)

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

Defined in: [util/interfaces/common/JobOptions.ts:48](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L48)

Enables console progress logging

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`logProgress`](ExecutionArgs.md#logprogress)

***

### outputType?

> `optional` **outputType?**: [`OutputType`](../enumerations/OutputType.md)

Defined in: [util/interfaces/common/JobOptions.ts:51](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L51)

Output format for job results

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`outputType`](ExecutionArgs.md#outputtype)

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [util/interfaces/common/JobOptions.ts:57](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L57)

Abort signal for cancelling the job

#### Inherited from

[`ExecutionArgs`](ExecutionArgs.md).[`signal`](ExecutionArgs.md#signal)
