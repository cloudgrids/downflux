[**downflux**](../README.md)

***

[downflux](../README.md) / WallHavenWallPaperOutput

# Interface: WallHavenWallPaperOutput

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:69](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/wallhaven/WallHavenContracts.ts#L69)

Interface representing the output structure for WallHaven wallpaper operations.
Contains wallpaper metadata, dimensions, uploader, and thumbnails.

## Properties

### id

> **id**: `string`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:71](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/wallhaven/WallHavenContracts.ts#L71)

Wallpaper identifier

***

### title

> **title**: `string`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:74](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/wallhaven/WallHavenContracts.ts#L74)

Wallpaper title

***

### description

> **description**: `string`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:77](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/wallhaven/WallHavenContracts.ts#L77)

Wallpaper description

***

### tags

> **tags**: `string`[]

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:80](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/wallhaven/WallHavenContracts.ts#L80)

Wallpaper tags

***

### views

> **views**: `number`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:83](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/wallhaven/WallHavenContracts.ts#L83)

View count

***

### favorites

> **favorites**: `number`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:86](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/wallhaven/WallHavenContracts.ts#L86)

Favorite count

***

### purity

> **purity**: `string`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:89](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/wallhaven/WallHavenContracts.ts#L89)

Purity label

***

### category

> **category**: `string`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:92](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/wallhaven/WallHavenContracts.ts#L92)

Category label

***

### dimensionX

> **dimensionX**: `number`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:95](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/wallhaven/WallHavenContracts.ts#L95)

Wallpaper width in pixels

***

### dimensionY

> **dimensionY**: `number`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:98](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/wallhaven/WallHavenContracts.ts#L98)

Wallpaper height in pixels

***

### resolution

> **resolution**: `string`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:101](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/wallhaven/WallHavenContracts.ts#L101)

Resolution text

***

### ratio

> **ratio**: `string`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:104](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/wallhaven/WallHavenContracts.ts#L104)

Aspect ratio text

***

### size

> **size**: `number`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:107](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/wallhaven/WallHavenContracts.ts#L107)

File size in bytes

***

### uploader

> **uploader**: `string`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:110](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/wallhaven/WallHavenContracts.ts#L110)

Uploader username

***

### createdAt

> **createdAt**: `string`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:113](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/wallhaven/WallHavenContracts.ts#L113)

Creation date text

***

### updatedAt

> **updatedAt**: `string`

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:116](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/wallhaven/WallHavenContracts.ts#L116)

Update date text

***

### thumbnails

> **thumbnails**: [`WallHavenThumbnail`](WallHavenThumbnail.md)[]

Defined in: [packages/providers/wallhaven/WallHavenContracts.ts:119](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/wallhaven/WallHavenContracts.ts#L119)

Wallpaper thumbnails
