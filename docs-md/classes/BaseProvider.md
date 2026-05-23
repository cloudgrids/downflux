[**downflux**](../README.md)

***

[downflux](../README.md) / BaseProvider

# Abstract Class: BaseProvider\<TExec\>

Defined in: [packages/base/BaseProvider.ts:38](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L38)

Base provider API for every supported site.

## Remarks

Providers are the public entry points because callers should not need to know
about parsers, transformers, pipelines, or transport details. A provider owns
URL validation, provider metadata, fluent job configuration, and the typed
methods that turn a site URL into an execution request.

## Extended by

- [`AnalRzProvider`](AnalRzProvider.md)
- [`BeegProvider`](BeegProvider.md)
- [`BlackPornProvider`](BlackPornProvider.md)
- [`BoKepPornProvider`](BoKepPornProvider.md)
- [`ColliderPornProvider`](ColliderPornProvider.md)
- [`CumLouderProvider`](CumLouderProvider.md)
- [`DaFreePornProvider`](DaFreePornProvider.md)
- [`DaNudeProvider`](DaNudeProvider.md)
- [`DefaultProvider`](DefaultProvider.md)
- [`EpicGfsProvider`](EpicGfsProvider.md)
- [`EPornerProvider`](EPornerProvider.md)
- [`HqPornProvider`](HqPornProvider.md)
- [`InterracialProvider`](InterracialProvider.md)
- [`ItsPornProvider`](ItsPornProvider.md)
- [`Lesbian8Provider`](Lesbian8Provider.md)
- [`MegaTubeProvider`](MegaTubeProvider.md)
- [`MomVidsProvider`](MomVidsProvider.md)
- [`MyLustProvider`](MyLustProvider.md)
- [`OkPornProvider`](OkPornProvider.md)
- [`PerfectGirlsProvider`](PerfectGirlsProvider.md)
- [`Porn300Provider`](Porn300Provider.md)
- [`PornDoeProvider`](PornDoeProvider.md)
- [`PornHubProvider`](PornHubProvider.md)
- [`PornIdProvider`](PornIdProvider.md)
- [`PornOneProvider`](PornOneProvider.md)
- [`PornSevenProvider`](PornSevenProvider.md)
- [`PornsOkProvider`](PornsOkProvider.md)
- [`PussySpaceProvider`](PussySpaceProvider.md)
- [`SexVidProvider`](SexVidProvider.md)
- [`ShamelessProvider`](ShamelessProvider.md)
- [`GenericContentProvider`](GenericContentProvider.md)
- [`SuperPornProvider`](SuperPornProvider.md)
- [`SxyPornProvider`](SxyPornProvider.md)
- [`TheyAreHugeProvider`](TheyAreHugeProvider.md)
- [`TnAFlixProvider`](TnAFlixProvider.md)
- [`TubeVSexProvider`](TubeVSexProvider.md)
- [`TwitterProvider`](TwitterProvider.md)
- [`WallHavenProvider`](WallHavenProvider.md)
- [`XCafeProvider`](XCafeProvider.md)
- [`XDeguProvider`](XDeguProvider.md)
- [`XGroovyProvider`](XGroovyProvider.md)
- [`XHamsterProvider`](XHamsterProvider.md)
- [`XnXXProvider`](XnXXProvider.md)
- [`XozillaProvider`](XozillaProvider.md)
- [`XVideosProvider`](XVideosProvider.md)
- [`ZbPornProvider`](ZbPornProvider.md)
- [`ZzzTubeProvider`](ZzzTubeProvider.md)

## Type Parameters

### TExec

`TExec` *extends* [`ExecutionArgs`](../interfaces/ExecutionArgs.md)\<[`ExecutionShape`](../type-aliases/ExecutionShape.md)\>

## Constructors

### Constructor

> **new BaseProvider**\<`TExec`\>(`url`, `config`): `BaseProvider`\<`TExec`\>

Defined in: [packages/base/BaseProvider.ts:51](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L51)

#### Parameters

##### url

`string`

##### config

[`ProviderConfig`](../interfaces/ProviderConfig.md)

#### Returns

`BaseProvider`\<`TExec`\>

## Properties

### executionOptions

> `protected` **executionOptions**: [`ExecutionOptions`](../interfaces/ExecutionOptions.md) = `{}`

Defined in: [packages/base/BaseProvider.ts:39](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L39)

***

### httpOptions

> `protected` **httpOptions**: [`HttpFetchOptions`](../interfaces/HttpFetchOptions.md) = `{}`

Defined in: [packages/base/BaseProvider.ts:40](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L40)

***

### deps

> `protected` `readonly` **deps**: [`CoordinatorDependencies`](../interfaces/CoordinatorDependencies.md)

Defined in: [packages/base/BaseProvider.ts:41](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L41)

***

### provider

> `protected` `readonly` **provider**: [`Provider`](../enumerations/Provider.md)

Defined in: [packages/base/BaseProvider.ts:42](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L42)

***

### urlPattern

> `protected` `readonly` **urlPattern**: `RegExp`

Defined in: [packages/base/BaseProvider.ts:43](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L43)

***

### providerMetadata

> `protected` `readonly` **providerMetadata**: [`ProviderMetadata`](../interfaces/ProviderMetadata.md)

Defined in: [packages/base/BaseProvider.ts:44](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L44)

***

### url

> `protected` `readonly` **url**: `string`

Defined in: [packages/base/BaseProvider.ts:52](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L52)

***

### config

> `protected` **config**: [`ProviderConfig`](../interfaces/ProviderConfig.md)

Defined in: [packages/base/BaseProvider.ts:53](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L53)

## Accessors

### metadata

#### Get Signature

> **get** `protected` **metadata**(): [`ProviderMetadata`](../interfaces/ProviderMetadata.md)

Defined in: [packages/base/BaseProvider.ts:47](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L47)

Provider capabilities, integration status, and access restrictions.

##### Returns

[`ProviderMetadata`](../interfaces/ProviderMetadata.md)

***

### ORIGIN

#### Get Signature

> **get** `protected` **ORIGIN**(): `string`

Defined in: [packages/base/BaseProvider.ts:81](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L81)

##### Returns

`string`

***

### HOST\_NAME

#### Get Signature

> **get** `protected` **HOST\_NAME**(): `string`

Defined in: [packages/base/BaseProvider.ts:85](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L85)

##### Returns

`string`

## Methods

### isValidHostName()

> `protected` **isValidHostName**(): `boolean`

Defined in: [packages/base/BaseProvider.ts:89](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L89)

#### Returns

`boolean`

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

***

### buildRequest()

> `protected` **buildRequest**(`overrides?`): `TExec`

Defined in: [packages/base/BaseProvider.ts:309](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseProvider.ts#L309)

Builds the execution request passed to the coordinator layer.

#### Parameters

##### overrides?

`Partial`\<`TExec`\>

Provider method options that should override defaults.

#### Returns

`TExec`

A typed request containing provider metadata and execution options.

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

`TExec` \| \{ `entryUrl?`: `string`; \} & `object`

Provider method request data, including execution shape.

#### Returns

`Promise`\<`TResult`\>

Extracted output in the shape requested by the provider method.

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
