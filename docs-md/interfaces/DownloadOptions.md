[**downflux**](../README.md)

***

[downflux](../README.md) / DownloadOptions

# Interface: DownloadOptions

Defined in: [util/interfaces/downloaders/DownloadOptions.ts:4](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/downloaders/DownloadOptions.ts#L4)

HTTP fetch options.
Controls request headers, retries, timeout, and referer.

## Extends

- [`HttpFetchOptions`](HttpFetchOptions.md).[`JobOptions`](JobOptions.md)

## Properties

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: [util/interfaces/common/HttpFetchOptions.ts:7](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/HttpFetchOptions.ts#L7)

Custom request headers

#### Inherited from

[`HttpFetchOptions`](HttpFetchOptions.md).[`headers`](HttpFetchOptions.md#headers)

***

### timeoutMs?

> `optional` **timeoutMs?**: `number`

Defined in: [util/interfaces/common/HttpFetchOptions.ts:10](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/HttpFetchOptions.ts#L10)

Request timeout in milliseconds

#### Inherited from

[`HttpFetchOptions`](HttpFetchOptions.md).[`timeoutMs`](HttpFetchOptions.md#timeoutms)

***

### retries?

> `optional` **retries?**: `number`

Defined in: [util/interfaces/common/HttpFetchOptions.ts:13](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/HttpFetchOptions.ts#L13)

Failed request retry count

#### Inherited from

[`HttpFetchOptions`](HttpFetchOptions.md).[`retries`](HttpFetchOptions.md#retries)

***

### referer?

> `optional` **referer?**: `string`

Defined in: [util/interfaces/common/HttpFetchOptions.ts:16](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/HttpFetchOptions.ts#L16)

Request referer URL

#### Inherited from

[`HttpFetchOptions`](HttpFetchOptions.md).[`referer`](HttpFetchOptions.md#referer)

***

### dirConfig?

> `optional` **dirConfig?**: [`DirectoryOutputOptions`](DirectoryOutputOptions.md)

Defined in: [util/interfaces/common/JobOptions.ts:15](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L15)

Directory output configuration

#### Inherited from

[`JobOptions`](JobOptions.md).[`dirConfig`](JobOptions.md#dirconfig)

***

### allowedExtensions?

> `optional` **allowedExtensions?**: [`AllowedExtension`](../type-aliases/AllowedExtension.md)[]

Defined in: [util/interfaces/common/JobOptions.ts:18](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L18)

Allowed file extensions

#### Inherited from

[`JobOptions`](JobOptions.md).[`allowedExtensions`](JobOptions.md#allowedextensions)

***

### videoQualities?

> `optional` **videoQualities?**: [`VideoQuality`](../enumerations/VideoQuality.md)[]

Defined in: [util/interfaces/common/JobOptions.ts:21](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L21)

Allowed video qualities

#### Inherited from

[`JobOptions`](JobOptions.md).[`videoQualities`](JobOptions.md#videoqualities)

***

### tagFilterOptions?

> `optional` **tagFilterOptions?**: [`TagFilterOptions`](TagFilterOptions.md)

Defined in: [util/interfaces/common/JobOptions.ts:24](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L24)

Tag filtering options

#### Inherited from

[`JobOptions`](JobOptions.md).[`tagFilterOptions`](JobOptions.md#tagfilteroptions)

***

### maxDownloads?

> `optional` **maxDownloads?**: `number`

Defined in: [util/interfaces/common/JobOptions.ts:27](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L27)

Maximum number of items to download

#### Inherited from

[`JobOptions`](JobOptions.md).[`maxDownloads`](JobOptions.md#maxdownloads)

***

### concurrency?

> `optional` **concurrency?**: `number`

Defined in: [util/interfaces/common/JobOptions.ts:30](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L30)

Download phase concurrency

#### Inherited from

[`JobOptions`](JobOptions.md).[`concurrency`](JobOptions.md#concurrency)

***

### extractConcurrency?

> `optional` **extractConcurrency?**: `number`

Defined in: [util/interfaces/common/JobOptions.ts:33](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L33)

Extraction phase concurrency

#### Inherited from

[`JobOptions`](JobOptions.md).[`extractConcurrency`](JobOptions.md#extractconcurrency)

***

### downloadRetries?

> `optional` **downloadRetries?**: `number`

Defined in: [util/interfaces/common/JobOptions.ts:36](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L36)

Download retry count

#### Inherited from

[`JobOptions`](JobOptions.md).[`downloadRetries`](JobOptions.md#downloadretries)

***

### retryDelayMs?

> `optional` **retryDelayMs?**: `number`

Defined in: [util/interfaces/common/JobOptions.ts:39](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L39)

Delay between download retries in milliseconds

#### Inherited from

[`JobOptions`](JobOptions.md).[`retryDelayMs`](JobOptions.md#retrydelayms)

***

### pipelineHooks?

> `optional` **pipelineHooks?**: [`PipelineHook`](PipelineHook.md)[]

Defined in: [util/interfaces/common/JobOptions.ts:42](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L42)

Pipeline lifecycle hooks

#### Inherited from

[`JobOptions`](JobOptions.md).[`pipelineHooks`](JobOptions.md#pipelinehooks)

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

[`JobOptions`](JobOptions.md).[`onProgress`](JobOptions.md#onprogress)

***

### logProgress?

> `optional` **logProgress?**: `boolean`

Defined in: [util/interfaces/common/JobOptions.ts:48](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L48)

Enables console progress logging

#### Inherited from

[`JobOptions`](JobOptions.md).[`logProgress`](JobOptions.md#logprogress)

***

### executionType?

> `optional` **executionType?**: [`ExecutionType`](../enumerations/ExecutionType.md)

Defined in: [util/interfaces/common/JobOptions.ts:54](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L54)

Job execution strategy

#### Inherited from

[`JobOptions`](JobOptions.md).[`executionType`](JobOptions.md#executiontype)

***

### signal?

> `optional` **signal?**: `AbortSignal`

Defined in: [util/interfaces/common/JobOptions.ts:57](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobOptions.ts#L57)

Abort signal for cancelling the job

#### Inherited from

[`JobOptions`](JobOptions.md).[`signal`](JobOptions.md#signal)

***

### outputType?

> `optional` **outputType?**: [`OutputType`](../enumerations/OutputType.md)

Defined in: [util/interfaces/downloaders/DownloadOptions.ts:5](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/downloaders/DownloadOptions.ts#L5)

Output format for job results

#### Overrides

[`JobOptions`](JobOptions.md).[`outputType`](JobOptions.md#outputtype)

***

### service

> **service**: [`ServiceType`](../enumerations/ServiceType.md)

Defined in: [util/interfaces/downloaders/DownloadOptions.ts:6](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/downloaders/DownloadOptions.ts#L6)
