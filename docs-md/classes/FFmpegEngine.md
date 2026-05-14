[**downflux**](../README.md)

***

[downflux](../README.md) / FFmpegEngine

# Class: FFmpegEngine

Defined in: [packages/storage/FFmpegEngine.ts:11](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/storage/FFmpegEngine.ts#L11)

## Constructors

### Constructor

> **new FFmpegEngine**(`progressManager`): `FFmpegEngine`

Defined in: [packages/storage/FFmpegEngine.ts:12](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/storage/FFmpegEngine.ts#L12)

#### Parameters

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`FFmpegEngine`

## Accessors

### ffmpeg

#### Get Signature

> **get** **ffmpeg**(): `string`

Defined in: [packages/storage/FFmpegEngine.ts:14](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/storage/FFmpegEngine.ts#L14)

##### Returns

`string`

## Methods

### finalizeMedia()

> **finalizeMedia**(`options`): `Promise`\<\{ `path`: `string`; `filename`: `string`; `extension`: `string`; `mimeType`: `string`; \}\>

Defined in: [packages/storage/FFmpegEngine.ts:18](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/storage/FFmpegEngine.ts#L18)

#### Parameters

##### options

[`TranscodeOptions`](../interfaces/TranscodeOptions.md)

#### Returns

`Promise`\<\{ `path`: `string`; `filename`: `string`; `extension`: `string`; `mimeType`: `string`; \}\>
