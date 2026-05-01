[**downflux**](../README.md)

***

[downflux](../README.md) / HttpFetchOptions

# Interface: HttpFetchOptions

Defined in: [util/interfaces/common/HttpFetchOptions.ts:5](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/HttpFetchOptions.ts#L5)

HTTP fetch options.
Controls request headers, retries, timeout, and referer.

## Extended by

- [`JobOptions`](JobOptions.md)
- [`DownloadOptions`](DownloadOptions.md)

## Properties

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: [util/interfaces/common/HttpFetchOptions.ts:7](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/HttpFetchOptions.ts#L7)

Custom request headers

***

### timeoutMs?

> `optional` **timeoutMs?**: `number`

Defined in: [util/interfaces/common/HttpFetchOptions.ts:10](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/HttpFetchOptions.ts#L10)

Request timeout in milliseconds

***

### retries?

> `optional` **retries?**: `number`

Defined in: [util/interfaces/common/HttpFetchOptions.ts:13](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/HttpFetchOptions.ts#L13)

Failed request retry count

***

### referer?

> `optional` **referer?**: `string`

Defined in: [util/interfaces/common/HttpFetchOptions.ts:16](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/HttpFetchOptions.ts#L16)

Request referer URL
