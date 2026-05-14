[**downflux**](../README.md)

***

[downflux](../README.md) / PussySpaceTransformer

# Class: PussySpaceTransformer

Defined in: [packages/providers/pussyspace/PussySpaceTransformer.ts:6](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/pussyspace/PussySpaceTransformer.ts#L6)

## Extends

- [`BaseTransformer`](BaseTransformer.md)\<[`PussySpaceExecArgs`](../interfaces/PussySpaceExecArgs.md), [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md) \| [`PussySpaceVideoOutput`](../interfaces/PussySpaceVideoOutput.md)\>

## Constructors

### Constructor

> **new PussySpaceTransformer**(`httpClient`, `progressManager`): `PussySpaceTransformer`

Defined in: [packages/base/BaseTransformer.ts:8](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseTransformer.ts#L8)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`PussySpaceTransformer`

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

> **transform**(`url`, `request?`): `Promise`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\> \| [`PussySpaceVideoOutput`](../interfaces/PussySpaceVideoOutput.md)\>

Defined in: [packages/providers/pussyspace/PussySpaceTransformer.ts:9](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/pussyspace/PussySpaceTransformer.ts#L9)

#### Parameters

##### url

`string`

##### request?

[`PussySpaceExecArgs`](../interfaces/PussySpaceExecArgs.md)

#### Returns

`Promise`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\> \| [`PussySpaceVideoOutput`](../interfaces/PussySpaceVideoOutput.md)\>

#### Overrides

[`BaseTransformer`](BaseTransformer.md).[`transform`](BaseTransformer.md#transform)
