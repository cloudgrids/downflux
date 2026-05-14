[**downflux**](../README.md)

***

[downflux](../README.md) / OkPornProvider

# Class: OkPornProvider

Defined in: [packages/providers/okporn/OkPornProvider.ts:24](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornProvider.ts#L24)

OkPorn provider
remarks Model pages are limited to 555 pages. Channel pages are limited to 21 pages.
This provider can be used with both `ok.porn` and `ok.xxx` domains.
Provides: album, video, model, tag, and channel operations.
Provides m3u8 links
Dependencies: - ffmpeg (for m3u8 to mp4 conversion)

## Extends

- [`BaseProvider`](BaseProvider.md)\<[`OkPornExecArgs`](../interfaces/OkPornExecArgs.md)\>

## Constructors

### Constructor

> **new OkPornProvider**(`url`): `OkPornProvider`

Defined in: [packages/providers/okporn/OkPornProvider.ts:38](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornProvider.ts#L38)

#### Parameters

##### url

`string`

#### Returns

`OkPornProvider`

#### Overrides

[`BaseProvider`](BaseProvider.md).[`constructor`](BaseProvider.md#constructor)

## Properties

### executionOptions

> `protected` **executionOptions**: [`ExecutionOptions`](../interfaces/ExecutionOptions.md) = `{}`

Defined in: [packages/base/BaseProvider.ts:29](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L29)

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`executionOptions`](BaseProvider.md#executionoptions)

***

### httpOptions

> `protected` **httpOptions**: [`HttpFetchOptions`](../interfaces/HttpFetchOptions.md) = `{}`

Defined in: [packages/base/BaseProvider.ts:30](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L30)

#### Inherited from

[`CoomerProvider`](CoomerProvider.md).[`httpOptions`](CoomerProvider.md#httpoptions)

***

### deps

> `protected` `readonly` **deps**: [`CoordinatorDependencies`](../interfaces/CoordinatorDependencies.md)

Defined in: [packages/base/BaseProvider.ts:31](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L31)

#### Inherited from

[`CoomerProvider`](CoomerProvider.md).[`deps`](CoomerProvider.md#deps)

***

### urlPattern

> `protected` `readonly` **urlPattern**: `RegExp`

Defined in: [packages/base/BaseProvider.ts:33](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L33)

#### Inherited from

[`CoomerProvider`](CoomerProvider.md).[`urlPattern`](CoomerProvider.md#urlpattern)

***

### url

> `readonly` **url**: `string`

Defined in: [packages/base/BaseProvider.ts:36](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L36)

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`url`](BaseProvider.md#url)

***

### provider

> `protected` `readonly` **provider**: [`OkPorn`](../enumerations/ProviderType.md#okporn) = `ProviderType.OkPorn`

Defined in: [packages/providers/okporn/OkPornProvider.ts:25](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornProvider.ts#L25)

#### Overrides

[`BaseProvider`](BaseProvider.md).[`provider`](BaseProvider.md#provider)

## Accessors

### ORIGIN

#### Get Signature

> **get** `protected` **ORIGIN**(): `string`

Defined in: [packages/base/BaseProvider.ts:52](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L52)

##### Returns

`string`

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`ORIGIN`](BaseProvider.md#origin)

***

### HOST\_NAME

#### Get Signature

> **get** `protected` **HOST\_NAME**(): `string`

Defined in: [packages/base/BaseProvider.ts:56](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L56)

##### Returns

`string`

#### Inherited from

[`DefaultProvider`](DefaultProvider.md).[`HOST_NAME`](DefaultProvider.md#host_name)

***

### baseUrl

#### Get Signature

> **get** **baseUrl**(): `string`

Defined in: [packages/providers/okporn/OkPornProvider.ts:45](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornProvider.ts#L45)

##### Returns

`string`

***

### albumsUrl

#### Get Signature

> **get** **albumsUrl**(): `string`

Defined in: [packages/providers/okporn/OkPornProvider.ts:49](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornProvider.ts#L49)

##### Returns

`string`

***

### albumUrl

#### Get Signature

> **get** **albumUrl**(): `string`

Defined in: [packages/providers/okporn/OkPornProvider.ts:55](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornProvider.ts#L55)

##### Returns

`string`

***

### videoUrl

#### Get Signature

> **get** **videoUrl**(): `string`

Defined in: [packages/providers/okporn/OkPornProvider.ts:67](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornProvider.ts#L67)

##### Returns

`string`

***

### videosUrl

#### Get Signature

> **get** **videosUrl**(): `string`

Defined in: [packages/providers/okporn/OkPornProvider.ts:79](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornProvider.ts#L79)

##### Returns

`string`

***

### modelUrl

#### Get Signature

> **get** **modelUrl**(): `string`

Defined in: [packages/providers/okporn/OkPornProvider.ts:85](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornProvider.ts#L85)

##### Returns

`string`

***

### modelsUrl

#### Get Signature

> **get** **modelsUrl**(): `string`

Defined in: [packages/providers/okporn/OkPornProvider.ts:95](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornProvider.ts#L95)

##### Returns

`string`

***

### tagsUrl

#### Get Signature

> **get** **tagsUrl**(): `string`

Defined in: [packages/providers/okporn/OkPornProvider.ts:101](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornProvider.ts#L101)

##### Returns

`string`

***

### channelsUrl

#### Get Signature

> **get** **channelsUrl**(): `string`

Defined in: [packages/providers/okporn/OkPornProvider.ts:107](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornProvider.ts#L107)

##### Returns

`string`

## Methods

### setHeaders()

> **setHeaders**(`headers`): `this`

Defined in: [packages/base/BaseProvider.ts:76](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L76)

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

Defined in: [packages/base/BaseProvider.ts:85](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L85)

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

Defined in: [packages/base/BaseProvider.ts:94](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L94)

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

Defined in: [packages/base/BaseProvider.ts:103](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L103)

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

Defined in: [packages/base/BaseProvider.ts:112](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L112)

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

Defined in: [packages/base/BaseProvider.ts:122](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L122)

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

Defined in: [packages/base/BaseProvider.ts:134](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L134)

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

### setJobOptions()

> **setJobOptions**(`opts`): `this`

Defined in: [packages/base/BaseProvider.ts:143](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L143)

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

### setMaxDownloads()

> **setMaxDownloads**(`maxDownloads`): `this`

Defined in: [packages/base/BaseProvider.ts:152](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L152)

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

Defined in: [packages/base/BaseProvider.ts:161](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L161)

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

Defined in: [packages/base/BaseProvider.ts:170](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L170)

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

Defined in: [packages/base/BaseProvider.ts:180](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L180)

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

Defined in: [packages/base/BaseProvider.ts:191](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L191)

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

Defined in: [packages/base/BaseProvider.ts:202](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L202)

Sets execution strategy.

#### Parameters

##### type

[`ExecutionType`](../enumerations/ExecutionType.md)

Execution mode

#### Returns

`this`

#### Default Value

```ts
ExecutionType.SEQUENTIAL
```

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`setExecutionType`](BaseProvider.md#setexecutiontype)

***

### buildRequest()

> `protected` **buildRequest**(`overrides?`): [`OkPornExecArgs`](../interfaces/OkPornExecArgs.md)

Defined in: [packages/base/BaseProvider.ts:207](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L207)

#### Parameters

##### overrides?

`Partial`\<[`OkPornExecArgs`](../interfaces/OkPornExecArgs.md)\>

#### Returns

[`OkPornExecArgs`](../interfaces/OkPornExecArgs.md)

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`buildRequest`](BaseProvider.md#buildrequest)

***

### execute()

> `protected` **execute**\<`TResult`\>(`overrides?`): `Promise`\<`TResult`\>

Defined in: [packages/base/BaseProvider.ts:220](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L220)

#### Type Parameters

##### TResult

`TResult`

#### Parameters

##### overrides?

`Partial`\<[`OkPornExecArgs`](../interfaces/OkPornExecArgs.md) & `object`\>

#### Returns

`Promise`\<`TResult`\>

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`execute`](BaseProvider.md#execute)

***

### makeTargets()

> `protected` **makeTargets**(`sourceUrl`, `range`, `provider`, `method`, `addTrailingSlash?`): `object`

Defined in: [packages/base/BaseProvider.ts:237](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L237)

#### Parameters

##### sourceUrl

`string`

##### range

[`Range`](../type-aliases/Range.md)

##### provider

[`ProviderType`](../enumerations/ProviderType.md)

##### method

`string`

##### addTrailingSlash?

`boolean` = `true`

#### Returns

`object`

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

> **getAlbums**(`param?`): `Promise`\<[`OkPornAlbumOutput`](../interfaces/OkPornAlbumOutput.md)[]\>

Defined in: [packages/providers/okporn/OkPornProvider.ts:120](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornProvider.ts#L120)

Gets albums by page range.

#### Parameters

##### param?

[`PageRange`](../type-aliases/PageRange.md) = `...`

Page range

#### Returns

`Promise`\<[`OkPornAlbumOutput`](../interfaces/OkPornAlbumOutput.md)[]\>

`OkPornAlbumOutput[]` list

#### Throws

InvalidRangeException When the page range is invalid
true

***

### getAlbum()

> **getAlbum**(): `Promise`\<[`OkPornAlbumOutput`](../interfaces/OkPornAlbumOutput.md)\>

Defined in: [packages/providers/okporn/OkPornProvider.ts:133](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornProvider.ts#L133)

Gets a single album.

#### Returns

`Promise`\<[`OkPornAlbumOutput`](../interfaces/OkPornAlbumOutput.md)\>

`OkPornAlbumOutput`
true

***

### getModels()

> **getModels**(`range?`, `args?`): `Promise`\<[`OkPornModelOutput`](../interfaces/OkPornModelOutput.md)[]\>

Defined in: [packages/providers/okporn/OkPornProvider.ts:152](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornProvider.ts#L152)

Gets models by page range.

#### Parameters

##### range?

[`PageRange`](../type-aliases/PageRange.md) = `...`

Page range

##### args?

[`OkPornIdType`](../type-aliases/OkPornIdType.md)

Model identifier output format

#### Returns

`Promise`\<[`OkPornModelOutput`](../interfaces/OkPornModelOutput.md)[]\>

`OkPornModelOutput[]` list

#### Throws

InvalidRangeException When the range exceeds the model page limit

#### Throws

GenericException When the model identifier output format is invalid
true

***

### getModelVideoIds()

> **getModelVideoIds**(`range?`): `Promise`\<[`OkPornModelVideoIdsOutput`](../interfaces/OkPornModelVideoIdsOutput.md)\>

Defined in: [packages/providers/okporn/OkPornProvider.ts:173](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornProvider.ts#L173)

Gets video cards for a model.

#### Parameters

##### range?

[`PageRange`](../type-aliases/PageRange.md) = `...`

Page range

#### Returns

`Promise`\<[`OkPornModelVideoIdsOutput`](../interfaces/OkPornModelVideoIdsOutput.md)\>

`OkPornModelVideoIdsOutput` containing video identifiers and metadata

#### Throws

InvalidRangeException When the range exceeds the model video page limit

#### Throws

GenericException When the username is not provided
true

***

### getTags()

> **getTags**(`args`): `Promise`\<[`OkPornTagOutput`](../interfaces/OkPornTagOutput.md)[]\>

Defined in: [packages/providers/okporn/OkPornProvider.ts:189](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornProvider.ts#L189)

Gets tags by filter options.

#### Parameters

##### args

[`TagFilterOptions`](../interfaces/TagFilterOptions.md)

Tag filter options

#### Returns

`Promise`\<[`OkPornTagOutput`](../interfaces/OkPornTagOutput.md)[]\>

`OkPornTagOutput[]` list in tag format if path is not specified,
         otherwise returns tag URLs or tag names based on the specified format

#### Throws

GenericException When the tag filter options are invalid
false

***

### getChannels()

> **getChannels**(`range?`, `args?`): `Promise`\<[`OkPornChannelOutput`](../interfaces/OkPornChannelOutput.md)[]\>

Defined in: [packages/providers/okporn/OkPornProvider.ts:210](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornProvider.ts#L210)

Gets channels by page range.

#### Parameters

##### range?

[`PageRange`](../type-aliases/PageRange.md) = `...`

Page range

##### args?

[`OkPornIdType`](../type-aliases/OkPornIdType.md)

Channel identifier output format

#### Returns

`Promise`\<[`OkPornChannelOutput`](../interfaces/OkPornChannelOutput.md)[]\>

`OkPornChannelOutput[]` list
remarks The channel page limit is 21. Exceeding this will throw an InvalidRangeException.

#### Throws

InvalidRangeException When the range exceeds the channel page limit

#### Throws

GenericException When the channel identifier output format is invalid
false

***

### getVideos()

> **getVideos**(`range?`, `quality?`): `Promise`\<[`OkPornVideoOutput`](../interfaces/OkPornVideoOutput.md)[]\>

Defined in: [packages/providers/okporn/OkPornProvider.ts:230](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornProvider.ts#L230)

Gets videos by index range.

#### Parameters

##### range?

[`IndexRange`](../type-aliases/IndexRange.md) = `...`

Index range

##### quality?

[`VideoQuality`](../enumerations/VideoQuality.md)

Allowed video quality

#### Returns

`Promise`\<[`OkPornVideoOutput`](../interfaces/OkPornVideoOutput.md)[]\>

`OkPornVideoOutput[]` list

#### Throws

InvalidRangeException When the index range is invalid
true

***

### getVideo()

> **getVideo**(`quality?`): `Promise`\<[`OkPornVideoOutput`](../interfaces/OkPornVideoOutput.md)\>

Defined in: [packages/providers/okporn/OkPornProvider.ts:248](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/okporn/OkPornProvider.ts#L248)

Gets a single video.

#### Parameters

##### quality?

[`VideoQuality`](../enumerations/VideoQuality.md)

Allowed video quality

#### Returns

`Promise`\<[`OkPornVideoOutput`](../interfaces/OkPornVideoOutput.md)\>

`OkPornVideoOutput`
remarks The video identifier can be found in the video URL (e.g., https://ok.porn/video/12345/ has the identifier "12345")

#### Throws

GenericException When the video ID is not provided
true
