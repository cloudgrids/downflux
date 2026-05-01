[**downflux**](../README.md)

***

[downflux](../README.md) / TransformerService

# Class: TransformerService

Defined in: [transformers/Transformer.ts:9](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/transformers/Transformer.ts#L9)

## Constructors

### Constructor

> **new TransformerService**(`htmlParserService`, `httpFetcherService`): `TransformerService`

Defined in: [transformers/Transformer.ts:12](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/transformers/Transformer.ts#L12)

#### Parameters

##### htmlParserService

`HtmlParserService`

##### httpFetcherService

`HttpFetcherService`

#### Returns

`TransformerService`

## Methods

### transform()

> **transform**\<`TResult`, `TArgs`\>(`url`, `request`): `Promise`\<`TResult`\>

Defined in: [transformers/Transformer.ts:23](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/transformers/Transformer.ts#L23)

#### Type Parameters

##### TResult

`TResult`

##### TArgs

`TArgs` *extends* [`ExecutionArgs`](../interfaces/ExecutionArgs.md)

#### Parameters

##### url

`string`

##### request

`TArgs`

#### Returns

`Promise`\<`TResult`\>
