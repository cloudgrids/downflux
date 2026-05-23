[**downflux**](../README.md)

***

[downflux](../README.md) / WallHavenUserExecArgs

# Interface: WallHavenUserExecArgs

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:25](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/wallhaven/WallHavenContracts.ts#L25)

Execution arguments for WallHaven user uploads.
Controls uploader, purity, and metadata expansion.

## Extended by

- [`WallHavenUserFavoritesExecArgs`](WallHavenUserFavoritesExecArgs.md)

## Properties

### username

> **username**: `string`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:27](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/wallhaven/WallHavenContracts.ts#L27)

Uploader username

***

### purity?

> `optional` **purity?**: `boolean`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:30](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/wallhaven/WallHavenContracts.ts#L30)

Purity-safe upload listing flag, default is false

***

### includeMetadata?

> `optional` **includeMetadata?**: `boolean`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:33](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/wallhaven/WallHavenContracts.ts#L33)

Includes full wallpaper metadata for each thumbnail
