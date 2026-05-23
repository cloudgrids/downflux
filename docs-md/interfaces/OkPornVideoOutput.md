[**downflux**](../README.md)

***

[downflux](../README.md) / OkPornVideoOutput

# Interface: OkPornVideoOutput

Defined in: [packages/providers/okporn/OkPornContracts.ts:57](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/okporn/OkPornContracts.ts#L57)

Output structure for OkPorn video operations.
Contains video metadata, sources, poster, and album context.

## Extends

- [`DefaultVideoOutput`](DefaultVideoOutput.md)

## Extended by

- [`OkPornOutput`](OkPornOutput.md)

## Properties

### title

> **title**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:210](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L210)

#### Inherited from

[`DefaultVideoOutput`](DefaultVideoOutput.md).[`title`](DefaultVideoOutput.md#title)

***

### tags

> **tags**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:211](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L211)

#### Inherited from

[`DefaultVideoOutput`](DefaultVideoOutput.md).[`tags`](DefaultVideoOutput.md#tags)

***

### description

> **description**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:212](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L212)

#### Inherited from

[`DefaultVideoOutput`](DefaultVideoOutput.md).[`description`](DefaultVideoOutput.md#description)

***

### pageUrl

> **pageUrl**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:213](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L213)

#### Inherited from

[`DefaultVideoOutput`](DefaultVideoOutput.md).[`pageUrl`](DefaultVideoOutput.md#pageurl)

***

### poster

> **poster**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:222](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L222)

#### Inherited from

[`DefaultVideoOutput`](DefaultVideoOutput.md).[`poster`](DefaultVideoOutput.md#poster)

***

### videos

> **videos**: [`VideosFormat`](VideosFormat.md)

Defined in: [packages/contracts/ExecutionContracts.ts:223](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L223)

#### Inherited from

[`DefaultVideoOutput`](DefaultVideoOutput.md).[`videos`](DefaultVideoOutput.md#videos)

***

### videoId

> **videoId**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:59](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/okporn/OkPornContracts.ts#L59)

Video identifier

***

### videoScreenshot

> **videoScreenshot**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:62](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/okporn/OkPornContracts.ts#L62)

Screenshot image URL

***

### videoCreatedAt?

> `optional` **videoCreatedAt?**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:65](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/okporn/OkPornContracts.ts#L65)

Video creation date text

***

### author

> **author**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:68](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/okporn/OkPornContracts.ts#L68)

Author name associated with the video

***

### fullVideoSource?

> `optional` **fullVideoSource?**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:71](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/okporn/OkPornContracts.ts#L71)

Full source URL when available

***

### videoAlbumId?

> `optional` **videoAlbumId?**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:74](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/okporn/OkPornContracts.ts#L74)

Album identifier linked to the video

***

### videoAlbum?

> `optional` **videoAlbum?**: [`OkPornAlbumOutput`](OkPornAlbumOutput.md)

Defined in: [packages/providers/okporn/OkPornContracts.ts:77](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/okporn/OkPornContracts.ts#L77)

Album metadata linked to the video

***

### starredBy

> **starredBy**: `string`[]

Defined in: [packages/providers/okporn/OkPornContracts.ts:80](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/okporn/OkPornContracts.ts#L80)

Starred by list
