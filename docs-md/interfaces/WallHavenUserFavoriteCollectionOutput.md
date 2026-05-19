[**downflux**](../README.md)

***

[downflux](../README.md) / WallHavenUserFavoriteCollectionOutput

# Interface: WallHavenUserFavoriteCollectionOutput

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:178](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/wallhaven/WallHavenContracts.ts#L178)

Interface representing the output structure for WallHaven user upload operations.
Contains uploader pagination and thumbnail results.

## Extends

- [`WallHavenUserInfoOutput`](WallHavenUserInfoOutput.md)

## Properties

### uploader

> **uploader**: `string`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:145](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/wallhaven/WallHavenContracts.ts#L145)

Uploader username

#### Inherited from

[`WallHavenUserInfoOutput`](WallHavenUserInfoOutput.md).[`uploader`](WallHavenUserInfoOutput.md#uploader)

***

### totalContents

> **totalContents**: `number`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:148](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/wallhaven/WallHavenContracts.ts#L148)

Total uploaded content count

#### Inherited from

[`WallHavenUserInfoOutput`](WallHavenUserInfoOutput.md).[`totalContents`](WallHavenUserInfoOutput.md#totalcontents)

***

### totalPages

> **totalPages**: `number`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:151](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/wallhaven/WallHavenContracts.ts#L151)

Total upload pages

#### Inherited from

[`WallHavenUserInfoOutput`](WallHavenUserInfoOutput.md).[`totalPages`](WallHavenUserInfoOutput.md#totalpages)

***

### currentPage

> **currentPage**: `number`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:180](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/wallhaven/WallHavenContracts.ts#L180)

Current upload page

***

### collectionId

> **collectionId**: `string`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:183](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/wallhaven/WallHavenContracts.ts#L183)

The ID of the favorite collection

***

### thumbnails

> **thumbnails**: [`WallHavenThumbnail`](WallHavenThumbnail.md)[]

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:186](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/wallhaven/WallHavenContracts.ts#L186)

Thumbnails found on the upload page

***

### wallPapers?

> `optional` **wallPapers?**: [`WallHavenWallPaperOutput`](WallHavenWallPaperOutput.md)[]

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:189](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/wallhaven/WallHavenContracts.ts#L189)

Wallpaper metadata when requested
