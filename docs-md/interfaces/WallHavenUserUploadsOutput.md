[**downflux**](../README.md)

***

[downflux](../README.md) / WallHavenUserUploadsOutput

# Interface: WallHavenUserUploadsOutput

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:126](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/wallhaven/WallHavenContracts.ts#L126)

Interface representing the output structure for WallHaven user upload operations.
Contains uploader pagination and thumbnail results.

## Extends

- [`WallHavenUserInfoOutput`](WallHavenUserInfoOutput.md)

## Properties

### currentPage

> **currentPage**: `number`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:128](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/wallhaven/WallHavenContracts.ts#L128)

Current upload page

***

### thumbnails

> **thumbnails**: [`WallHavenThumbnail`](WallHavenThumbnail.md)[]

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:131](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/wallhaven/WallHavenContracts.ts#L131)

Thumbnails found on the upload page

***

### wallPapers?

> `optional` **wallPapers?**: [`WallHavenWallPaperOutput`](WallHavenWallPaperOutput.md)[]

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:134](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/wallhaven/WallHavenContracts.ts#L134)

Wallpaper metadata when requested

***

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
