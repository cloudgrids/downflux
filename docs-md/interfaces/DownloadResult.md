[**downflux**](../README.md)

***

[downflux](../README.md) / DownloadResult

# Interface: DownloadResult

Defined in: [util/interfaces/common/DownloadResult.ts:7](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DownloadResult.ts#L7)

Result of a download operation.
Contains file metadata and the downloaded buffer.

## Properties

### url

> **url**: `string`

Defined in: [util/interfaces/common/DownloadResult.ts:9](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DownloadResult.ts#L9)

Requested download URL

***

### buffer

> **buffer**: `Buffer`

Defined in: [util/interfaces/common/DownloadResult.ts:12](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DownloadResult.ts#L12)

Downloaded file buffer

***

### finalUrl

> **finalUrl**: `string`

Defined in: [util/interfaces/common/DownloadResult.ts:15](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DownloadResult.ts#L15)

Final URL after redirects

***

### extendedFilename

> **extendedFilename**: `string`

Defined in: [util/interfaces/common/DownloadResult.ts:18](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DownloadResult.ts#L18)

Generated filename with metadata

***

### originalFilename

> **originalFilename**: `string`

Defined in: [util/interfaces/common/DownloadResult.ts:21](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DownloadResult.ts#L21)

Original filename from URL or response

***

### extension

> **extension**: `string`

Defined in: [util/interfaces/common/DownloadResult.ts:24](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DownloadResult.ts#L24)

File extension

***

### mimeType

> **mimeType**: `string`

Defined in: [util/interfaces/common/DownloadResult.ts:27](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DownloadResult.ts#L27)

MIME type

***

### sizeBytes

> **sizeBytes**: `number`

Defined in: [util/interfaces/common/DownloadResult.ts:30](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DownloadResult.ts#L30)

File size in bytes

***

### service

> **service**: [`ServiceType`](../enumerations/ServiceType.md)

Defined in: [util/interfaces/common/DownloadResult.ts:33](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DownloadResult.ts#L33)

Service used for the download
