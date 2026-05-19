[**downflux**](../README.md)

***

[downflux](../README.md) / BaseProvider

# Abstract Class: BaseProvider\<TExec\>

Defined in: [packages/base/BaseProvider.ts:37](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L37)

Base provider API for every supported site.

## Remarks

Providers are the public entry points because callers should not need to know
about parsers, transformers, pipelines, or transport details. A provider owns
URL validation, provider metadata, fluent job configuration, and the typed
methods that turn a site URL into an execution request.

## Extended by

- [`BeegProvider`](BeegProvider.md)
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
- [`SuperPornProvider`](SuperPornProvider.md)
- [`SxyPornProvider`](SxyPornProvider.md)
- [`TheyAreHugeProvider`](TheyAreHugeProvider.md)
- [`TnAFlixProvider`](TnAFlixProvider.md)
- [`TubeVSexProvider`](TubeVSexProvider.md)
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

Defined in: [packages/base/BaseProvider.ts:50](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L50)

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

Defined in: [packages/base/BaseProvider.ts:38](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L38)

***

### httpOptions

> `protected` **httpOptions**: [`HttpFetchOptions`](../interfaces/HttpFetchOptions.md) = `{}`

Defined in: [packages/base/BaseProvider.ts:39](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L39)

***

### deps

> `protected` `readonly` **deps**: [`CoordinatorDependencies`](../interfaces/CoordinatorDependencies.md)

Defined in: [packages/base/BaseProvider.ts:40](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L40)

***

### provider

> `protected` `readonly` **provider**: [`ProviderType`](../enumerations/ProviderType.md)

Defined in: [packages/base/BaseProvider.ts:41](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L41)

***

### urlPattern

> `protected` `readonly` **urlPattern**: `RegExp`

Defined in: [packages/base/BaseProvider.ts:42](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L42)

***

### providerMetadata

> `protected` `readonly` **providerMetadata**: [`ProviderMetadata`](../interfaces/ProviderMetadata.md)

Defined in: [packages/base/BaseProvider.ts:43](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L43)

***

### url

> `protected` `readonly` **url**: `string`

Defined in: [packages/base/BaseProvider.ts:51](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L51)

***

### config

> `protected` **config**: [`ProviderConfig`](../interfaces/ProviderConfig.md)

Defined in: [packages/base/BaseProvider.ts:52](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L52)

## Accessors

### metadata

#### Get Signature

> **get** `protected` **metadata**(): [`ProviderMetadata`](../interfaces/ProviderMetadata.md)

Defined in: [packages/base/BaseProvider.ts:46](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L46)

Provider capabilities, integration status, and access restrictions.

##### Returns

[`ProviderMetadata`](../interfaces/ProviderMetadata.md)

***

### ORIGIN

#### Get Signature

> **get** `protected` **ORIGIN**(): `string`

Defined in: [packages/base/BaseProvider.ts:79](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L79)

##### Returns

`string`

***

### HOST\_NAME

#### Get Signature

> **get** `protected` **HOST\_NAME**(): `string`

Defined in: [packages/base/BaseProvider.ts:83](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L83)

##### Returns

`string`

## Methods

### isValidHostName()

> `protected` **isValidHostName**(): `boolean`

Defined in: [packages/base/BaseProvider.ts:87](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L87)

#### Returns

`boolean`

***

### setHeaders()

> **setHeaders**(`headers`): `this`

Defined in: [packages/base/BaseProvider.ts:105](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L105)

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

Defined in: [packages/base/BaseProvider.ts:114](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L114)

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

Defined in: [packages/base/BaseProvider.ts:123](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L123)

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

Defined in: [packages/base/BaseProvider.ts:132](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L132)

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

Defined in: [packages/base/BaseProvider.ts:141](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L141)

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

Defined in: [packages/base/BaseProvider.ts:151](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L151)

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

Defined in: [packages/base/BaseProvider.ts:164](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L164)

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

Defined in: [packages/base/BaseProvider.ts:173](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L173)

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

Defined in: [packages/base/BaseProvider.ts:187](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L187)

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

Defined in: [packages/base/BaseProvider.ts:196](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L196)

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

Defined in: [packages/base/BaseProvider.ts:205](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L205)

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

Defined in: [packages/base/BaseProvider.ts:214](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L214)

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

Defined in: [packages/base/BaseProvider.ts:223](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L223)

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

Defined in: [packages/base/BaseProvider.ts:232](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L232)

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

Defined in: [packages/base/BaseProvider.ts:242](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L242)

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

Defined in: [packages/base/BaseProvider.ts:253](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L253)

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

Defined in: [packages/base/BaseProvider.ts:274](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L274)

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

Defined in: [packages/base/BaseProvider.ts:285](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L285)

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

Defined in: [packages/base/BaseProvider.ts:305](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L305)

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

Defined in: [packages/base/BaseProvider.ts:334](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseProvider.ts#L334)

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
