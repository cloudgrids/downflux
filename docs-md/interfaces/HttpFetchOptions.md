[**downflux**](../README.md)

***

[downflux](../README.md) / HttpFetchOptions

# Interface: HttpFetchOptions

Defined in: [packages/contracts/DownloadContracts.ts:74](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L74)

HTTP fetch options.
Controls request headers, retries, timeout, and referer.

## Extends

- [`HttpAgentOptions`](HttpAgentOptions.md)

## Extended by

- [`DownloadOptions`](DownloadOptions.md)
- [`ExecutionOptions`](ExecutionOptions.md)

## Properties

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: [packages/contracts/DownloadContracts.ts:76](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L76)

Custom request headers

***

### timeoutMs?

> `optional` **timeoutMs?**: `number`

Defined in: [packages/contracts/DownloadContracts.ts:79](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L79)

Request timeout in milliseconds

***

### retries?

> `optional` **retries?**: `number`

Defined in: [packages/contracts/DownloadContracts.ts:82](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L82)

Failed request retry count

***

### referer?

> `optional` **referer?**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:85](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L85)

Request referer URL

***

### formData?

> `optional` **formData?**: `Record`\<`string`, `string`\>

Defined in: [packages/contracts/DownloadContracts.ts:88](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L88)

Optional FormData for POST requests

***

### userAgent?

> `optional` **userAgent?**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:129](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L129)

#### Inherited from

[`HttpAgentOptions`](HttpAgentOptions.md).[`userAgent`](HttpAgentOptions.md#useragent)

***

### enableSniSpoofing?

> `optional` **enableSniSpoofing?**: `boolean`

Defined in: [packages/contracts/ExecutionContracts.ts:131](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L131)

#### Inherited from

[`HttpAgentOptions`](HttpAgentOptions.md).[`enableSniSpoofing`](HttpAgentOptions.md#enablesnispoofing)

***

### proxy?

> `optional` **proxy?**: [`ProxyOptions`](ProxyOptions.md)

Defined in: [packages/contracts/ExecutionContracts.ts:133](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L133)

#### Inherited from

[`HttpAgentOptions`](HttpAgentOptions.md).[`proxy`](HttpAgentOptions.md#proxy)

***

### dispatcher?

> `optional` **dispatcher?**: `Dispatcher`

Defined in: [packages/contracts/ExecutionContracts.ts:135](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L135)

#### Inherited from

[`HttpAgentOptions`](HttpAgentOptions.md).[`dispatcher`](HttpAgentOptions.md#dispatcher)
