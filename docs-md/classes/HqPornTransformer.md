[**downflux**](../README.md)

***

[downflux](../README.md) / HqPornTransformer

# Class: HqPornTransformer

Defined in: [packages/providers/hqporn/HqPornTransformer.ts:6](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/hqporn/HqPornTransformer.ts#L6)

## Extends

- [`BaseTransformer`](BaseTransformer.md)\<[`HqPornExecArgs`](../interfaces/HqPornExecArgs.md), [`HqPornVideoOutput`](../interfaces/HqPornVideoOutput.md) \| [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\>

## Constructors

### Constructor

> **new HqPornTransformer**(`httpClient`, `progressManager`): `HqPornTransformer`

Defined in: [packages/base/BaseTransformer.ts:8](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseTransformer.ts#L8)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`HqPornTransformer`

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

> **transform**(`url`, `request?`): `Promise`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\> \| [`HqPornVideoOutput`](../interfaces/HqPornVideoOutput.md)\>

Defined in: [packages/providers/hqporn/HqPornTransformer.ts:7](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/hqporn/HqPornTransformer.ts#L7)

#### Parameters

##### url

`string`

##### request?

[`HqPornExecArgs`](../interfaces/HqPornExecArgs.md)

#### Returns

`Promise`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\> \| [`HqPornVideoOutput`](../interfaces/HqPornVideoOutput.md)\>

#### Overrides

[`BaseTransformer`](BaseTransformer.md).[`transform`](BaseTransformer.md#transform)
