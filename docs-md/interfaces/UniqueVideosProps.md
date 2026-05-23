[**downflux**](../README.md)

***

[downflux](../README.md) / UniqueVideosProps

# Interface: UniqueVideosProps\<T\>

Defined in: [packages/base/BaseTransformer.ts:20](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseTransformer.ts#L20)

Selectors used to normalize provider-specific video records.

## Type Parameters

### T

`T`

Provider-specific video source record type.

## Properties

### getUrl

> **getUrl**: (`video`) => `string`

Defined in: [packages/base/BaseTransformer.ts:21](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseTransformer.ts#L21)

#### Parameters

##### video

`T`

#### Returns

`string`

***

### getQuality

> **getQuality**: (`video`) => [`VideoQuality`](../enumerations/VideoQuality.md)

Defined in: [packages/base/BaseTransformer.ts:22](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseTransformer.ts#L22)

#### Parameters

##### video

`T`

#### Returns

[`VideoQuality`](../enumerations/VideoQuality.md)
