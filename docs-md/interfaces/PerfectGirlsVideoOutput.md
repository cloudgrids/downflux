[**downflux**](../README.md)

***

[downflux](../README.md) / PerfectGirlsVideoOutput

# Interface: PerfectGirlsVideoOutput

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:58](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L58)

Output structure for PerfectGirls video operations.
Contains video metadata, sources, poster, and album context.

## Extended by

- [`PerfectGirlsOutput`](PerfectGirlsOutput.md)

## Properties

### videoId

> **videoId**: `string`

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:60](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L60)

Video identifier

***

### videoTitle

> **videoTitle**: `string`

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:63](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L63)

Video title

***

### videoUrl

> **videoUrl**: `string`

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:66](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L66)

Video page URL

***

### videoKeywords

> **videoKeywords**: `string`[]

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:69](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L69)

Video keywords

***

### videoDescription

> **videoDescription**: `string`

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:72](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L72)

Video description

***

### videoScreenshot

> **videoScreenshot**: `string`

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:75](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L75)

Screenshot image URL

***

### videoSources

> **videoSources**: [`VideoSourceOutput`](VideoSourceOutput.md)[]

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:78](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L78)

Video source URLs with detected quality

***

### videoPoster

> **videoPoster**: `string`

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:81](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L81)

Poster image URL

***

### videoCreatedAt?

> `optional` **videoCreatedAt?**: `string`

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:84](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L84)

Video creation date text

***

### author

> **author**: `string`

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:87](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L87)

Author name associated with the video

***

### fullVideoSource?

> `optional` **fullVideoSource?**: `string`

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:90](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L90)

Full source URL when available

***

### videoAlbumId?

> `optional` **videoAlbumId?**: `string`

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:93](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L93)

Album identifier linked to the video

***

### videoAlbum?

> `optional` **videoAlbum?**: [`PerfectGirlsAlbumOutput`](PerfectGirlsAlbumOutput.md)

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:96](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L96)

Album metadata linked to the video

***

### starredBy

> **starredBy**: `string`[]

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:99](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L99)

Starred by list
