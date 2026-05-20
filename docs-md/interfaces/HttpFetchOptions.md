[**downflux**](../README.md)

***

[downflux](../README.md) / HttpFetchOptions

# Interface: HttpFetchOptions

Defined in: [packages/contracts/DownloadContracts.ts:74](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/contracts/DownloadContracts.ts#L74)

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

Defined in: [packages/contracts/DownloadContracts.ts:76](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/contracts/DownloadContracts.ts#L76)

Custom request headers

***

### timeoutMs?

> `optional` **timeoutMs?**: `number`

Defined in: [packages/contracts/DownloadContracts.ts:79](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/contracts/DownloadContracts.ts#L79)

Request timeout in milliseconds

***

### retries?

> `optional` **retries?**: `number`

Defined in: [packages/contracts/DownloadContracts.ts:82](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/contracts/DownloadContracts.ts#L82)

Failed request retry count

***

### referer?

> `optional` **referer?**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:85](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/contracts/DownloadContracts.ts#L85)

Request referer URL

***

### formData?

> `optional` **formData?**: `Record`\<`string`, `string`\>

Defined in: [packages/contracts/DownloadContracts.ts:88](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/contracts/DownloadContracts.ts#L88)

Optional FormData for POST requests

***

### userAgent?

> `optional` **userAgent?**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:105](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/contracts/ExecutionContracts.ts#L105)

#### Inherited from

[`HttpAgentOptions`](HttpAgentOptions.md).[`userAgent`](HttpAgentOptions.md#useragent)

***

### enableSniSpoofing?

> `optional` **enableSniSpoofing?**: `boolean`

Defined in: [packages/contracts/ExecutionContracts.ts:107](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/contracts/ExecutionContracts.ts#L107)

#### Inherited from

[`HttpAgentOptions`](HttpAgentOptions.md).[`enableSniSpoofing`](HttpAgentOptions.md#enablesnispoofing)

***

### proxy?

> `optional` **proxy?**: [`ProxyOptions`](ProxyOptions.md)

Defined in: [packages/contracts/ExecutionContracts.ts:109](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/contracts/ExecutionContracts.ts#L109)

#### Inherited from

[`HttpAgentOptions`](HttpAgentOptions.md).[`proxy`](HttpAgentOptions.md#proxy)

***

### dispatcher?

> `optional` **dispatcher?**: `Dispatcher`

Defined in: [packages/contracts/ExecutionContracts.ts:111](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/contracts/ExecutionContracts.ts#L111)

#### Inherited from

[`HttpAgentOptions`](HttpAgentOptions.md).[`dispatcher`](HttpAgentOptions.md#dispatcher)
