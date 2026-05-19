[**downflux**](../README.md)

***

[downflux](../README.md) / UniqueVideosProps

# Interface: UniqueVideosProps\<T\>

Defined in: [packages/base/BaseTransformer.ts:12](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseTransformer.ts#L12)

Selectors used to normalize provider-specific video records.

## Type Parameters

### T

`T`

Provider-specific video source record type.

## Properties

### getUrl

> **getUrl**: (`video`) => `string`

Defined in: [packages/base/BaseTransformer.ts:13](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseTransformer.ts#L13)

#### Parameters

##### video

`T`

#### Returns

`string`

***

### getQuality

> **getQuality**: (`video`) => [`VideoQuality`](../enumerations/VideoQuality.md)

Defined in: [packages/base/BaseTransformer.ts:14](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseTransformer.ts#L14)

#### Parameters

##### video

`T`

#### Returns

[`VideoQuality`](../enumerations/VideoQuality.md)
