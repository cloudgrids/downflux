[**downflux**](../README.md)

***

[downflux](../README.md) / PerfectGirlsTransformer

# Class: PerfectGirlsTransformer

Defined in: [packages/providers/perfectgirls/PerfectGirlsTransformer.ts:23](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/perfectgirls/PerfectGirlsTransformer.ts#L23)

Normalizes parsed PerfectGirls metadata into the public output shape.

## Remarks

Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.

## Extends

- [`BaseTransformer`](BaseTransformer.md)\<[`PerfectGirlsExecArgs`](../interfaces/PerfectGirlsExecArgs.md), [`PerfectGirlsAlbumOutput`](../interfaces/PerfectGirlsAlbumOutput.md) \| [`PerfectGirlsVideoOutput`](../interfaces/PerfectGirlsVideoOutput.md) \| [`PerfectGirlsModelOutput`](../interfaces/PerfectGirlsModelOutput.md) \| [`PerfectGirlsTagOutput`](../interfaces/PerfectGirlsTagOutput.md) \| [`PerfectGirlsChannelOutput`](../interfaces/PerfectGirlsChannelOutput.md) \| [`PerfectGirlsModelVideoIdsOutput`](../interfaces/PerfectGirlsModelVideoIdsOutput.md) \| [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\>

## Constructors

### Constructor

> **new PerfectGirlsTransformer**(`httpClient`, `progressManager`): `PerfectGirlsTransformer`

Defined in: [packages/base/BaseTransformer.ts:34](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseTransformer.ts#L34)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`PerfectGirlsTransformer`

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`constructor`](BaseTransformer.md#constructor)

## Properties

### httpClient

> `protected` `readonly` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: [packages/base/BaseTransformer.ts:35](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseTransformer.ts#L35)

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`httpClient`](BaseTransformer.md#httpclient)

***

### progressManager

> `protected` `readonly` **progressManager**: [`ProgressManager`](ProgressManager.md)

Defined in: [packages/base/BaseTransformer.ts:36](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseTransformer.ts#L36)

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`progressManager`](BaseTransformer.md#progressmanager)

## Methods

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

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`requestData`](BaseTransformer.md#requestdata)

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

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`uniqueVideos`](BaseTransformer.md#uniquevideos)

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

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`unique`](BaseTransformer.md#unique)

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

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`defaultFlashVarsVideoOutput`](BaseTransformer.md#defaultflashvarsvideooutput)

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

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`mapSources`](BaseTransformer.md#mapsources)

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

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`defaultVideoOutput`](BaseTransformer.md#defaultvideooutput)

***

### transform()

> **transform**(`url`, `request`): `Promise`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\> \| [`PerfectGirlsAlbumOutput`](../interfaces/PerfectGirlsAlbumOutput.md) \| [`PerfectGirlsVideoOutput`](../interfaces/PerfectGirlsVideoOutput.md) \| [`PerfectGirlsTagOutput`](../interfaces/PerfectGirlsTagOutput.md) \| [`PerfectGirlsChannelOutput`](../interfaces/PerfectGirlsChannelOutput.md) \| [`PerfectGirlsModelVideoIdsOutput`](../interfaces/PerfectGirlsModelVideoIdsOutput.md) \| [`PerfectGirlsModelOutput`](../interfaces/PerfectGirlsModelOutput.md)\>

Defined in: [packages/providers/perfectgirls/PerfectGirlsTransformer.ts:33](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/perfectgirls/PerfectGirlsTransformer.ts#L33)

Fetches HTML and merges default metadata with provider-specific metadata.

#### Parameters

##### url

`string`

Target page to fetch.

##### request

[`PerfectGirlsExecArgs`](../interfaces/PerfectGirlsExecArgs.md)

Execution request that identifies the provider and options.

#### Returns

`Promise`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\> \| [`PerfectGirlsAlbumOutput`](../interfaces/PerfectGirlsAlbumOutput.md) \| [`PerfectGirlsVideoOutput`](../interfaces/PerfectGirlsVideoOutput.md) \| [`PerfectGirlsTagOutput`](../interfaces/PerfectGirlsTagOutput.md) \| [`PerfectGirlsChannelOutput`](../interfaces/PerfectGirlsChannelOutput.md) \| [`PerfectGirlsModelVideoIdsOutput`](../interfaces/PerfectGirlsModelVideoIdsOutput.md) \| [`PerfectGirlsModelOutput`](../interfaces/PerfectGirlsModelOutput.md)\>

Parsed metadata ready for provider-specific output mapping.

#### Overrides

[`BaseTransformer`](BaseTransformer.md).[`transform`](BaseTransformer.md#transform)
