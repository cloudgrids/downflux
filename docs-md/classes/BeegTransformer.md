[**downflux**](../README.md)

***

[downflux](../README.md) / BeegTransformer

# Class: BeegTransformer

Defined in: [packages/providers/beeg/BeegTransformer.ts:13](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/beeg/BeegTransformer.ts#L13)

`BeegTransformer`
Transforms raw data fetched from the Beeg API into a structured format suitable for video downloading.
The transformer is designed to work with the Beeg API's response structure and may need adjustments if the API changes.
Provides all quality videos along with posters

## Extends

- [`BaseTransformer`](BaseTransformer.md)\<[`BeegExecArgs`](../interfaces/BeegExecArgs.md), [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md) \| [`BeegVideoOutput`](../interfaces/BeegVideoOutput.md)\>

## Constructors

### Constructor

> **new BeegTransformer**(`httpClient`, `progressManager`): `BeegTransformer`

Defined in: [packages/base/BaseTransformer.ts:8](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseTransformer.ts#L8)

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

> **transform**(`url`, `request?`): `Promise`\<[`BeegVideoOutput`](../interfaces/BeegVideoOutput.md) \| [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\>\>

Defined in: [packages/providers/beeg/BeegTransformer.ts:18](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/beeg/BeegTransformer.ts#L18)

#### Parameters

##### url

`string`

##### request?

[`BeegExecArgs`](../interfaces/BeegExecArgs.md)

#### Returns

`Promise`\<[`BeegVideoOutput`](../interfaces/BeegVideoOutput.md) \| [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\>\>

#### Overrides

[`BaseTransformer`](BaseTransformer.md).[`transform`](BaseTransformer.md#transform)
