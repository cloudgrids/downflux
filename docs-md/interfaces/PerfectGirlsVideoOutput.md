[**downflux**](../README.md)

***

[downflux](../README.md) / PerfectGirlsVideoOutput

# Interface: PerfectGirlsVideoOutput

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:58](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L58)

Output structure for PerfectGirls video operations.
Contains video metadata, sources, poster, and album context.

## Extends

- [`DefaultVideoOutput`](DefaultVideoOutput.md)

## Extended by

- [`PerfectGirlsOutput`](PerfectGirlsOutput.md)

## Properties

### title

> **title**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:186](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L186)

#### Inherited from

[`DefaultVideoOutput`](DefaultVideoOutput.md).[`title`](DefaultVideoOutput.md#title)

***

### tags

> **tags**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:187](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L187)

#### Inherited from

[`DefaultVideoOutput`](DefaultVideoOutput.md).[`tags`](DefaultVideoOutput.md#tags)

***

### description

> **description**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:188](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L188)

#### Inherited from

[`DefaultVideoOutput`](DefaultVideoOutput.md).[`description`](DefaultVideoOutput.md#description)

***

### pageUrl

> **pageUrl**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:189](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L189)

#### Inherited from

[`DefaultVideoOutput`](DefaultVideoOutput.md).[`pageUrl`](DefaultVideoOutput.md#pageurl)

***

### poster

> **poster**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:198](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L198)

#### Inherited from

[`DefaultVideoOutput`](DefaultVideoOutput.md).[`poster`](DefaultVideoOutput.md#poster)

***

### videos

> **videos**: [`VideosFormat`](VideosFormat.md)

Defined in: [packages/contracts/ExecutionContracts.ts:199](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L199)

#### Inherited from

[`DefaultVideoOutput`](DefaultVideoOutput.md).[`videos`](DefaultVideoOutput.md#videos)

***

### videoId

> **videoId**: `string`

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:60](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L60)

Video identifier

***

### videoScreenshot

> **videoScreenshot**: `string`

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:63](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L63)

Screenshot image URL

***

### videoCreatedAt?

> `optional` **videoCreatedAt?**: `string`

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:66](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L66)

Video creation date text

***

### author

> **author**: `string`

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:69](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L69)

Author name associated with the video

***

### fullVideoSource?

> `optional` **fullVideoSource?**: `string`

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:72](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L72)

Full source URL when available

***

### videoAlbumId?

> `optional` **videoAlbumId?**: `string`

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:75](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L75)

Album identifier linked to the video

***

### videoAlbum?

> `optional` **videoAlbum?**: [`PerfectGirlsAlbumOutput`](PerfectGirlsAlbumOutput.md)

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:78](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L78)

Album metadata linked to the video

***

### starredBy

> **starredBy**: `string`[]

Defined in: [packages/providers/perfectgirls/PerfectGirlsContracts.ts:81](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/perfectgirls/PerfectGirlsContracts.ts#L81)

Starred by list
