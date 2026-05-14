[**downflux**](../README.md)

***

[downflux](../README.md) / PornsOkTransformer

# Class: PornsOkTransformer

Defined in: [packages/providers/pornsok/PornsOkTransformer.ts:6](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/pornsok/PornsOkTransformer.ts#L6)

## Extends

- [`BaseTransformer`](BaseTransformer.md)\<[`PornsOkExecArgs`](../interfaces/PornsOkExecArgs.md), [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md) \| [`PornsOkVideoOutput`](../interfaces/PornsOkVideoOutput.md)\>

## Constructors

### Constructor

> **new PornsOkTransformer**(`httpClient`, `progressManager`): `PornsOkTransformer`

Defined in: [packages/base/BaseTransformer.ts:8](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseTransformer.ts#L8)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`PornsOkTransformer`

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

> **transform**(`url`, `request?`): `Promise`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\> \| [`PornsOkVideoOutput`](../interfaces/PornsOkVideoOutput.md)\>

Defined in: [packages/providers/pornsok/PornsOkTransformer.ts:7](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/pornsok/PornsOkTransformer.ts#L7)

#### Parameters

##### url

`string`

##### request?

[`PornsOkExecArgs`](../interfaces/PornsOkExecArgs.md)

#### Returns

`Promise`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\> \| [`PornsOkVideoOutput`](../interfaces/PornsOkVideoOutput.md)\>

#### Overrides

[`BaseTransformer`](BaseTransformer.md).[`transform`](BaseTransformer.md#transform)

***

### toVideoOutput()

> **toVideoOutput**(`metadata`): [`PornsOkVideoOutput`](../interfaces/PornsOkVideoOutput.md)

Defined in: [packages/providers/pornsok/PornsOkTransformer.ts:20](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/pornsok/PornsOkTransformer.ts#L20)

#### Parameters

##### metadata

[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`Partial`\<[`PornsOkOutput`](../interfaces/PornsOkOutput.md)\>\>

#### Returns

[`PornsOkVideoOutput`](../interfaces/PornsOkVideoOutput.md)
