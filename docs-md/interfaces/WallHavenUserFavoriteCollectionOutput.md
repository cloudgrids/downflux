[**downflux**](../README.md)

***

[downflux](../README.md) / WallHavenUserFavoriteCollectionOutput

# Interface: WallHavenUserFavoriteCollectionOutput

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:177](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/wallhaven/WallHavenContracts.ts#L177)

Interface representing the output structure for WallHaven user upload operations.
Contains uploader pagination and thumbnail results.

## Extends

- [`WallHavenUserInfoOutput`](WallHavenUserInfoOutput.md)

## Properties

### uploader

> **uploader**: `string`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:144](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/wallhaven/WallHavenContracts.ts#L144)

Uploader username

#### Inherited from

[`WallHavenUserInfoOutput`](WallHavenUserInfoOutput.md).[`uploader`](WallHavenUserInfoOutput.md#uploader)

***

### totalContents

> **totalContents**: `number`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:147](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/wallhaven/WallHavenContracts.ts#L147)

Total uploaded content count

#### Inherited from

[`WallHavenUserInfoOutput`](WallHavenUserInfoOutput.md).[`totalContents`](WallHavenUserInfoOutput.md#totalcontents)

***

### totalPages

> **totalPages**: `number`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:150](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/wallhaven/WallHavenContracts.ts#L150)

Total upload pages

#### Inherited from

[`WallHavenUserInfoOutput`](WallHavenUserInfoOutput.md).[`totalPages`](WallHavenUserInfoOutput.md#totalpages)

***

### currentPage

> **currentPage**: `number`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:179](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/wallhaven/WallHavenContracts.ts#L179)

Current upload page

***

### collectionId

> **collectionId**: `string`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:182](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/wallhaven/WallHavenContracts.ts#L182)

The ID of the favorite collection

***

### thumbnails

> **thumbnails**: [`WallHavenThumbnail`](WallHavenThumbnail.md)[]

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:185](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/wallhaven/WallHavenContracts.ts#L185)

Thumbnails found on the upload page

***

### wallPapers?

> `optional` **wallPapers?**: [`WallHavenWallPaperOutput`](WallHavenWallPaperOutput.md)[]

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:188](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/wallhaven/WallHavenContracts.ts#L188)

Wallpaper metadata when requested
