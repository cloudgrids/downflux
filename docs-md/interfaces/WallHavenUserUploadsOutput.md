[**downflux**](../README.md)

***

[downflux](../README.md) / WallHavenUserUploadsOutput

# Interface: WallHavenUserUploadsOutput

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:127](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/wallhaven/WallHavenContracts.ts#L127)

Interface representing the output structure for WallHaven user upload operations.
Contains uploader pagination and thumbnail results.

## Extends

- [`WallHavenUserInfoOutput`](WallHavenUserInfoOutput.md)

## Properties

### currentPage

> **currentPage**: `number`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:129](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/wallhaven/WallHavenContracts.ts#L129)

Current upload page

***

### thumbnails

> **thumbnails**: [`WallHavenThumbnail`](WallHavenThumbnail.md)[]

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:132](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/wallhaven/WallHavenContracts.ts#L132)

Thumbnails found on the upload page

***

### wallPapers?

> `optional` **wallPapers?**: [`WallHavenWallPaperOutput`](WallHavenWallPaperOutput.md)[]

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:135](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/wallhaven/WallHavenContracts.ts#L135)

Wallpaper metadata when requested

***

### uploader

> **uploader**: `string`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:145](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/wallhaven/WallHavenContracts.ts#L145)

Uploader username

#### Inherited from

[`WallHavenUserInfoOutput`](WallHavenUserInfoOutput.md).[`uploader`](WallHavenUserInfoOutput.md#uploader)

***

### totalContents

> **totalContents**: `number`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:148](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/wallhaven/WallHavenContracts.ts#L148)

Total uploaded content count

#### Inherited from

[`WallHavenUserInfoOutput`](WallHavenUserInfoOutput.md).[`totalContents`](WallHavenUserInfoOutput.md#totalcontents)

***

### totalPages

> **totalPages**: `number`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:151](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/wallhaven/WallHavenContracts.ts#L151)

Total upload pages

#### Inherited from

[`WallHavenUserInfoOutput`](WallHavenUserInfoOutput.md).[`totalPages`](WallHavenUserInfoOutput.md#totalpages)
