[**downflux**](../README.md)

***

[downflux](../README.md) / BaseTransformer

# Class: BaseTransformer\<TExec, TResult\>

Defined in: [packages/base/BaseTransformer.ts:33](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseTransformer.ts#L33)

Fetches a target URL and converts parser output into execution metadata.

## Remarks

Transformers sit between HTTP fetching and pipeline building. They combine
common parser output with provider-specific parser output, then provider
subclasses can map those raw fields into stable public result types.

## Extended by

- [`AnalRzTransformer`](AnalRzTransformer.md)
- [`ArtStationTransformer`](ArtStationTransformer.md)
- [`BeegTransformer`](BeegTransformer.md)
- [`BehanceTransformer`](BehanceTransformer.md)
- [`BlackPornTransformer`](BlackPornTransformer.md)
- [`BlueskyTransformer`](BlueskyTransformer.md)
- [`BoKepPornTransformer`](BoKepPornTransformer.md)
- [`ColliderPornTransformer`](ColliderPornTransformer.md)
- [`CumLouderTransformer`](CumLouderTransformer.md)
- [`DaFreePornTransformer`](DaFreePornTransformer.md)
- [`DanbooruTransformer`](DanbooruTransformer.md)
- [`DaNudeTransformer`](DaNudeTransformer.md)
- [`DeviantArtTransformer`](DeviantArtTransformer.md)
- [`EpicGfsTransformer`](EpicGfsTransformer.md)
- [`EPornerTransformer`](EPornerTransformer.md)
- [`FlickrTransformer`](FlickrTransformer.md)
- [`GelbooruTransformer`](GelbooruTransformer.md)
- [`HqPornTransformer`](HqPornTransformer.md)
- [`ImgurTransformer`](ImgurTransformer.md)
- [`InstagramTransformer`](InstagramTransformer.md)
- [`InterracialTransformer`](InterracialTransformer.md)
- [`ItsPornTransformer`](ItsPornTransformer.md)
- [`Lesbian8Transformer`](Lesbian8Transformer.md)
- [`MangaDexTransformer`](MangaDexTransformer.md)
- [`MastodonTransformer`](MastodonTransformer.md)
- [`MegaTubeTransformer`](MegaTubeTransformer.md)
- [`MomVidsTransformer`](MomVidsTransformer.md)
- [`MyLustTransformer`](MyLustTransformer.md)
- [`NewgroundsTransformer`](NewgroundsTransformer.md)
- [`OkPornTransformer`](OkPornTransformer.md)
- [`PerfectGirlsTransformer`](PerfectGirlsTransformer.md)
- [`PexelsTransformer`](PexelsTransformer.md)
- [`PinterestTransformer`](PinterestTransformer.md)
- [`PixivTransformer`](PixivTransformer.md)
- [`Porn300Transformer`](Porn300Transformer.md)
- [`PornDoeTransformer`](PornDoeTransformer.md)
- [`PornHubTransformer`](PornHubTransformer.md)
- [`PornIdTransformer`](PornIdTransformer.md)
- [`PornOneTransformer`](PornOneTransformer.md)
- [`PornSevenTransformer`](PornSevenTransformer.md)
- [`PornsOkTransformer`](PornsOkTransformer.md)
- [`PussySpaceTransformer`](PussySpaceTransformer.md)
- [`RedditTransformer`](RedditTransformer.md)
- [`SexVidTransformer`](SexVidTransformer.md)
- [`ShamelessTransformer`](ShamelessTransformer.md)
- [`SuperPornTransformer`](SuperPornTransformer.md)
- [`SxyPornTransformer`](SxyPornTransformer.md)
- [`TheyAreHugeTransformer`](TheyAreHugeTransformer.md)
- [`TikTokTransformer`](TikTokTransformer.md)
- [`TnAFlixTransformer`](TnAFlixTransformer.md)
- [`TubeVSexTransformer`](TubeVSexTransformer.md)
- [`TumblrTransformer`](TumblrTransformer.md)
- [`TwitterTransformer`](TwitterTransformer.md)
- [`UnsplashTransformer`](UnsplashTransformer.md)
- [`WallHavenTransformer`](WallHavenTransformer.md)
- [`WikiArtTransformer`](WikiArtTransformer.md)
- [`WikimediaTransformer`](WikimediaTransformer.md)
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

Defined in: [packages/base/BaseTransformer.ts:34](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseTransformer.ts#L34)

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

Defined in: [packages/base/BaseTransformer.ts:35](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseTransformer.ts#L35)

***

### progressManager

> `protected` `readonly` **progressManager**: [`ProgressManager`](ProgressManager.md)

Defined in: [packages/base/BaseTransformer.ts:36](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseTransformer.ts#L36)

## Methods

### transform()

> **transform**(`url`, `request?`): `Promise`\<`TResult`\>

Defined in: [packages/base/BaseTransformer.ts:46](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseTransformer.ts#L46)

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

Defined in: [packages/base/BaseTransformer.ts:66](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseTransformer.ts#L66)

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

Defined in: [packages/base/BaseTransformer.ts:77](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseTransformer.ts#L77)

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

Defined in: [packages/base/BaseTransformer.ts:94](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseTransformer.ts#L94)

#### Type Parameters

##### T

`T`

#### Parameters

##### arr

`T`[]

#### Returns

`T`[]

***

### defaultFlashVarsVideoOutput()

> `protected` **defaultFlashVarsVideoOutput**\<`T`\>(`metadata`): [`DefaultFlashVarsVideoOutput`](../interfaces/DefaultFlashVarsVideoOutput.md)

Defined in: [packages/base/BaseTransformer.ts:99](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseTransformer.ts#L99)

#### Type Parameters

##### T

`T` *extends* [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<[`DefaultFlashVarsVideoOutput`](../interfaces/DefaultFlashVarsVideoOutput.md)\>

#### Parameters

##### metadata

`T`

#### Returns

[`DefaultFlashVarsVideoOutput`](../interfaces/DefaultFlashVarsVideoOutput.md)

***

### mapSources()

> `protected` **mapSources**(`sources`, `quality?`, `filter?`): [`VideosFormat`](../interfaces/VideosFormat.md)

Defined in: [packages/base/BaseTransformer.ts:119](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseTransformer.ts#L119)

#### Parameters

##### sources

`string`[]

##### quality?

`string` = `VideoQuality.QUnknown`

##### filter?

(`src`) => `boolean`

#### Returns

[`VideosFormat`](../interfaces/VideosFormat.md)

***

### defaultVideoOutput()

> `protected` **defaultVideoOutput**\<`T`\>(`metadata`, `options?`): `T`

Defined in: [packages/base/BaseTransformer.ts:137](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseTransformer.ts#L137)

#### Type Parameters

##### T

`T` *extends* `Partial`\<[`DefaultVideoOutput`](../interfaces/DefaultVideoOutput.md)\> = `Partial`\<[`DefaultVideoOutput`](../interfaces/DefaultVideoOutput.md)\>

#### Parameters

##### metadata

[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`Partial`\<`T`\>\>

##### options?

###### filter?

(`src`) => `boolean`

###### quality?

`string`

###### extraFields?

`Partial`\<`T`\>

#### Returns

`T`
