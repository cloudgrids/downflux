[**downflux**](../README.md)

***

[downflux](../README.md) / BeegTransformer

# Class: BeegTransformer

Defined in: [packages/providers/beeg/BeegTransformer.ts:7](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/beeg/BeegTransformer.ts#L7)

## Extends

- [`BaseTransformer`](BaseTransformer.md)\<[`BeegExecArgs`](../interfaces/BeegExecArgs.md), [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md) \| [`BeegVideoOutput`](../interfaces/BeegVideoOutput.md)\>

## Constructors

### Constructor

> **new BeegTransformer**(`httpClient`, `progressManager`): `BeegTransformer`

Defined in: [packages/base/BaseTransformer.ts:8](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseTransformer.ts#L8)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`BeegTransformer`

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

> **transform**(`url`, `request?`): `Promise`\<[`BeegVideoOutput`](../interfaces/BeegVideoOutput.md) \| [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\>\>

Defined in: [packages/providers/beeg/BeegTransformer.ts:12](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/beeg/BeegTransformer.ts#L12)

#### Parameters

##### url

`string`

##### request?

[`BeegExecArgs`](../interfaces/BeegExecArgs.md)

#### Returns

`Promise`\<[`BeegVideoOutput`](../interfaces/BeegVideoOutput.md) \| [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\>\>

#### Overrides

[`BaseTransformer`](BaseTransformer.md).[`transform`](BaseTransformer.md#transform)
