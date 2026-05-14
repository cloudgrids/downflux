[**downflux**](../README.md)

***

[downflux](../README.md) / WallHavenProvider

# Class: WallHavenProvider

Defined in: [packages/providers/wallhaven/WallHavenProvider.ts:20](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/wallhaven/WallHavenProvider.ts#L20)

WallHaven provider.
Provides wallpaper and user upload operations.

## Extends

- [`BaseProvider`](BaseProvider.md)\<[`WallHavenExecArgs`](../interfaces/WallHavenExecArgs.md)\>

## Constructors

### Constructor

> **new WallHavenProvider**(`url`): `WallHavenProvider`

Defined in: [packages/providers/wallhaven/WallHavenProvider.ts:27](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/wallhaven/WallHavenProvider.ts#L27)

#### Parameters

##### url

`string`

#### Returns

`WallHavenProvider`

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

> `protected` `readonly` **provider**: [`WallHaven`](../enumerations/ProviderType.md#wallhaven) = `ProviderType.WallHaven`

Defined in: [packages/providers/wallhaven/WallHavenProvider.ts:21](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/wallhaven/WallHavenProvider.ts#L21)

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

> `protected` **buildRequest**(`overrides?`): [`WallHavenExecArgs`](../interfaces/WallHavenExecArgs.md)

Defined in: [packages/base/BaseProvider.ts:207](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseProvider.ts#L207)

#### Parameters

##### overrides?

`Partial`\<[`WallHavenExecArgs`](../interfaces/WallHavenExecArgs.md)\>

#### Returns

[`WallHavenExecArgs`](../interfaces/WallHavenExecArgs.md)

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

`Partial`\<[`WallHavenExecArgs`](../interfaces/WallHavenExecArgs.md) & `object`\>

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

### getWallPaper()

> **getWallPaper**(`id`, `thumbQuality?`): `Promise`\<[`WallHavenWallPaperOutput`](../interfaces/WallHavenWallPaperOutput.md)\>

Defined in: [packages/providers/wallhaven/WallHavenProvider.ts:43](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/wallhaven/WallHavenProvider.ts#L43)

Gets a single wallpaper.

#### Parameters

##### id

`string`

WallHaven wallpaper identifier

##### thumbQuality?

[`WallHavenThumbnailQuality`](../enumerations/WallHavenThumbnailQuality.md)

Thumbnail qualities to include in the response (defaults to all qualities)

#### Returns

`Promise`\<[`WallHavenWallPaperOutput`](../interfaces/WallHavenWallPaperOutput.md)\>

`WallHavenWallPaperOutput` Wallpaper metadata and thumbnails

#### Throws

`GenericException` When the ID is missing
This method downloads the found urls and returns the metadata and thumbnail URLs without downloading the full wallpaper image.
true

***

### getUserUploads()

> **getUserUploads**(`args`, `range?`): `Promise`\<[`WallHavenUserUploadsOutput`](../interfaces/WallHavenUserUploadsOutput.md)\>

Defined in: [packages/providers/wallhaven/WallHavenProvider.ts:66](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/wallhaven/WallHavenProvider.ts#L66)

Gets uploads for a WallHaven user.

#### Parameters

##### args

[`WallHavenUserExecArgs`](../interfaces/WallHavenUserExecArgs.md)

User upload options WallHavenUserExecArgs

##### range?

[`IndexRange`](../type-aliases/IndexRange.md) \| `"all"`

Page index range or 'all' to get all pages (defaults to first page)

#### Returns

`Promise`\<[`WallHavenUserUploadsOutput`](../interfaces/WallHavenUserUploadsOutput.md)\>

`WallHavenUserUploadsOutput` User upload metadata and thumbnails

#### Throws

`GenericException` When the username is missing
This method downloads the images and metadata for a user's uploads
The method will fetch the total number of pages for the user's uploads and iterate through them based on the specified range to retrieve all relevant metadata and thumbnail URLs.
true

***

### getUserUploadsInfo()

> **getUserUploadsInfo**(`username`): `Promise`\<[`WallHavenUserInfoOutput`](../interfaces/WallHavenUserInfoOutput.md)\>

Defined in: [packages/providers/wallhaven/WallHavenProvider.ts:96](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/wallhaven/WallHavenProvider.ts#L96)

Gets the upload info for a WallHaven user.

#### Parameters

##### username

`string`

WallHaven username

#### Returns

`Promise`\<[`WallHavenUserInfoOutput`](../interfaces/WallHavenUserInfoOutput.md)\>

`WallHavenUserInfo` Total upload images count

#### Throws

`GenericException` When the username is missing
This method only fetches the total upload count and total pages for a user, it does not download any images or thumbnails.
This method is used internally to determine the number of pages to fetch when retrieving user uploads.
false

***

### getUserFavoriteCollections()

> **getUserFavoriteCollections**(`args`, `range?`): `Promise`\<[`WallHavenUserFavoriteCollectionsOutput`](../interfaces/WallHavenUserFavoriteCollectionsOutput.md)[]\>

Defined in: [packages/providers/wallhaven/WallHavenProvider.ts:115](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/wallhaven/WallHavenProvider.ts#L115)

Gets the favorite collections for a WallHaven user.

#### Parameters

##### args

[`WallHavenUserExecArgs`](../interfaces/WallHavenUserExecArgs.md)

##### range?

[`IndexRange`](../type-aliases/IndexRange.md) \| `"all"`

#### Returns

`Promise`\<[`WallHavenUserFavoriteCollectionsOutput`](../interfaces/WallHavenUserFavoriteCollectionsOutput.md)[]\>

`WallHavenUserFavoriteCollection[]` User favorite collections metadata and thumbnails

#### Throws

`GenericException` When the username is missing
This method downloads and fetches the favorite collection metadata and thumbnail URLs
true

***

### getUserFavoritesCollection()

> **getUserFavoritesCollection**(`args`, `range?`): `Promise`\<[`WallHavenUserFavoriteCollectionOutput`](../interfaces/WallHavenUserFavoriteCollectionOutput.md)\>

Defined in: [packages/providers/wallhaven/WallHavenProvider.ts:146](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/wallhaven/WallHavenProvider.ts#L146)

Gets favorite collection of a WallHaven user.

#### Parameters

##### args

[`WallHavenUserFavoritesExecArgs`](../interfaces/WallHavenUserFavoritesExecArgs.md)

User upload options WallHavenUserExecArgs

##### range?

[`IndexRange`](../type-aliases/IndexRange.md) \| `"all"`

Page index range or 'all' to get all pages (defaults to first page)

#### Returns

`Promise`\<[`WallHavenUserFavoriteCollectionOutput`](../interfaces/WallHavenUserFavoriteCollectionOutput.md)\>

`WallHavenUserUploadsOutput` User upload metadata and thumbnails

#### Throws

`GenericException` When the username or collection ID is missing
This method downloads the images and metadata for a specific favorite collection, it does not download any images.
true

***

### getWallPapers()

> **getWallPapers**(): `Promise`\<`void`\>

Defined in: [packages/providers/wallhaven/WallHavenProvider.ts:167](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/wallhaven/WallHavenProvider.ts#L167)

#### Returns

`Promise`\<`void`\>
