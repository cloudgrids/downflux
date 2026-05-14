[**downflux**](../README.md)

***

[downflux](../README.md) / PornIdTransformer

# Class: PornIdTransformer

Defined in: [packages/providers/pornid/PornIdTransformer.ts:6](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/pornid/PornIdTransformer.ts#L6)

## Extends

- [`BaseTransformer`](BaseTransformer.md)\<[`PornIdExecArgs`](../interfaces/PornIdExecArgs.md), [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md) \| [`PornIdVideoOutput`](../interfaces/PornIdVideoOutput.md)\>

## Constructors

### Constructor

> **new PornIdTransformer**(`httpClient`, `progressManager`): `PornIdTransformer`

Defined in: [packages/base/BaseTransformer.ts:8](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseTransformer.ts#L8)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`PornIdTransformer`

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

> **transform**(`url`, `request?`): `Promise`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\> \| [`PornIdVideoOutput`](../interfaces/PornIdVideoOutput.md)\>

Defined in: [packages/providers/pornid/PornIdTransformer.ts:7](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/pornid/PornIdTransformer.ts#L7)

#### Parameters

##### url

`string`

##### request?

[`PornIdExecArgs`](../interfaces/PornIdExecArgs.md)

#### Returns

`Promise`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\> \| [`PornIdVideoOutput`](../interfaces/PornIdVideoOutput.md)\>

#### Overrides

[`BaseTransformer`](BaseTransformer.md).[`transform`](BaseTransformer.md#transform)
