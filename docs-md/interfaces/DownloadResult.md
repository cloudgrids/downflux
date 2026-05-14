[**downflux**](../README.md)

***

[downflux](../README.md) / DownloadResult

# Interface: DownloadResult

Defined in: [packages/contracts/DownloadContracts.ts:17](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L17)

Result of a download operation.
Contains file metadata and the downloaded buffer.

## Properties

### url

> **url**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:19](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L19)

Requested download URL

***

### buffer

> **buffer**: `Buffer`

Defined in: [packages/contracts/DownloadContracts.ts:22](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L22)

Downloaded file buffer

***

### finalUrl

> **finalUrl**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:25](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L25)

Final URL after redirects

***

### extendedFilename

> **extendedFilename**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:28](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L28)

Generated filename with metadata

***

### originalFilename

> **originalFilename**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:31](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L31)

Original filename from URL or response

***

### extension

> **extension**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:34](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L34)

File extension

***

### mimeType

> **mimeType**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:37](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L37)

MIME type

***

### sizeBytes

> **sizeBytes**: `number`

Defined in: [packages/contracts/DownloadContracts.ts:40](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L40)

File size in bytes

***

### path

> **path**: `string`

Defined in: [packages/contracts/DownloadContracts.ts:43](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L43)

Path of the downloaded file

***

### provider

> **provider**: [`ProviderType`](../enumerations/ProviderType.md)

Defined in: [packages/contracts/DownloadContracts.ts:46](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L46)

Service used for the download
