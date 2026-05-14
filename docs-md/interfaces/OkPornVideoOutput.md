[**downflux**](../README.md)

***

[downflux](../README.md) / OkPornVideoOutput

# Interface: OkPornVideoOutput

Defined in: [packages/providers/okporn/OkPornContracts.ts:57](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornContracts.ts#L57)

Output structure for OkPorn video operations.
Contains video metadata, sources, poster, and album context.

## Extended by

- [`OkPornOutput`](OkPornOutput.md)

## Properties

### videoId

> **videoId**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:59](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornContracts.ts#L59)

Video identifier

***

### videoTitle

> **videoTitle**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:62](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornContracts.ts#L62)

Video title

***

### videoUrl

> **videoUrl**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:65](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornContracts.ts#L65)

Video page URL

***

### videoKeywords

> **videoKeywords**: `string`[]

Defined in: [packages/providers/okporn/OkPornContracts.ts:68](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornContracts.ts#L68)

Video keywords

***

### videoDescription

> **videoDescription**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:71](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornContracts.ts#L71)

Video description

***

### videoScreenshot

> **videoScreenshot**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:74](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornContracts.ts#L74)

Screenshot image URL

***

### videoSources

> **videoSources**: [`VideoSourceOutput`](VideoSourceOutput.md)[]

Defined in: [packages/providers/okporn/OkPornContracts.ts:77](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornContracts.ts#L77)

Video source URLs with detected quality

***

### videoPoster

> **videoPoster**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:80](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornContracts.ts#L80)

Poster image URL

***

### videoCreatedAt?

> `optional` **videoCreatedAt?**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:83](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornContracts.ts#L83)

Video creation date text

***

### author

> **author**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:86](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornContracts.ts#L86)

Author name associated with the video

***

### fullVideoSource?

> `optional` **fullVideoSource?**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:89](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornContracts.ts#L89)

Full source URL when available

***

### videoAlbumId?

> `optional` **videoAlbumId?**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:92](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornContracts.ts#L92)

Album identifier linked to the video

***

### videoAlbum?

> `optional` **videoAlbum?**: [`OkPornAlbumOutput`](OkPornAlbumOutput.md)

Defined in: [packages/providers/okporn/OkPornContracts.ts:95](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornContracts.ts#L95)

Album metadata linked to the video

***

### starredBy

> **starredBy**: `string`[]

Defined in: [packages/providers/okporn/OkPornContracts.ts:98](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornContracts.ts#L98)

Starred by list
