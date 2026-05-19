[**downflux**](../README.md)

***

[downflux](../README.md) / DownloadResult

# Interface: DownloadResult

Defined in: [packages/contracts/DownloadContracts.ts:22](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/DownloadContracts.ts#L22)

Result of a download operation.
Contains file metadata and the downloaded buffer.

## Properties

### url

> **url**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:24](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/DownloadContracts.ts#L24)

Requested download URL

***

### buffer

> **buffer**: `Buffer`

Defined in: [packages/contracts/DownloadContracts.ts:27](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/DownloadContracts.ts#L27)

Downloaded file buffer

***

### finalUrl

> **finalUrl**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:30](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/DownloadContracts.ts#L30)

Final URL after redirects

***

### extendedFilename

> **extendedFilename**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:33](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/DownloadContracts.ts#L33)

Generated filename with metadata

***

### originalFilename

> **originalFilename**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:36](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/DownloadContracts.ts#L36)

Original filename from URL or response

***

### extension

> **extension**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:39](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/DownloadContracts.ts#L39)

File extension

***

### mimeType

> **mimeType**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:42](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/DownloadContracts.ts#L42)

MIME type

***

### sizeBytes

> **sizeBytes**: `number`

Defined in: [packages/contracts/DownloadContracts.ts:45](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/DownloadContracts.ts#L45)

File size in bytes

***

### path

> **path**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:48](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/DownloadContracts.ts#L48)

Path of the downloaded file

***

### provider

> **provider**: [`ProviderType`](../enumerations/ProviderType.md)

Defined in: [packages/contracts/DownloadContracts.ts:51](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/DownloadContracts.ts#L51)

Service used for the download
