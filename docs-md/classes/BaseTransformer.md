[**downflux**](../README.md)

***

[downflux](../README.md) / BaseTransformer

# Abstract Class: BaseTransformer\<TExec, TResult\>

Defined in: [transformers/BaseTransformer.ts:5](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/transformers/BaseTransformer.ts#L5)

## Extended by

- [`DefaultTransformer`](DefaultTransformer.md)
- [`OkPornTransformer`](OkPornTransformer.md)
- [`WallHavenTransformer`](WallHavenTransformer.md)

## Type Parameters

### TExec

`TExec` *extends* [`ExecutionArgs`](../interfaces/ExecutionArgs.md)

### TResult

`TResult` = [`DefaultExtractorResult`](../interfaces/DefaultExtractorResult.md)

## Constructors

### Constructor

> **new BaseTransformer**\<`TExec`, `TResult`\>(`htmlParserService`, `httpFetcherService`): `BaseTransformer`\<`TExec`, `TResult`\>

Defined in: [transformers/BaseTransformer.ts:6](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/transformers/BaseTransformer.ts#L6)

#### Parameters

##### htmlParserService

`HtmlParserService`

##### httpFetcherService

`HttpFetcherService`

#### Returns

`BaseTransformer`\<`TExec`, `TResult`\>

## Properties

### htmlParserService

> `protected` `readonly` **htmlParserService**: `HtmlParserService`

Defined in: [transformers/BaseTransformer.ts:7](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/transformers/BaseTransformer.ts#L7)

***

### httpFetcherService

> `protected` `readonly` **httpFetcherService**: `HttpFetcherService`

Defined in: [transformers/BaseTransformer.ts:8](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/transformers/BaseTransformer.ts#L8)

## Methods

### transform()

> **transform**(`url`, `request?`): `Promise`\<`TResult`\>

Defined in: [transformers/BaseTransformer.ts:15](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/transformers/BaseTransformer.ts#L15)

#### Parameters

##### url

`string`

##### request?

`TExec`

#### Returns

`Promise`\<`TResult`\>

***

### defaultParse()

> `protected` **defaultParse**(`html`, `baseUrl`): [`DefaultExtractorResult`](../interfaces/DefaultExtractorResult.md)

Defined in: [transformers/BaseTransformer.ts:37](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/transformers/BaseTransformer.ts#L37)

#### Parameters

##### html

`string`

##### baseUrl

`string`

#### Returns

[`DefaultExtractorResult`](../interfaces/DefaultExtractorResult.md)

***

### emitExtractProgress()

> `protected` **emitExtractProgress**(`request`, `status`, `target`): `void`

Defined in: [transformers/BaseTransformer.ts:50](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/transformers/BaseTransformer.ts#L50)

#### Parameters

##### request

`TExec` \| `undefined`

##### status

`"extracting"` \| `"extracted"`

##### target

`string`

#### Returns

`void`
