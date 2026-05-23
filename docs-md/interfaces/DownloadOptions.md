[**downflux**](../README.md)

***

[downflux](../README.md) / DownloadOptions

# Interface: DownloadOptions

Defined in: [packages/contracts/DownloadContracts.ts:7](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L7)

HTTP fetch options.
Controls request headers, retries, timeout, and referer.

## Extends

- [`HttpFetchOptions`](HttpFetchOptions.md)

## Properties

### dirConfig?

> `optional` **dirConfig?**: [`DirectoryOutputOptions`](DirectoryOutputOptions.md)

Defined in: [packages/contracts/DownloadContracts.ts:8](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L8)

***

### transcodeOptions?

> `optional` **transcodeOptions?**: [`TranscodeOptions`](TranscodeOptions.md)

Defined in: [packages/contracts/DownloadContracts.ts:9](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L9)

***

### outputType

> **outputType**: [`OutputType`](../enumerations/OutputType.md)

Defined in: [packages/contracts/DownloadContracts.ts:10](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L10)

***

### provider

> **provider**: [`Provider`](../enumerations/Provider.md)

Defined in: [packages/contracts/DownloadContracts.ts:11](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L11)

***

### reExtract?

> `optional` **reExtract?**: (`item`) => `Promise`\<[`PipelineItem`](PipelineItem.md) \| `null`\>

Defined in: [packages/contracts/DownloadContracts.ts:12](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L12)

#### Parameters

##### item

[`PipelineItem`](PipelineItem.md)

#### Returns

`Promise`\<[`PipelineItem`](PipelineItem.md) \| `null`\>

***

### pipelineItem?

> `optional` **pipelineItem?**: [`PipelineItem`](PipelineItem.md)

Defined in: [packages/contracts/DownloadContracts.ts:13](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L13)

***

### noDownload?

> `optional` **noDownload?**: `boolean`

Defined in: [packages/contracts/DownloadContracts.ts:14](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L14)

***

### allowedVideoQuality?

> `optional` **allowedVideoQuality?**: [`VideoQuality`](../enumerations/VideoQuality.md)

Defined in: [packages/contracts/DownloadContracts.ts:15](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L15)

***

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
