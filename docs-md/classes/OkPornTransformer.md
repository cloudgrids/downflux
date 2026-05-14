[**downflux**](../README.md)

***

[downflux](../README.md) / OkPornTransformer

# Class: OkPornTransformer

Defined in: [packages/providers/okporn/OkPornTransformer.ts:18](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/okporn/OkPornTransformer.ts#L18)

## Extends

- [`BaseTransformer`](BaseTransformer.md)\<[`OkPornExecArgs`](../interfaces/OkPornExecArgs.md), [`OkPornAlbumOutput`](../interfaces/OkPornAlbumOutput.md) \| [`OkPornVideoOutput`](../interfaces/OkPornVideoOutput.md) \| [`OkPornModelOutput`](../interfaces/OkPornModelOutput.md) \| [`OkPornTagOutput`](../interfaces/OkPornTagOutput.md) \| [`OkPornChannelOutput`](../interfaces/OkPornChannelOutput.md) \| [`OkPornModelVideoIdsOutput`](../interfaces/OkPornModelVideoIdsOutput.md) \| [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\>

## Constructors

### Constructor

> **new OkPornTransformer**(`httpClient`, `progressManager`): `OkPornTransformer`

Defined in: [packages/base/BaseTransformer.ts:8](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseTransformer.ts#L8)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`OkPornTransformer`

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`constructor`](BaseTransformer.md#constructor)

## Properties

### httpClient

> `protected` `readonly` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: [packages/base/BaseTransformer.ts:9](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseTransformer.ts#L9)

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`httpClient`](BaseTransformer.md#httpclient)

***

### progressManager

> `protected` `readonly` **progressManager**: [`ProgressManager`](ProgressManager.md)

Defined in: [packages/base/BaseTransformer.ts:10](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseTransformer.ts#L10)

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`progressManager`](BaseTransformer.md#progressmanager)

## Methods

### requestData()

> **requestData**(`url`, `opts`): `Promise`\<`any`\>

Defined in: [packages/base/BaseTransformer.ts:29](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseTransformer.ts#L29)

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

> **transform**(`url`, `request`): `Promise`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\> \| [`OkPornAlbumOutput`](../interfaces/OkPornAlbumOutput.md) \| [`OkPornVideoOutput`](../interfaces/OkPornVideoOutput.md) \| [`OkPornTagOutput`](../interfaces/OkPornTagOutput.md) \| [`OkPornChannelOutput`](../interfaces/OkPornChannelOutput.md) \| [`OkPornModelVideoIdsOutput`](../interfaces/OkPornModelVideoIdsOutput.md) \| [`OkPornModelOutput`](../interfaces/OkPornModelOutput.md)\>

Defined in: [packages/providers/okporn/OkPornTransformer.ts:28](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/okporn/OkPornTransformer.ts#L28)

#### Parameters

##### url

`string`

##### request

[`OkPornExecArgs`](../interfaces/OkPornExecArgs.md)

#### Returns

`Promise`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\> \| [`OkPornAlbumOutput`](../interfaces/OkPornAlbumOutput.md) \| [`OkPornVideoOutput`](../interfaces/OkPornVideoOutput.md) \| [`OkPornTagOutput`](../interfaces/OkPornTagOutput.md) \| [`OkPornChannelOutput`](../interfaces/OkPornChannelOutput.md) \| [`OkPornModelVideoIdsOutput`](../interfaces/OkPornModelVideoIdsOutput.md) \| [`OkPornModelOutput`](../interfaces/OkPornModelOutput.md)\>

#### Overrides

[`BaseTransformer`](BaseTransformer.md).[`transform`](BaseTransformer.md#transform)
