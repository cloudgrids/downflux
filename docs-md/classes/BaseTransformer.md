[**downflux**](../README.md)

***

[downflux](../README.md) / BaseTransformer

# Class: BaseTransformer\<TExec, TResult\>

Defined in: [packages/base/BaseTransformer.ts:25](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseTransformer.ts#L25)

Fetches a target URL and converts parser output into execution metadata.

## Remarks

Transformers sit between HTTP fetching and pipeline building. They combine
common parser output with provider-specific parser output, then provider
subclasses can map those raw fields into stable public result types.

## Extended by

- [`BeegTransformer`](BeegTransformer.md)
- [`BoKepPornTransformer`](BoKepPornTransformer.md)
- [`ColliderPornTransformer`](ColliderPornTransformer.md)
- [`CumLouderTransformer`](CumLouderTransformer.md)
- [`DaFreePornTransformer`](DaFreePornTransformer.md)
- [`DaNudeTransformer`](DaNudeTransformer.md)
- [`EpicGfsTransformer`](EpicGfsTransformer.md)
- [`EPornerTransformer`](EPornerTransformer.md)
- [`HqPornTransformer`](HqPornTransformer.md)
- [`InterracialTransformer`](InterracialTransformer.md)
- [`ItsPornTransformer`](ItsPornTransformer.md)
- [`Lesbian8Transformer`](Lesbian8Transformer.md)
- [`MegaTubeTransformer`](MegaTubeTransformer.md)
- [`MomVidsTransformer`](MomVidsTransformer.md)
- [`MyLustTransformer`](MyLustTransformer.md)
- [`OkPornTransformer`](OkPornTransformer.md)
- [`PerfectGirlsTransformer`](PerfectGirlsTransformer.md)
- [`Porn300Transformer`](Porn300Transformer.md)
- [`PornDoeTransformer`](PornDoeTransformer.md)
- [`PornHubTransformer`](PornHubTransformer.md)
- [`PornIdTransformer`](PornIdTransformer.md)
- [`PornOneTransformer`](PornOneTransformer.md)
- [`PornSevenTransformer`](PornSevenTransformer.md)
- [`PornsOkTransformer`](PornsOkTransformer.md)
- [`PussySpaceTransformer`](PussySpaceTransformer.md)
- [`SexVidTransformer`](SexVidTransformer.md)
- [`ShamelessTransformer`](ShamelessTransformer.md)
- [`SuperPornTransformer`](SuperPornTransformer.md)
- [`SxyPornTransformer`](SxyPornTransformer.md)
- [`TheyAreHugeTransformer`](TheyAreHugeTransformer.md)
- [`TnAFlixTransformer`](TnAFlixTransformer.md)
- [`TubeVSexTransformer`](TubeVSexTransformer.md)
- [`WallHavenTransformer`](WallHavenTransformer.md)
- [`XCafeTransformer`](XCafeTransformer.md)
- [`XDeguTransformer`](XDeguTransformer.md)
- [`XGroovyTransformer`](XGroovyTransformer.md)
- [`XHamsterTransformer`](XHamsterTransformer.md)
- [`XnXXTransformer`](XnXXTransformer.md)
- [`XozillaTransformer`](XozillaTransformer.md)
- [`XVideosTransformer`](XVideosTransformer.md)
- [`ZbPornTransformer`](ZbPornTransformer.md)
- [`ZzzTubeTransformer`](ZzzTubeTransformer.md)

## Type Parameters

### TExec

`TExec` *extends* [`ExecutionArgs`](../interfaces/ExecutionArgs.md)

### TResult

`TResult` = [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)

## Constructors

### Constructor

> **new BaseTransformer**\<`TExec`, `TResult`\>(`httpClient`, `progressManager`): `BaseTransformer`\<`TExec`, `TResult`\>

Defined in: [packages/base/BaseTransformer.ts:26](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseTransformer.ts#L26)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`BaseTransformer`\<`TExec`, `TResult`\>

## Properties

### httpClient

> `protected` `readonly` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: [packages/base/BaseTransformer.ts:27](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseTransformer.ts#L27)

***

### progressManager

> `protected` `readonly` **progressManager**: [`ProgressManager`](ProgressManager.md)

Defined in: [packages/base/BaseTransformer.ts:28](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseTransformer.ts#L28)

## Methods

### transform()

> **transform**(`url`, `request?`): `Promise`\<`TResult`\>

Defined in: [packages/base/BaseTransformer.ts:38](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseTransformer.ts#L38)

Fetches HTML and merges default metadata with provider-specific metadata.

#### Parameters

##### url

`string`

Target page to fetch.

##### request?

`TExec`

Execution request that identifies the provider and options.

#### Returns

`Promise`\<`TResult`\>

Parsed metadata ready for provider-specific output mapping.

***

### requestData()

> **requestData**(`url`, `opts`): `Promise`\<`any`\>

Defined in: [packages/base/BaseTransformer.ts:61](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseTransformer.ts#L61)

Fetches JSON data for providers that expose API-backed metadata.

#### Parameters

##### url

`string`

API endpoint to request.

##### opts

[`DownloadOptions`](../interfaces/DownloadOptions.md)

HTTP and provider options.

#### Returns

`Promise`\<`any`\>

Parsed JSON response.

***

### uniqueVideos()

> `protected` **uniqueVideos**\<`T`\>(`videos`, `options`): [`VideoSourceOutput`](../interfaces/VideoSourceOutput.md)[]

Defined in: [packages/base/BaseTransformer.ts:72](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseTransformer.ts#L72)

Removes duplicate video URLs while preserving quality information.

#### Type Parameters

##### T

`T`

#### Parameters

##### videos

`T`[]

Provider-specific video source records.

##### options

[`UniqueVideosProps`](../interfaces/UniqueVideosProps.md)\<`T`\>

URL and quality selectors.

#### Returns

[`VideoSourceOutput`](../interfaces/VideoSourceOutput.md)[]

Unique video sources in the shared shape.

***

### unique()

> `protected` **unique**\<`T`\>(`arr`): `T`[]

Defined in: [packages/base/BaseTransformer.ts:89](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseTransformer.ts#L89)

#### Type Parameters

##### T

`T`

#### Parameters

##### arr

`T`[]

#### Returns

`T`[]
