[**downflux**](../README.md)

***

[downflux](../README.md) / FFmpegEngine

# Class: FFmpegEngine

Defined in: [packages/storage/FFmpegEngine.ts:19](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/storage/FFmpegEngine.ts#L19)

Media finalization wrapper around ffmpeg.

## Remarks

FFmpeg support lives in storage because container repair and transcoding are
output concerns. Downloaders write bytes first, then this engine remuxes or
transcodes formats such as HLS `.ts`/fMP4 into a playable final file.

## Constructors

### Constructor

> **new FFmpegEngine**(`progressManager`): `FFmpegEngine`

Defined in: [packages/storage/FFmpegEngine.ts:20](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/storage/FFmpegEngine.ts#L20)

#### Parameters

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`FFmpegEngine`

## Accessors

### ffmpeg

#### Get Signature

> **get** **ffmpeg**(): `string`

Defined in: [packages/storage/FFmpegEngine.ts:22](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/storage/FFmpegEngine.ts#L22)

##### Returns

`string`

## Methods

### finalizeMedia()

> **finalizeMedia**(`options`): `Promise`\<\{ `path`: `string`; `filename`: `string`; `extension`: `string`; `mimeType`: `string`; \}\>

Defined in: [packages/storage/FFmpegEngine.ts:32](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/storage/FFmpegEngine.ts#L32)

Finalizes a downloaded media file with ffmpeg.

#### Parameters

##### options

[`TranscodeOptions`](../interfaces/TranscodeOptions.md)

Input path and optional codec/transcode settings.

#### Returns

`Promise`\<\{ `path`: `string`; `filename`: `string`; `extension`: `string`; `mimeType`: `string`; \}\>

Final media path, filename, extension, and MIME type.
