[**downflux**](../README.md)

***

[downflux](../README.md) / WallHavenTransformer

# Class: WallHavenTransformer

Defined in: [transformers/WallHavenTransformer.ts:13](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/transformers/WallHavenTransformer.ts#L13)

## Extends

- [`BaseTransformer`](BaseTransformer.md)\<[`WallHavenExecArgs`](../interfaces/WallHavenExecArgs.md), [`WallHavenWallPaperOutput`](../interfaces/WallHavenWallPaperOutput.md) \| [`WallHavenUserUploadsOutput`](../interfaces/WallHavenUserUploadsOutput.md) \| [`DefaultExtractorResult`](../interfaces/DefaultExtractorResult.md)\>

## Constructors

### Constructor

> **new WallHavenTransformer**(`htmlParserService`, `httpFetcherService`): `WallHavenTransformer`

Defined in: [transformers/BaseTransformer.ts:6](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/transformers/BaseTransformer.ts#L6)

#### Parameters

##### htmlParserService

`HtmlParserService`

##### httpFetcherService

`HttpFetcherService`

#### Returns

`WallHavenTransformer`

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

[`WallHavenExecArgs`](../interfaces/WallHavenExecArgs.md) \| `undefined`

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

> **transform**(`url`, `request?`): `Promise`\<[`DefaultExtractorResult`](../interfaces/DefaultExtractorResult.md) \| [`WallHavenWallPaperOutput`](../interfaces/WallHavenWallPaperOutput.md) \| [`WallHavenUserUploadsOutput`](../interfaces/WallHavenUserUploadsOutput.md)\>

Defined in: [transformers/WallHavenTransformer.ts:17](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/transformers/WallHavenTransformer.ts#L17)

#### Parameters

##### url

`string`

##### request?

[`WallHavenExecArgs`](../interfaces/WallHavenExecArgs.md)

#### Returns

`Promise`\<[`DefaultExtractorResult`](../interfaces/DefaultExtractorResult.md) \| [`WallHavenWallPaperOutput`](../interfaces/WallHavenWallPaperOutput.md) \| [`WallHavenUserUploadsOutput`](../interfaces/WallHavenUserUploadsOutput.md)\>

#### Overrides

[`BaseTransformer`](BaseTransformer.md).[`transform`](BaseTransformer.md#transform)
