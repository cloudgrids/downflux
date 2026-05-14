[**downflux**](../README.md)

***

[downflux](../README.md) / FileManager

# Class: FileManager

Defined in: [packages/storage/FileManager.ts:11](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/storage/FileManager.ts#L11)

## Constructors

### Constructor

> **new FileManager**(`ffmpegEngine`, `progressManager`): `FileManager`

Defined in: [packages/storage/FileManager.ts:16](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/storage/FileManager.ts#L16)

#### Parameters

##### ffmpegEngine

[`FFmpegEngine`](FFmpegEngine.md)

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`FileManager`

## Methods

### createSink()

> **createSink**(`sinkInput`): `object`

Defined in: [packages/storage/FileManager.ts:21](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/storage/FileManager.ts#L21)

#### Parameters

##### sinkInput

[`CreateSinkInput`](../interfaces/CreateSinkInput.md)

#### Returns

`object`

##### stream

> **stream**: `Writable`

##### finalize

> **finalize**: (`resolved`, `headers`, `isFmp4?`) => `Promise`\<[`CreateSinkOutput`](../interfaces/CreateSinkOutput.md)\>

###### Parameters

###### resolved

[`ResolvedFile`](../interfaces/ResolvedFile.md)

###### headers

`Record`\<`string`, `string`\>

###### isFmp4?

`boolean`

###### Returns

`Promise`\<[`CreateSinkOutput`](../interfaces/CreateSinkOutput.md)\>

***

### finalizeStream()

> **finalizeStream**(`finalPath`, `tOptions?`, `isFmp4?`, `opts?`): `Promise`\<\{ `path`: `string`; `filename`: `string`; `extension`: `string`; `mimeType`: `any`; \}\>

Defined in: [packages/storage/FileManager.ts:124](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/storage/FileManager.ts#L124)

#### Parameters

##### finalPath

`string`

##### tOptions?

[`TranscodeOptions`](../interfaces/TranscodeOptions.md)

##### isFmp4?

`boolean`

##### opts?

###### extension?

`string`

###### mimeType?

`string`

#### Returns

`Promise`\<\{ `path`: `string`; `filename`: `string`; `extension`: `string`; `mimeType`: `any`; \}\>

***

### toJSON()

> **toJSON**\<`T`, `S`\>(`result`, `directoryPath?`): `string`

Defined in: [packages/storage/FileManager.ts:145](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/storage/FileManager.ts#L145)

#### Type Parameters

##### T

`T`

##### S

`S` *extends* [`ExecutionShape`](../type-aliases/ExecutionShape.md)

#### Parameters

##### result

[`ExecutionResult`](../interfaces/ExecutionResult.md)\<`T`, `S`\>

##### directoryPath?

`string` = `...`

#### Returns

`string`

***

### getFileInfo()

> **getFileInfo**(`url`, `prefix?`): [`ResolvedFile`](../interfaces/ResolvedFile.md)

Defined in: [packages/storage/FileManager.ts:169](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/storage/FileManager.ts#L169)

Extracts filename and extension from URL.

#### Parameters

##### url

`string`

URL to extract filename and extension from

##### prefix?

`string`

Optional prefix to add to the filename

#### Returns

[`ResolvedFile`](../interfaces/ResolvedFile.md)

path undefined => fud_timestamp

***

### sanitizeFilename()

> **sanitizeFilename**(`name`): `string`

Defined in: [packages/storage/FileManager.ts:193](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/storage/FileManager.ts#L193)

#### Parameters

##### name

`string`

#### Returns

`string`

***

### detectResourceType()

> **detectResourceType**(`url`, `request`): `object`

Defined in: [packages/storage/FileManager.ts:229](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/storage/FileManager.ts#L229)

#### Parameters

##### url

`string`

##### request

[`ExecutionArgs`](../interfaces/ExecutionArgs.md)

#### Returns

`object`

##### mimeType

> **mimeType**: `string`

##### extension

> **extension**: [`AllowedExtension`](../type-aliases/AllowedExtension.md)

***

### deriveResolvedFile()

> **deriveResolvedFile**(`initial`, `finalUrl`, `headers`, `isFmp4?`, `prefix?`): [`ResolvedFile`](../interfaces/ResolvedFile.md)

Defined in: [packages/storage/FileManager.ts:256](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/storage/FileManager.ts#L256)

#### Parameters

##### initial

[`ResolvedFile`](../interfaces/ResolvedFile.md)

##### finalUrl

`string`

##### headers

`Record`\<`string`, `string`\>

##### isFmp4?

`boolean`

##### prefix?

`string`

#### Returns

[`ResolvedFile`](../interfaces/ResolvedFile.md)
