[**downflux**](../README.md)

***

[downflux](../README.md) / PerfectGirlsProvider

# Class: PerfectGirlsProvider

Defined in: [packages/providers/perfectgirls/PerfectGirlsProvider.ts:23](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/perfectgirls/PerfectGirlsProvider.ts#L23)

PerfectGirlsProvider
This provider can be used with both `perfectdamen.co` and `perfectgirls.xxx` domains.
Provides: album, video, model, tag, and channel operations.
Provides m3u8 links
Dependencies: - ffmpeg (for m3u8 to mp4 conversion)

## Extends

- [`BaseProvider`](BaseProvider.md)\<[`PerfectGirlsExecArgs`](../interfaces/PerfectGirlsExecArgs.md)\>

## Constructors

### Constructor

> **new PerfectGirlsProvider**(`url`): `PerfectGirlsProvider`

Defined in: [packages/providers/perfectgirls/PerfectGirlsProvider.ts:37](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/perfectgirls/PerfectGirlsProvider.ts#L37)

#### Parameters

##### url

`string`

#### Returns

`PerfectGirlsProvider`

#### Overrides

[`BaseProvider`](BaseProvider.md).[`constructor`](BaseProvider.md#constructor)

## Properties

### executionOptions

> `protected` **executionOptions**: [`ExecutionOptions`](../interfaces/ExecutionOptions.md) = `{}`

Defined in: [packages/base/BaseProvider.ts:38](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L38)

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`executionOptions`](BaseProvider.md#executionoptions)

***

### httpOptions

> `protected` **httpOptions**: [`HttpFetchOptions`](../interfaces/HttpFetchOptions.md) = `{}`

Defined in: [packages/base/BaseProvider.ts:39](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L39)

#### Inherited from

[`DefaultProvider`](DefaultProvider.md).[`httpOptions`](DefaultProvider.md#httpoptions)

***

### deps

> `protected` `readonly` **deps**: [`CoordinatorDependencies`](../interfaces/CoordinatorDependencies.md)

Defined in: [packages/base/BaseProvider.ts:40](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L40)

#### Inherited from

[`DefaultProvider`](DefaultProvider.md).[`deps`](DefaultProvider.md#deps)

***

### urlPattern

> `protected` `readonly` **urlPattern**: `RegExp`

Defined in: [packages/base/BaseProvider.ts:42](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L42)

#### Inherited from

[`DefaultProvider`](DefaultProvider.md).[`urlPattern`](DefaultProvider.md#urlpattern)

***

### providerMetadata

> `protected` `readonly` **providerMetadata**: [`ProviderMetadata`](../interfaces/ProviderMetadata.md)

Defined in: [packages/base/BaseProvider.ts:43](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L43)

#### Inherited from

[`DefaultProvider`](DefaultProvider.md).[`providerMetadata`](DefaultProvider.md#providermetadata)

***

### url

> `protected` `readonly` **url**: `string`

Defined in: [packages/base/BaseProvider.ts:51](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L51)

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`url`](BaseProvider.md#url)

***

### config

> `protected` **config**: [`ProviderConfig`](../interfaces/ProviderConfig.md)

Defined in: [packages/base/BaseProvider.ts:52](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L52)

#### Inherited from

[`DefaultProvider`](DefaultProvider.md).[`config`](DefaultProvider.md#config)

***

### provider

> `protected` `readonly` **provider**: [`PerfectGirls`](../enumerations/ProviderType.md#perfectgirls) = `ProviderType.PerfectGirls`

Defined in: [packages/providers/perfectgirls/PerfectGirlsProvider.ts:24](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/perfectgirls/PerfectGirlsProvider.ts#L24)

#### Overrides

[`BaseProvider`](BaseProvider.md).[`provider`](BaseProvider.md#provider)

## Accessors

### metadata

#### Get Signature

> **get** `protected` **metadata**(): [`ProviderMetadata`](../interfaces/ProviderMetadata.md)

Defined in: [packages/base/BaseProvider.ts:46](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L46)

Provider capabilities, integration status, and access restrictions.

##### Returns

[`ProviderMetadata`](../interfaces/ProviderMetadata.md)

#### Inherited from

[`DefaultProvider`](DefaultProvider.md).[`metadata`](DefaultProvider.md#metadata)

***

### ORIGIN

#### Get Signature

> **get** `protected` **ORIGIN**(): `string`

Defined in: [packages/base/BaseProvider.ts:79](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L79)

##### Returns

`string`

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`ORIGIN`](BaseProvider.md#origin)

***

### HOST\_NAME

#### Get Signature

> **get** `protected` **HOST\_NAME**(): `string`

Defined in: [packages/base/BaseProvider.ts:83](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L83)

##### Returns

`string`

#### Inherited from

[`DefaultProvider`](DefaultProvider.md).[`HOST_NAME`](DefaultProvider.md#host_name)

## Methods

### isValidHostName()

> `protected` **isValidHostName**(): `boolean`

Defined in: [packages/base/BaseProvider.ts:87](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L87)

#### Returns

`boolean`

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`isValidHostName`](BaseProvider.md#isvalidhostname)

***

### setHeaders()

> **setHeaders**(`headers`): `this`

Defined in: [packages/base/BaseProvider.ts:105](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L105)

Sets custom HTTP headers.

#### Parameters

##### headers

`Record`\<`string`, `string`\>

Request header map

#### Returns

`this`

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`setHeaders`](BaseProvider.md#setheaders)

***

### setTimeout()

> **setTimeout**(`timeoutMs`): `this`

Defined in: [packages/base/BaseProvider.ts:114](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L114)

Sets HTTP timeout.

#### Parameters

##### timeoutMs

`number`

Timeout in milliseconds

#### Returns

`this`

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`setTimeout`](BaseProvider.md#settimeout)

***

### setRetries()

> **setRetries**(`retries`): `this`

Defined in: [packages/base/BaseProvider.ts:123](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L123)

Sets fetch retry count.

#### Parameters

##### retries

`number`

Retry attempt count

#### Returns

`this`

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`setRetries`](BaseProvider.md#setretries)

***

### setTransformOutput()

> **setTransformOutput**(`transform?`): `this`

Defined in: [packages/base/BaseProvider.ts:132](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L132)

Transform output to provider-specific result type.

#### Parameters

##### transform?

`boolean` = `true`

Default is true, which applies the default transformation. Set to false to return raw extracted data.

#### Returns

`this`

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`setTransformOutput`](BaseProvider.md#settransformoutput)

***

### setHttpOptions()

> **setHttpOptions**(`opts`): `this`

Defined in: [packages/base/BaseProvider.ts:141](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L141)

Sets HTTP fetch options.

#### Parameters

##### opts

[`HttpFetchOptions`](../interfaces/HttpFetchOptions.md)

HTTP options to merge

#### Returns

`this`

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`setHttpOptions`](BaseProvider.md#sethttpoptions)

***

### setNoDownload()

> **setNoDownload**(`noDownload?`): `this`

Defined in: [packages/base/BaseProvider.ts:151](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L151)

Sets no download flag.

#### Parameters

##### noDownload?

`boolean` = `false`

No download flag

#### Returns

`this`

#### Default Value

```ts
false - set to true to skip the download phase and only perform extraction (useful for debugging or when you only need metadata)
```

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`setNoDownload`](BaseProvider.md#setnodownload)

***

### setTranscodeOptions()

> **setTranscodeOptions**(`opts`): `this`

Defined in: [packages/base/BaseProvider.ts:164](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L164)

Sets transcode options.

#### Parameters

##### opts

[`TranscodeOptions`](../interfaces/TranscodeOptions.md)

Sometimes due to nature of the OS, the video might not play after download.

In such cases, you can set transcodeOptions to re-encode the video using ffmpeg which should resolve most compatibility issues.
Make sure your OS can handle it

#### Returns

`this`

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`setTranscodeOptions`](BaseProvider.md#settranscodeoptions)

***

### setPreferredFormat()

> **setPreferredFormat**(`format`): `this`

Defined in: [packages/base/BaseProvider.ts:173](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L173)

Sets preferred video format.

#### Parameters

##### format

[`VideoFormat`](../enumerations/VideoFormat.md)

Video format (hls or mp4)

#### Returns

`this`

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`setPreferredFormat`](BaseProvider.md#setpreferredformat)

***

### setPreferredCodec()

> **setPreferredCodec**(`codec`): `this`

Defined in: [packages/base/BaseProvider.ts:187](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L187)

Sets preferred video codec.

#### Parameters

##### codec

[`VideoCodec`](../enumerations/VideoCodec.md)

Video codec (h264 or av1)

This feature is still experimental not yet implemented for all providers.

It allows you to specify a preferred video codec which can help with compatibility or performance in some cases.
If the provider supports it, it will try to download the video in the specified codec. If not available, it will fall back to the default behavior.

#### Returns

`this`

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`setPreferredCodec`](BaseProvider.md#setpreferredcodec)

***

### setJobOptions()

> **setJobOptions**(`opts`): `this`

Defined in: [packages/base/BaseProvider.ts:196](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L196)

Sets ExecutionCoordinator options.

#### Parameters

##### opts

[`ExecutionOptions`](../interfaces/ExecutionOptions.md)

Job options to merge

#### Returns

`this`

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`setJobOptions`](BaseProvider.md#setjoboptions)

***

### setAgentOptions()

> **setAgentOptions**(`opts`): `this`

Defined in: [packages/base/BaseProvider.ts:205](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L205)

Sets HTTP agent options.

#### Parameters

##### opts

[`HttpAgentOptions`](../interfaces/HttpAgentOptions.md)

HTTP agent options to merge

#### Returns

`this`

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`setAgentOptions`](BaseProvider.md#setagentoptions)

***

### setMaxDownloads()

> **setMaxDownloads**(`maxDownloads`): `this`

Defined in: [packages/base/BaseProvider.ts:214](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L214)

Sets maximum downloads.

#### Parameters

##### maxDownloads

`number`

Download limit

#### Returns

`this`

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`setMaxDownloads`](BaseProvider.md#setmaxdownloads)

***

### setAllowedExtensions()

> **setAllowedExtensions**(...`extensions`): `this`

Defined in: [packages/base/BaseProvider.ts:223](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L223)

Sets allowed file extensions.

#### Parameters

##### extensions

...[`AllowedExtension`](../type-aliases/AllowedExtension.md)[]

File extensions such as `jpg` or `png`

#### Returns

`this`

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`setAllowedExtensions`](BaseProvider.md#setallowedextensions)

***

### onProgress()

> **onProgress**(`handler`): `this`

Defined in: [packages/base/BaseProvider.ts:232](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L232)

Sets progress handler.

#### Parameters

##### handler

(`event`) => `void`

Progress event callback

#### Returns

`this`

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`onProgress`](BaseProvider.md#onprogress)

***

### setProgressLogging()

> **setProgressLogging**(`enabled?`): `this`

Defined in: [packages/base/BaseProvider.ts:242](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L242)

Enables console progress logging.

#### Parameters

##### enabled?

`boolean` = `true`

Console logging flag

#### Returns

`this`

#### Default Value

```ts
true
```

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`setProgressLogging`](BaseProvider.md#setprogresslogging)

***

### setOutput()

> **setOutput**(`type`, `config?`): `this`

Defined in: [packages/base/BaseProvider.ts:253](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L253)

Sets output type.

#### Parameters

##### type

[`OutputType`](../enumerations/OutputType.md)

Job output mode

##### config?

[`DirectoryOutputOptions`](../interfaces/DirectoryOutputOptions.md) = `{}`

Directory output configuration

#### Returns

`this`

#### Default Value

```ts
OutputType.JSON
```

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`setOutput`](BaseProvider.md#setoutput)

***

### setExecutionType()

> **setExecutionType**(`type`): `this`

Defined in: [packages/base/BaseProvider.ts:274](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L274)

Sets execution strategy.

#### Parameters

##### type

[`ExecutionType`](../enumerations/ExecutionType.md)

Execution mode

#### Returns

`this`

#### Default Value

ExecutionType.SEQUENTIAL

This feature is still `experimental` and not yet implemented for all providers.
It allows you to specify the execution strategy for the extraction and download process.

- `SEQUENTIAL`: Extracts and downloads items one by one.
 This is the most compatible mode and should work with all providers, but can be slower for large batches.

- `PARALLEL`: Extracts all items first, then downloads them in parallel.
 This can be faster for large batches, but may cause issues with providers that have strict rate limits or anti-bot measures.
Use with caution and test thoroughly if you choose to use `PARALLEL` execution.

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`setExecutionType`](BaseProvider.md#setexecutiontype)

***

### buildRequest()

> `protected` **buildRequest**(`overrides?`): [`PerfectGirlsExecArgs`](../interfaces/PerfectGirlsExecArgs.md)

Defined in: [packages/base/BaseProvider.ts:285](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L285)

Builds the execution request passed to the coordinator layer.

#### Parameters

##### overrides?

`Partial`\<[`PerfectGirlsExecArgs`](../interfaces/PerfectGirlsExecArgs.md)\>

Provider method options that should override defaults.

#### Returns

[`PerfectGirlsExecArgs`](../interfaces/PerfectGirlsExecArgs.md)

A typed request containing provider metadata and execution options.

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`buildRequest`](BaseProvider.md#buildrequest)

***

### execute()

> `protected` **execute**\<`TResult`\>(`overrides`): `Promise`\<`TResult`\>

Defined in: [packages/base/BaseProvider.ts:305](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L305)

Runs extraction and optional downloads through the shared coordinator.

#### Type Parameters

##### TResult

`TResult`

#### Parameters

##### overrides

\{ `entryUrl?`: `string`; \} \| [`PerfectGirlsExecArgs`](../interfaces/PerfectGirlsExecArgs.md) & `object`

Provider method request data, including execution shape.

#### Returns

`Promise`\<`TResult`\>

Extracted output in the shape requested by the provider method.

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`execute`](BaseProvider.md#execute)

***

### makeTargets()

> `protected` **makeTargets**(`sourceUrl`, `range`, `provider`, `method`, `addTrailingSlash?`): `object`

Defined in: [packages/base/BaseProvider.ts:334](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseProvider.ts#L334)

Builds paginated target URLs for list-like provider methods.

#### Parameters

##### sourceUrl

`string`

Base URL before the page number.

##### range

[`Range`](../type-aliases/Range.md)

Page or start/end range to expand.

##### provider

[`ProviderType`](../enumerations/ProviderType.md)

Provider used for range validation errors.

##### method

`string`

Provider method used for range validation errors.

##### addTrailingSlash?

`boolean` = `true`

Whether generated target URLs should end with `/`.

#### Returns

`object`

Provider, method, and generated target URLs.

##### targets

> **targets**: `string`[]

##### provider

> **provider**: [`ProviderType`](../enumerations/ProviderType.md)

##### method

> **method**: `string`

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`makeTargets`](BaseProvider.md#maketargets)

***

### getAlbums()

> **getAlbums**(`param?`): `Promise`\<[`PerfectGirlsAlbumOutput`](../interfaces/PerfectGirlsAlbumOutput.md)[]\>

Defined in: [packages/providers/perfectgirls/PerfectGirlsProvider.ts:132](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/perfectgirls/PerfectGirlsProvider.ts#L132)

Gets albums by page range.

#### Parameters

##### param?

[`PageRange`](../type-aliases/PageRange.md) = `...`

Page range

#### Returns

`Promise`\<[`PerfectGirlsAlbumOutput`](../interfaces/PerfectGirlsAlbumOutput.md)[]\>

`PerfectGirlsAlbumOutput[]` list

#### Throws

InvalidRangeException When the page range is invalid
true

***

### getAlbum()

> **getAlbum**(): `Promise`\<[`PerfectGirlsAlbumOutput`](../interfaces/PerfectGirlsAlbumOutput.md)\>

Defined in: [packages/providers/perfectgirls/PerfectGirlsProvider.ts:145](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/perfectgirls/PerfectGirlsProvider.ts#L145)

Gets a single album.

#### Returns

`Promise`\<[`PerfectGirlsAlbumOutput`](../interfaces/PerfectGirlsAlbumOutput.md)\>

`PerfectGirlsAlbumOutput`
true

***

### getModels()

> **getModels**(`range?`, `args?`): `Promise`\<[`PerfectGirlsModelOutput`](../interfaces/PerfectGirlsModelOutput.md)[]\>

Defined in: [packages/providers/perfectgirls/PerfectGirlsProvider.ts:164](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/perfectgirls/PerfectGirlsProvider.ts#L164)

Gets models by page range.

#### Parameters

##### range?

[`PageRange`](../type-aliases/PageRange.md) = `...`

Page range

##### args?

[`PerfectGirlsIdType`](../type-aliases/PerfectGirlsIdType.md)

Model identifier output format

#### Returns

`Promise`\<[`PerfectGirlsModelOutput`](../interfaces/PerfectGirlsModelOutput.md)[]\>

`PerfectGirlsModelOutput[]` list

#### Throws

InvalidRangeException When the range exceeds the model page limit

#### Throws

GenericException When the model identifier output format is invalid
true

***

### getModelVideoIds()

> **getModelVideoIds**(`range?`): `Promise`\<[`PerfectGirlsModelVideoIdsOutput`](../interfaces/PerfectGirlsModelVideoIdsOutput.md)\>

Defined in: [packages/providers/perfectgirls/PerfectGirlsProvider.ts:185](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/perfectgirls/PerfectGirlsProvider.ts#L185)

Gets video cards for a model.

#### Parameters

##### range?

[`PageRange`](../type-aliases/PageRange.md) = `...`

Page range

#### Returns

`Promise`\<[`PerfectGirlsModelVideoIdsOutput`](../interfaces/PerfectGirlsModelVideoIdsOutput.md)\>

`PerfectGirlsModelVideoIdsOutput` containing video identifiers and metadata

#### Throws

InvalidRangeException When the range exceeds the model video page limit

#### Throws

GenericException When the username is not provided
true

***

### getTags()

> **getTags**(`args`): `Promise`\<[`PerfectGirlsTagOutput`](../interfaces/PerfectGirlsTagOutput.md)[]\>

Defined in: [packages/providers/perfectgirls/PerfectGirlsProvider.ts:201](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/perfectgirls/PerfectGirlsProvider.ts#L201)

Gets tags by filter options.

#### Parameters

##### args

[`TagFilterOptions`](../interfaces/TagFilterOptions.md)

Tag filter options

#### Returns

`Promise`\<[`PerfectGirlsTagOutput`](../interfaces/PerfectGirlsTagOutput.md)[]\>

`PerfectGirlsTagOutput[]` list in tag format if path is not specified,
         otherwise returns tag URLs or tag names based on the specified format

#### Throws

GenericException When the tag filter options are invalid
false

***

### getChannels()

> **getChannels**(`range?`, `args?`): `Promise`\<[`PerfectGirlsChannelOutput`](../interfaces/PerfectGirlsChannelOutput.md)[]\>

Defined in: [packages/providers/perfectgirls/PerfectGirlsProvider.ts:222](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/perfectgirls/PerfectGirlsProvider.ts#L222)

Gets channels by page range.

#### Parameters

##### range?

[`PageRange`](../type-aliases/PageRange.md) = `...`

Page range

##### args?

[`PerfectGirlsIdType`](../type-aliases/PerfectGirlsIdType.md)

Channel identifier output format

#### Returns

`Promise`\<[`PerfectGirlsChannelOutput`](../interfaces/PerfectGirlsChannelOutput.md)[]\>

`PerfectGirlsChannelOutput[]` list
remarks The channel page limit is 21. Exceeding this will throw an InvalidRangeException.

#### Throws

InvalidRangeException When the range exceeds the channel page limit

#### Throws

GenericException When the channel identifier output format is invalid
false

***

### getVideos()

> **getVideos**(`range?`, `quality?`): `Promise`\<[`PerfectGirlsVideoOutput`](../interfaces/PerfectGirlsVideoOutput.md)[]\>

Defined in: [packages/providers/perfectgirls/PerfectGirlsProvider.ts:242](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/perfectgirls/PerfectGirlsProvider.ts#L242)

Gets videos by index range.

#### Parameters

##### range?

[`IndexRange`](../type-aliases/IndexRange.md) = `...`

Index range

##### quality?

[`VideoQuality`](../enumerations/VideoQuality.md)

Allowed video quality

#### Returns

`Promise`\<[`PerfectGirlsVideoOutput`](../interfaces/PerfectGirlsVideoOutput.md)[]\>

`PerfectGirlsVideoOutput[]` list

#### Throws

InvalidRangeException When the index range is invalid
true

***

### getVideo()

> **getVideo**(`quality?`): `Promise`\<[`PerfectGirlsVideoOutput`](../interfaces/PerfectGirlsVideoOutput.md)\>

Defined in: [packages/providers/perfectgirls/PerfectGirlsProvider.ts:260](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/perfectgirls/PerfectGirlsProvider.ts#L260)

Gets a single video.

#### Parameters

##### quality?

[`VideoQuality`](../enumerations/VideoQuality.md)

Allowed video quality

#### Returns

`Promise`\<[`PerfectGirlsVideoOutput`](../interfaces/PerfectGirlsVideoOutput.md)\>

`PerfectGirlsVideoOutput`
remarks The video identifier can be found in the video URL (e.g., https://ok.porn/video/12345/ has the identifier "12345")

#### Throws

GenericException When the video ID is not provided
true
