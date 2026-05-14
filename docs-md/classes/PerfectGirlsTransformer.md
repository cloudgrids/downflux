[**downflux**](../README.md)

***

[downflux](../README.md) / PerfectGirlsTransformer

# Class: PerfectGirlsTransformer

Defined in: [packages/providers/perfectgirls/PerfectGirlsTransformer.ts:18](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/perfectgirls/PerfectGirlsTransformer.ts#L18)

## Extends

- [`BaseTransformer`](BaseTransformer.md)\<[`PerfectGirlsExecArgs`](../interfaces/PerfectGirlsExecArgs.md), [`PerfectGirlsAlbumOutput`](../interfaces/PerfectGirlsAlbumOutput.md) \| [`PerfectGirlsVideoOutput`](../interfaces/PerfectGirlsVideoOutput.md) \| [`PerfectGirlsModelOutput`](../interfaces/PerfectGirlsModelOutput.md) \| [`PerfectGirlsTagOutput`](../interfaces/PerfectGirlsTagOutput.md) \| [`PerfectGirlsChannelOutput`](../interfaces/PerfectGirlsChannelOutput.md) \| [`PerfectGirlsModelVideoIdsOutput`](../interfaces/PerfectGirlsModelVideoIdsOutput.md) \| [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\>

## Constructors

### Constructor

> **new PerfectGirlsTransformer**(`httpClient`, `progressManager`): `PerfectGirlsTransformer`

Defined in: [packages/base/BaseTransformer.ts:8](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseTransformer.ts#L8)

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

Defined in: [packages/base/BaseTransformer.ts:9](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseTransformer.ts#L9)

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`httpClient`](BaseTransformer.md#httpclient)

***

### progressManager

> `protected` `readonly` **progressManager**: [`ProgressManager`](ProgressManager.md)

Defined in: [packages/base/BaseTransformer.ts:10](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseTransformer.ts#L10)

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`progressManager`](BaseTransformer.md#progressmanager)

## Methods

### requestData()

> **requestData**(`url`, `opts`): `Promise`\<`any`\>

Defined in: [packages/base/BaseTransformer.ts:29](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseTransformer.ts#L29)

#### Parameters

##### url

`string`

##### opts

[`DownloadOptions`](../interfaces/DownloadOptions.md)

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`requestData`](BaseTransformer.md#requestdata)

***

### transform()

> **transform**(`url`, `request`): `Promise`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\> \| [`PerfectGirlsAlbumOutput`](../interfaces/PerfectGirlsAlbumOutput.md) \| [`PerfectGirlsVideoOutput`](../interfaces/PerfectGirlsVideoOutput.md) \| [`PerfectGirlsTagOutput`](../interfaces/PerfectGirlsTagOutput.md) \| [`PerfectGirlsChannelOutput`](../interfaces/PerfectGirlsChannelOutput.md) \| [`PerfectGirlsModelVideoIdsOutput`](../interfaces/PerfectGirlsModelVideoIdsOutput.md) \| [`PerfectGirlsModelOutput`](../interfaces/PerfectGirlsModelOutput.md)\>

Defined in: [packages/providers/perfectgirls/PerfectGirlsTransformer.ts:28](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/perfectgirls/PerfectGirlsTransformer.ts#L28)

#### Parameters

##### url

`string`

##### request

[`PerfectGirlsExecArgs`](../interfaces/PerfectGirlsExecArgs.md)

#### Returns

`Promise`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\> \| [`PerfectGirlsAlbumOutput`](../interfaces/PerfectGirlsAlbumOutput.md) \| [`PerfectGirlsVideoOutput`](../interfaces/PerfectGirlsVideoOutput.md) \| [`PerfectGirlsTagOutput`](../interfaces/PerfectGirlsTagOutput.md) \| [`PerfectGirlsChannelOutput`](../interfaces/PerfectGirlsChannelOutput.md) \| [`PerfectGirlsModelVideoIdsOutput`](../interfaces/PerfectGirlsModelVideoIdsOutput.md) \| [`PerfectGirlsModelOutput`](../interfaces/PerfectGirlsModelOutput.md)\>

#### Overrides

[`BaseTransformer`](BaseTransformer.md).[`transform`](BaseTransformer.md#transform)
