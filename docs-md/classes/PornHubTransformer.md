[**downflux**](../README.md)

***

[downflux](../README.md) / PornHubTransformer

# Class: PornHubTransformer

Defined in: [packages/providers/pornhub/PornHubTransformer.ts:6](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/pornhub/PornHubTransformer.ts#L6)

## Extends

- [`BaseTransformer`](BaseTransformer.md)\<[`PornHubExecArgs`](../interfaces/PornHubExecArgs.md), [`PornHubVideoOutput`](../interfaces/PornHubVideoOutput.md) \| [`PornHubVideosOutput`](../interfaces/PornHubVideosOutput.md) \| [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md) \| [`PornHubChannelsOutput`](../interfaces/PornHubChannelsOutput.md)[]\>

## Constructors

### Constructor

> **new PornHubTransformer**(`httpClient`, `progressManager`): `PornHubTransformer`

Defined in: [packages/base/BaseTransformer.ts:8](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseTransformer.ts#L8)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`PornHubTransformer`

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

> **transform**(`url`, `request`): `Promise`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\> \| [`PornHubVideoOutput`](../interfaces/PornHubVideoOutput.md) \| [`PornHubVideosOutput`](../interfaces/PornHubVideosOutput.md) \| [`PornHubChannelsOutput`](../interfaces/PornHubChannelsOutput.md)[]\>

Defined in: [packages/providers/pornhub/PornHubTransformer.ts:10](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/pornhub/PornHubTransformer.ts#L10)

#### Parameters

##### url

`string`

##### request

[`PornHubExecArgs`](../interfaces/PornHubExecArgs.md)

#### Returns

`Promise`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\> \| [`PornHubVideoOutput`](../interfaces/PornHubVideoOutput.md) \| [`PornHubVideosOutput`](../interfaces/PornHubVideosOutput.md) \| [`PornHubChannelsOutput`](../interfaces/PornHubChannelsOutput.md)[]\>

#### Overrides

[`BaseTransformer`](BaseTransformer.md).[`transform`](BaseTransformer.md#transform)
