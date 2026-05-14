[**downflux**](../README.md)

***

[downflux](../README.md) / TransformerRegistry

# Class: TransformerRegistry

Defined in: [packages/core/registries/TransformerRegistry.ts:55](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/core/registries/TransformerRegistry.ts#L55)

## Constructors

### Constructor

> **new TransformerRegistry**(`httpClient`, `progressManager`): `TransformerRegistry`

Defined in: [packages/core/registries/TransformerRegistry.ts:58](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/core/registries/TransformerRegistry.ts#L58)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`TransformerRegistry`

## Methods

### transform()

> **transform**\<`TArgs`, `TResult`\>(`url`, `request`): `Promise`\<`TResult`\>

Defined in: [packages/core/registries/TransformerRegistry.ts:77](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/core/registries/TransformerRegistry.ts#L77)

#### Type Parameters

##### TArgs

`TArgs` *extends* [`ExecutionArgs`](../interfaces/ExecutionArgs.md)\<[`ExecutionShape`](../type-aliases/ExecutionShape.md)\>

##### TResult

`TResult`

#### Parameters

##### url

`string`

##### request

`TArgs`

#### Returns

`Promise`\<`TResult`\>
