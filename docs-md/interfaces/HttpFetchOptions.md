[**downflux**](../README.md)

***

[downflux](../README.md) / HttpFetchOptions

# Interface: HttpFetchOptions

Defined in: [packages/contracts/DownloadContracts.ts:69](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/DownloadContracts.ts#L69)

HTTP fetch options.
Controls request headers, retries, timeout, and referer.

## Extended by

- [`ExecutionOptions`](ExecutionOptions.md)

## Properties

### headers?

> `optional` **headers?**: `Record`\<`string`, `string`\>

Defined in: [packages/contracts/DownloadContracts.ts:71](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/DownloadContracts.ts#L71)

Custom request headers

***

### timeoutMs?

> `optional` **timeoutMs?**: `number`

Defined in: [packages/contracts/DownloadContracts.ts:74](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/DownloadContracts.ts#L74)

Request timeout in milliseconds

***

### retries?

> `optional` **retries?**: `number`

Defined in: [packages/contracts/DownloadContracts.ts:77](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/DownloadContracts.ts#L77)

Failed request retry count

***

### referer?

> `optional` **referer?**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:80](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/DownloadContracts.ts#L80)

Request referer URL

***

### formData?

> `optional` **formData?**: `Record`\<`string`, `string`\>

Defined in: [packages/contracts/DownloadContracts.ts:83](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/DownloadContracts.ts#L83)

Optional FormData for POST requests
