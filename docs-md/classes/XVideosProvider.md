[**downflux**](../README.md)

***

[downflux](../README.md) / XVideosProvider

# Class: XVideosProvider

Defined in: [packages/providers/xvideos/XVideosProvider.ts:20](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/xvideos/XVideosProvider.ts#L20)

XVideosProvider

## Remarks

XVideos supports video downloading (canDownload: true).
Dependencies: ffmpeg (for m3u8 to mp4 conversion)

## Extends

- [`BaseProvider`](BaseProvider.md)\<[`XVideosExecArgs`](../interfaces/XVideosExecArgs.md)\>

## Constructors

### Constructor

> **new XVideosProvider**(`url`): `XVideosProvider`

Defined in: [packages/providers/xvideos/XVideosProvider.ts:23](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/xvideos/XVideosProvider.ts#L23)

#### Parameters

##### url

`string`

#### Returns

`XVideosProvider`

#### Overrides

[`BaseProvider`](BaseProvider.md).[`constructor`](BaseProvider.md#constructor)

## Properties

### executionOptions

> `protected` **executionOptions**: [`ExecutionOptions`](../interfaces/ExecutionOptions.md) = `{}`

Defined in: [packages/base/BaseProvider.ts:39](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L39)

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`executionOptions`](BaseProvider.md#executionoptions)

***

### httpOptions

> `protected` **httpOptions**: [`HttpFetchOptions`](../interfaces/HttpFetchOptions.md) = `{}`

Defined in: [packages/base/BaseProvider.ts:40](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L40)

#### Inherited from

[`DefaultProvider`](DefaultProvider.md).[`httpOptions`](DefaultProvider.md#httpoptions)

***

### deps

> `protected` `readonly` **deps**: [`CoordinatorDependencies`](../interfaces/CoordinatorDependencies.md)

Defined in: [packages/base/BaseProvider.ts:41](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L41)

#### Inherited from

[`DefaultProvider`](DefaultProvider.md).[`deps`](DefaultProvider.md#deps)

***

### urlPattern

> `protected` `readonly` **urlPattern**: `RegExp`

Defined in: [packages/base/BaseProvider.ts:43](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L43)

#### Inherited from

[`DefaultProvider`](DefaultProvider.md).[`urlPattern`](DefaultProvider.md#urlpattern)

***

### providerMetadata

> `protected` `readonly` **providerMetadata**: [`ProviderMetadata`](../interfaces/ProviderMetadata.md)

Defined in: [packages/base/BaseProvider.ts:44](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L44)

#### Inherited from

[`DefaultProvider`](DefaultProvider.md).[`providerMetadata`](DefaultProvider.md#providermetadata)

***

### url

> `protected` `readonly` **url**: `string`

Defined in: [packages/base/BaseProvider.ts:52](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L52)

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`url`](BaseProvider.md#url)

***

### config

> `protected` **config**: [`ProviderConfig`](../interfaces/ProviderConfig.md)

Defined in: [packages/base/BaseProvider.ts:53](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L53)

#### Inherited from

[`DefaultProvider`](DefaultProvider.md).[`config`](DefaultProvider.md#config)

***

### provider

> `protected` `readonly` **provider**: [`XVideos`](../enumerations/Provider.md#xvideos) = `Provider.XVideos`

Defined in: [packages/providers/xvideos/XVideosProvider.ts:21](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/xvideos/XVideosProvider.ts#L21)

#### Overrides

[`BaseProvider`](BaseProvider.md).[`provider`](BaseProvider.md#provider)

## Accessors

### metadata

#### Get Signature

> **get** `protected` **metadata**(): [`ProviderMetadata`](../interfaces/ProviderMetadata.md)

Defined in: [packages/base/BaseProvider.ts:47](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L47)

Provider capabilities, integration status, and access restrictions.

##### Returns

[`ProviderMetadata`](../interfaces/ProviderMetadata.md)

#### Inherited from

[`DefaultProvider`](DefaultProvider.md).[`metadata`](DefaultProvider.md#metadata)

***

### ORIGIN

#### Get Signature

> **get** `protected` **ORIGIN**(): `string`

Defined in: [packages/base/BaseProvider.ts:81](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L81)

##### Returns

`string`

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`ORIGIN`](BaseProvider.md#origin)

***

### HOST\_NAME

#### Get Signature

> **get** `protected` **HOST\_NAME**(): `string`

Defined in: [packages/base/BaseProvider.ts:85](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L85)

##### Returns

`string`

#### Inherited from

[`DefaultProvider`](DefaultProvider.md).[`HOST_NAME`](DefaultProvider.md#host_name)

## Methods

### isValidHostName()

> `protected` **isValidHostName**(): `boolean`

Defined in: [packages/base/BaseProvider.ts:89](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L89)

#### Returns

`boolean`

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`isValidHostName`](BaseProvider.md#isvalidhostname)

***

### setAuth()

> **setAuth**(`auth`): `this`

Defined in: [packages/base/BaseProvider.ts:110](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L110)

Sets authentication credentials for the provider.

#### Parameters

##### auth

[`AuthenticatedCrawlOptions`](../interfaces/AuthenticatedCrawlOptions.md)

Authentication options including cookie, bearer token, CSRF token, API key, client ID, and user agent

#### Returns

`this`

#### Remarks

Configures HTTP headers and user agent based on provided authentication credentials.
Supports multiple authentication methods: cookies, bearer tokens, CSRF tokens, API keys, and client IDs.

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`setAuth`](BaseProvider.md#setauth)

***

### setHeaders()

> **setHeaders**(`headers`): `this`

Defined in: [packages/base/BaseProvider.ts:129](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L129)

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

Defined in: [packages/base/BaseProvider.ts:138](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L138)

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

Defined in: [packages/base/BaseProvider.ts:147](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L147)

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

Defined in: [packages/base/BaseProvider.ts:156](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L156)

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

Defined in: [packages/base/BaseProvider.ts:165](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L165)

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

Defined in: [packages/base/BaseProvider.ts:175](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L175)

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

Defined in: [packages/base/BaseProvider.ts:188](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L188)

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

Defined in: [packages/base/BaseProvider.ts:197](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L197)

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

Defined in: [packages/base/BaseProvider.ts:211](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L211)

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

Defined in: [packages/base/BaseProvider.ts:220](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L220)

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

Defined in: [packages/base/BaseProvider.ts:229](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L229)

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

Defined in: [packages/base/BaseProvider.ts:238](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L238)

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

Defined in: [packages/base/BaseProvider.ts:247](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L247)

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

Defined in: [packages/base/BaseProvider.ts:256](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L256)

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

Defined in: [packages/base/BaseProvider.ts:266](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L266)

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

Defined in: [packages/base/BaseProvider.ts:277](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L277)

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

Defined in: [packages/base/BaseProvider.ts:298](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L298)

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

> `protected` **buildRequest**(`overrides?`): [`XVideosExecArgs`](../interfaces/XVideosExecArgs.md)

Defined in: [packages/base/BaseProvider.ts:309](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L309)

Builds the execution request passed to the coordinator layer.

#### Parameters

##### overrides?

`Partial`\<[`XVideosExecArgs`](../interfaces/XVideosExecArgs.md)\>

Provider method options that should override defaults.

#### Returns

[`XVideosExecArgs`](../interfaces/XVideosExecArgs.md)

A typed request containing provider metadata and execution options.

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`buildRequest`](BaseProvider.md#buildrequest)

***

### execute()

> `protected` **execute**\<`TResult`\>(`overrides`): `Promise`\<`TResult`\>

Defined in: [packages/base/BaseProvider.ts:330](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L330)

Runs extraction and optional downloads through the shared coordinator.

#### Type Parameters

##### TResult

`TResult`

#### Parameters

##### overrides

\{ `entryUrl?`: `string`; \} \| [`XVideosExecArgs`](../interfaces/XVideosExecArgs.md) & `object`

Provider method request data, including execution shape.

#### Returns

`Promise`\<`TResult`\>

Extracted output in the shape requested by the provider method.

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`execute`](BaseProvider.md#execute)

***

### makeTargets()

> `protected` **makeTargets**(`sourceUrl`, `range`, `provider`, `method`, `addTrailingSlash?`): `object`

Defined in: [packages/base/BaseProvider.ts:359](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L359)

Builds paginated target URLs for list-like provider methods.

#### Parameters

##### sourceUrl

`string`

Base URL before the page number.

##### range

[`Range`](../type-aliases/Range.md)

Page or start/end range to expand.

##### provider

[`Provider`](../enumerations/Provider.md)

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

> **provider**: [`Provider`](../enumerations/Provider.md)

##### method

> **method**: `string`

#### Inherited from

[`BaseProvider`](BaseProvider.md).[`makeTargets`](BaseProvider.md#maketargets)

***

### getVideo()

> **getVideo**(): `Promise`\<[`XVideosVideoOutput`](../interfaces/XVideosVideoOutput.md)\>

Defined in: [packages/providers/xvideos/XVideosProvider.ts:50](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/xvideos/XVideosProvider.ts#L50)

#### Returns

`Promise`\<[`XVideosVideoOutput`](../interfaces/XVideosVideoOutput.md)\>

`XVideosVideoOutput` with video metadata and source URLs.
Fetches video sources from the provided XVideos URL.

#### Throws

`GenericException` when the video sources cannot be extracted
`true`
