[**downflux**](../README.md)

***

[downflux](../README.md) / TranscodeOptions

# Interface: TranscodeOptions

Defined in: [packages/contracts/StorageContracts.ts:30](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/contracts/StorageContracts.ts#L30)

## Properties

### inputPath?

> `optional` **inputPath?**: `string`

Defined in: [packages/contracts/StorageContracts.ts:35](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/contracts/StorageContracts.ts#L35)

Internal path of the downloaded media file that should be finalized.
DownFlux sets this automatically when a streamed file needs ffmpeg.

***

### ffmpegPath?

> `optional` **ffmpegPath?**: `string`

Defined in: [packages/contracts/StorageContracts.ts:45](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/contracts/StorageContracts.ts#L45)

Explicit ffmpeg executable path.

Use this when the consuming project cannot use the bundled `ffmpeg-static`
binary, for example when pnpm build scripts are disabled.

#### Example

```ts
'/opt/homebrew/bin/ffmpeg'
```

***

### deleteInput?

> `optional` **deleteInput?**: `boolean`

Defined in: [packages/contracts/StorageContracts.ts:51](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/contracts/StorageContracts.ts#L51)

Deletes the intermediate input file after successful finalization.

#### Default Value

```ts
true
```

***

### ffmpegArgs?

> `optional` **ffmpegArgs?**: `string`[]

Defined in: [packages/contracts/StorageContracts.ts:57](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/contracts/StorageContracts.ts#L57)

Complete custom ffmpeg arguments.
When provided, these replace DownFlux's default remux/transcode arguments.

***

### outputExtension?

> `optional` **outputExtension?**: `string`

Defined in: [packages/contracts/StorageContracts.ts:63](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/contracts/StorageContracts.ts#L63)

Final media container extension.

#### Default Value

```ts
'mp4'
```

***

### preset?

> `optional` **preset?**: `"medium"` \| `"ultrafast"` \| `"superfast"` \| `"veryfast"` \| `"faster"` \| `"fast"` \| `"slow"`

Defined in: [packages/contracts/StorageContracts.ts:68](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/contracts/StorageContracts.ts#L68)

ffmpeg encoder preset used when transcoding with an encoder such as libx264.

***

### crf?

> `optional` **crf?**: `number`

Defined in: [packages/contracts/StorageContracts.ts:73](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/contracts/StorageContracts.ts#L73)

Constant Rate Factor used when transcoding with an encoder such as libx264.

***

### videoCodec?

> `optional` **videoCodec?**: `string`

Defined in: [packages/contracts/StorageContracts.ts:79](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/contracts/StorageContracts.ts#L79)

ffmpeg video codec.

#### Default Value

```ts
'copy'
```

***

### audioCodec?

> `optional` **audioCodec?**: `string`

Defined in: [packages/contracts/StorageContracts.ts:85](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/contracts/StorageContracts.ts#L85)

ffmpeg audio codec.

#### Default Value

```ts
'copy'
```
