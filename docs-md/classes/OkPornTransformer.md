[**downflux**](../README.md)

***

[downflux](../README.md) / OkPornTransformer

# Class: OkPornTransformer

Defined in: [transformers/OkPornTransformer.ts:19](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/transformers/OkPornTransformer.ts#L19)

## Extends

- [`BaseTransformer`](BaseTransformer.md)\<[`OkPornExecArgs`](../interfaces/OkPornExecArgs.md), [`OkPornAlbumOutput`](../interfaces/OkPornAlbumOutput.md) \| [`OkPornVideoOutput`](../interfaces/OkPornVideoOutput.md) \| [`OkPornModelOutput`](../interfaces/OkPornModelOutput.md) \| [`OkPornTagOutput`](../interfaces/OkPornTagOutput.md) \| [`OkPornChannelOutput`](../interfaces/OkPornChannelOutput.md) \| [`OkPornModelVideoIdsOutput`](../interfaces/OkPornModelVideoIdsOutput.md) \| [`DefaultExtractorResult`](../interfaces/DefaultExtractorResult.md)\>

## Constructors

### Constructor

> **new OkPornTransformer**(`htmlParserService`, `httpFetcherService`): `OkPornTransformer`

Defined in: [transformers/BaseTransformer.ts:6](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/transformers/BaseTransformer.ts#L6)

#### Parameters

##### htmlParserService

`HtmlParserService`

##### httpFetcherService

`HttpFetcherService`

#### Returns

`OkPornTransformer`

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`constructor`](BaseTransformer.md#constructor)

## Properties

### htmlParserService

> `protected` `readonly` **htmlParserService**: `HtmlParserService`

Defined in: [transformers/BaseTransformer.ts:7](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/transformers/BaseTransformer.ts#L7)

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`htmlParserService`](BaseTransformer.md#htmlparserservice)

***

### httpFetcherService

> `protected` `readonly` **httpFetcherService**: `HttpFetcherService`

Defined in: [transformers/BaseTransformer.ts:8](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/transformers/BaseTransformer.ts#L8)

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`httpFetcherService`](BaseTransformer.md#httpfetcherservice)

## Methods

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

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`defaultParse`](BaseTransformer.md#defaultparse)

***

### emitExtractProgress()

> `protected` **emitExtractProgress**(`request`, `status`, `target`): `void`

Defined in: [transformers/BaseTransformer.ts:50](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/transformers/BaseTransformer.ts#L50)

#### Parameters

##### request

[`OkPornExecArgs`](../interfaces/OkPornExecArgs.md) \| `undefined`

##### status

`"extracting"` \| `"extracted"`

##### target

`string`

#### Returns

`void`

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`emitExtractProgress`](BaseTransformer.md#emitextractprogress)

***

### transform()

> **transform**(`url`, `request?`): `Promise`\<[`DefaultExtractorResult`](../interfaces/DefaultExtractorResult.md) \| [`OkPornAlbumOutput`](../interfaces/OkPornAlbumOutput.md) \| [`OkPornChannelOutput`](../interfaces/OkPornChannelOutput.md) \| [`OkPornModelOutput`](../interfaces/OkPornModelOutput.md) \| [`OkPornModelVideoIdsOutput`](../interfaces/OkPornModelVideoIdsOutput.md) \| [`OkPornVideoOutput`](../interfaces/OkPornVideoOutput.md) \| [`OkPornTagOutput`](../interfaces/OkPornTagOutput.md)\>

Defined in: [transformers/OkPornTransformer.ts:31](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/transformers/OkPornTransformer.ts#L31)

#### Parameters

##### url

`string`

##### request?

[`OkPornExecArgs`](../interfaces/OkPornExecArgs.md)

#### Returns

`Promise`\<[`DefaultExtractorResult`](../interfaces/DefaultExtractorResult.md) \| [`OkPornAlbumOutput`](../interfaces/OkPornAlbumOutput.md) \| [`OkPornChannelOutput`](../interfaces/OkPornChannelOutput.md) \| [`OkPornModelOutput`](../interfaces/OkPornModelOutput.md) \| [`OkPornModelVideoIdsOutput`](../interfaces/OkPornModelVideoIdsOutput.md) \| [`OkPornVideoOutput`](../interfaces/OkPornVideoOutput.md) \| [`OkPornTagOutput`](../interfaces/OkPornTagOutput.md)\>

#### Overrides

[`BaseTransformer`](BaseTransformer.md).[`transform`](BaseTransformer.md#transform)
