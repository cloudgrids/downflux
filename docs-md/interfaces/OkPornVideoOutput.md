[**downflux**](../README.md)

***

[downflux](../README.md) / OkPornVideoOutput

# Interface: OkPornVideoOutput

Defined in: [util/interfaces/services/okporn/OkPornVideoOutput.ts:8](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/services/okporn/OkPornVideoOutput.ts#L8)

Output structure for OkPorn video operations.
Contains video metadata, sources, poster, and album context.

## Extended by

- [`OkPornOutput`](OkPornOutput.md)

## Properties

### videoId

> **videoId**: `string`

Defined in: [util/interfaces/services/okporn/OkPornVideoOutput.ts:10](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/services/okporn/OkPornVideoOutput.ts#L10)

Video identifier

***

### videoTitle

> **videoTitle**: `string`

Defined in: [util/interfaces/services/okporn/OkPornVideoOutput.ts:13](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/services/okporn/OkPornVideoOutput.ts#L13)

Video title

***

### videoUrl

> **videoUrl**: `string`

Defined in: [util/interfaces/services/okporn/OkPornVideoOutput.ts:16](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/services/okporn/OkPornVideoOutput.ts#L16)

Video page URL

***

### videoKeywords

> **videoKeywords**: `string`[]

Defined in: [util/interfaces/services/okporn/OkPornVideoOutput.ts:19](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/services/okporn/OkPornVideoOutput.ts#L19)

Video keywords

***

### videoDescription

> **videoDescription**: `string`

Defined in: [util/interfaces/services/okporn/OkPornVideoOutput.ts:22](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/services/okporn/OkPornVideoOutput.ts#L22)

Video description

***

### videoScreenshot

> **videoScreenshot**: `string`

Defined in: [util/interfaces/services/okporn/OkPornVideoOutput.ts:25](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/services/okporn/OkPornVideoOutput.ts#L25)

Screenshot image URL

***

### videoSources

> **videoSources**: [`VideoSourceOutput`](VideoSourceOutput.md)[]

Defined in: [util/interfaces/services/okporn/OkPornVideoOutput.ts:28](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/services/okporn/OkPornVideoOutput.ts#L28)

Video source URLs with detected quality

***

### videoPoster

> **videoPoster**: `string`

Defined in: [util/interfaces/services/okporn/OkPornVideoOutput.ts:31](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/services/okporn/OkPornVideoOutput.ts#L31)

Poster image URL

***

### videoCreatedAt?

> `optional` **videoCreatedAt?**: `string`

Defined in: [util/interfaces/services/okporn/OkPornVideoOutput.ts:34](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/services/okporn/OkPornVideoOutput.ts#L34)

Video creation date text

***

### modelName

> **modelName**: `string`

Defined in: [util/interfaces/services/okporn/OkPornVideoOutput.ts:37](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/services/okporn/OkPornVideoOutput.ts#L37)

Model name associated with the video

***

### fullVideoSource?

> `optional` **fullVideoSource?**: `string`

Defined in: [util/interfaces/services/okporn/OkPornVideoOutput.ts:40](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/services/okporn/OkPornVideoOutput.ts#L40)

Full source URL when available

***

### videoAlbumId?

> `optional` **videoAlbumId?**: `string`

Defined in: [util/interfaces/services/okporn/OkPornVideoOutput.ts:43](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/services/okporn/OkPornVideoOutput.ts#L43)

Album identifier linked to the video

***

### videoAlbum?

> `optional` **videoAlbum?**: [`OkPornAlbumOutput`](OkPornAlbumOutput.md)

Defined in: [util/interfaces/services/okporn/OkPornVideoOutput.ts:46](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/services/okporn/OkPornVideoOutput.ts#L46)

Album metadata linked to the video
