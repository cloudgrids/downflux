[**downflux**](../README.md)

***

[downflux](../README.md) / TransformerRegistry

# Class: TransformerRegistry

Defined in: [packages/core/registries/TransformerRegistry.ts:49](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/core/registries/TransformerRegistry.ts#L49)

## Constructors

### Constructor

> **new TransformerRegistry**(`httpClient`, `progressManager`): `TransformerRegistry`

Defined in: [packages/core/registries/TransformerRegistry.ts:52](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/core/registries/TransformerRegistry.ts#L52)

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

Defined in: [packages/core/registries/TransformerRegistry.ts:71](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/core/registries/TransformerRegistry.ts#L71)

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
