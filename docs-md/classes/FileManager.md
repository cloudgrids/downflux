[**downflux**](../README.md)

***

[downflux](../README.md) / FileManager

# Class: FileManager

Defined in: [packages/storage/FileManager.ts:20](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/storage/FileManager.ts#L20)

Storage service for JSON results, buffers, and files on disk.

## Remarks

Storage is isolated because output handling needs path safety, filename
normalization, resource type inference, stream sinks, JSON serialization, and
post-processing for media containers. Keeping this here prevents providers
and coordinators from duplicating filesystem rules.

## Constructors

### Constructor

> **new FileManager**(`ffmpegEngine`, `progressManager`): `FileManager`

Defined in: [packages/storage/FileManager.ts:25](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/storage/FileManager.ts#L25)

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

Defined in: [packages/storage/FileManager.ts:36](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/storage/FileManager.ts#L36)

Creates the output sink for a download.

#### Parameters

##### sinkInput

[`CreateSinkInput`](../interfaces/CreateSinkInput.md)

Output mode, provider, identifier, and transcode options.

#### Returns

`object`

Writable stream and finalize callback for the selected output mode.

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

Defined in: [packages/storage/FileManager.ts:148](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/storage/FileManager.ts#L148)

Finalizes a file after streaming completes.

#### Parameters

##### finalPath

`string`

Path of the streamed file.

##### tOptions?

[`TranscodeOptions`](../interfaces/TranscodeOptions.md)

Optional ffmpeg transcode options.

##### isFmp4?

`boolean`

Whether the stream came from an fMP4 HLS playlist.

##### opts?

Resolved extension and MIME type hints.

###### extension?

`string`

###### mimeType?

`string`

#### Returns

`Promise`\<\{ `path`: `string`; `filename`: `string`; `extension`: `string`; `mimeType`: `any`; \}\>

Final path, filename, extension, and MIME type.

***

### toJSON()

> **toJSON**\<`T`, `S`\>(`result`, `directoryPath?`): `string`

Defined in: [packages/storage/FileManager.ts:176](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/storage/FileManager.ts#L176)

Writes an execution result as JSON.

#### Type Parameters

##### T

`T`

##### S

`S` *extends* [`ExecutionShape`](../type-aliases/ExecutionShape.md)

#### Parameters

##### result

[`ExecutionResult`](../interfaces/ExecutionResult.md)\<`T`, `S`\>

Execution result to serialize.

##### directoryPath?

`string` = `...`

Destination directory.

#### Returns

`string`

Path to the written JSON file.

***

### getFileInfo()

> **getFileInfo**(`url`, `prefix?`): [`ResolvedFile`](../interfaces/ResolvedFile.md)

Defined in: [packages/storage/FileManager.ts:200](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/storage/FileManager.ts#L200)

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

Defined in: [packages/storage/FileManager.ts:226](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/storage/FileManager.ts#L226)

Sanitize filename by replacing invalid characters with underscores mostly for
Windows OS which has a lot of reserved characters for filenames such as < > : " / \ | ? *

#### Parameters

##### name

`string`

#### Returns

`string`

***

### detectResourceType()

> **detectResourceType**(`url`, `request`): `object`

Defined in: [packages/storage/FileManager.ts:269](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/storage/FileManager.ts#L269)

Infers MIME type and extension for a media URL.

#### Parameters

##### url

`string`

Media URL to inspect.

##### request

[`ExecutionArgs`](../interfaces/ExecutionArgs.md)

Provider request used for fallback decisions.

#### Returns

`object`

Detected or provider-default resource type.

##### mimeType

> **mimeType**: `string`

##### extension

> **extension**: [`AllowedExtension`](../type-aliases/AllowedExtension.md)

***

### deriveResolvedFile()

> **deriveResolvedFile**(`initial`, `finalUrl`, `headers`, `isFmp4?`, `prefix?`): [`ResolvedFile`](../interfaces/ResolvedFile.md)

Defined in: [packages/storage/FileManager.ts:307](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/storage/FileManager.ts#L307)

Reconciles the initial file guess with the final response URL and headers.

#### Parameters

##### initial

[`ResolvedFile`](../interfaces/ResolvedFile.md)

Filename inferred before requesting the stream.

##### finalUrl

`string`

Final URL returned by the stream request.

##### headers

`Record`\<`string`, `string`\>

Response headers.

##### isFmp4?

`boolean`

Whether the media is fMP4 HLS.

##### prefix?

`string`

Optional filename prefix.

#### Returns

[`ResolvedFile`](../interfaces/ResolvedFile.md)

Resolved filename and extension for the actual media.
