[**downflux**](../README.md)

***

[downflux](../README.md) / WallHavenUserUploadsOutput

# Interface: WallHavenUserUploadsOutput

Defined in: [util/interfaces/services/wallhaven/WallHavenUserUploadsOutput.ts:8](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/services/wallhaven/WallHavenUserUploadsOutput.ts#L8)

Output structure for WallHaven user upload operations.
Contains uploader pagination and thumbnail results.

## Properties

### uploader

> **uploader**: `string`

Defined in: [util/interfaces/services/wallhaven/WallHavenUserUploadsOutput.ts:10](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/services/wallhaven/WallHavenUserUploadsOutput.ts#L10)

Uploader username

***

### totalContents

> **totalContents**: `number`

Defined in: [util/interfaces/services/wallhaven/WallHavenUserUploadsOutput.ts:13](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/services/wallhaven/WallHavenUserUploadsOutput.ts#L13)

Total uploaded content count

***

### totalPages

> **totalPages**: `number`

Defined in: [util/interfaces/services/wallhaven/WallHavenUserUploadsOutput.ts:16](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/services/wallhaven/WallHavenUserUploadsOutput.ts#L16)

Total upload pages

***

### currentPage

> **currentPage**: `number`

Defined in: [util/interfaces/services/wallhaven/WallHavenUserUploadsOutput.ts:19](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/services/wallhaven/WallHavenUserUploadsOutput.ts#L19)

Current upload page

***

### thumbnails

> **thumbnails**: [`WallHavenThumbnail`](WallHavenThumbnail.md)[]

Defined in: [util/interfaces/services/wallhaven/WallHavenUserUploadsOutput.ts:22](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/services/wallhaven/WallHavenUserUploadsOutput.ts#L22)

Thumbnails found on the upload page

***

### wallPapers?

> `optional` **wallPapers?**: [`WallHavenWallPaperOutput`](WallHavenWallPaperOutput.md)[]

Defined in: [util/interfaces/services/wallhaven/WallHavenUserUploadsOutput.ts:25](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/services/wallhaven/WallHavenUserUploadsOutput.ts#L25)

Wallpaper metadata when requested
