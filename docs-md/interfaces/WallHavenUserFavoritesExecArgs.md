[**downflux**](../README.md)

***

[downflux](../README.md) / WallHavenUserFavoritesExecArgs

# Interface: WallHavenUserFavoritesExecArgs

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:41](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/wallhaven/WallHavenContracts.ts#L41)

Execution arguments for WallHaven user favorites collection.
Extends user upload arguments with favorites collection ID.

## Extends

- [`WallHavenUserExecArgs`](WallHavenUserExecArgs.md)

## Properties

### username

> **username**: `string`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:27](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/wallhaven/WallHavenContracts.ts#L27)

Uploader username

#### Inherited from

[`WallHavenUserExecArgs`](WallHavenUserExecArgs.md).[`username`](WallHavenUserExecArgs.md#username)

***

### purity?

> `optional` **purity?**: `boolean`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:30](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/wallhaven/WallHavenContracts.ts#L30)

Purity-safe upload listing flag, default is false

#### Inherited from

[`WallHavenUserExecArgs`](WallHavenUserExecArgs.md).[`purity`](WallHavenUserExecArgs.md#purity)

***

### includeMetadata?

> `optional` **includeMetadata?**: `boolean`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:33](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/wallhaven/WallHavenContracts.ts#L33)

Includes full wallpaper metadata for each thumbnail

#### Inherited from

[`WallHavenUserExecArgs`](WallHavenUserExecArgs.md).[`includeMetadata`](WallHavenUserExecArgs.md#includemetadata)

***

### collectionId

> **collectionId**: `string`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:43](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/wallhaven/WallHavenContracts.ts#L43)

Favorites collection ID
