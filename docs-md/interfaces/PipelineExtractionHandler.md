[**downflux**](../README.md)

***

[downflux](../README.md) / PipelineExtractionHandler

# Interface: PipelineExtractionHandler\<T\>

Defined in: [packages/contracts/PipelineContracts.ts:33](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/PipelineContracts.ts#L33)

## Type Parameters

### T

`T`

## Methods

### getUrl()

> **getUrl**(`item`): `string`

Defined in: [packages/contracts/PipelineContracts.ts:34](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/PipelineContracts.ts#L34)

#### Parameters

##### item

`T`

#### Returns

`string`

***

### getMedia()

> **getMedia**(`item`): [`MediaType`](../enumerations/MediaType.md)

Defined in: [packages/contracts/PipelineContracts.ts:35](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/PipelineContracts.ts#L35)

#### Parameters

##### item

`T`

#### Returns

[`MediaType`](../enumerations/MediaType.md)

***

### getMime()?

> `optional` **getMime**(`item`): `string`

Defined in: [packages/contracts/PipelineContracts.ts:36](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/PipelineContracts.ts#L36)

#### Parameters

##### item

`T`

#### Returns

`string`

***

### getExt()?

> `optional` **getExt**(`item`): [`AllowedExtension`](../type-aliases/AllowedExtension.md)

Defined in: [packages/contracts/PipelineContracts.ts:37](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/PipelineContracts.ts#L37)

#### Parameters

##### item

`T`

#### Returns

[`AllowedExtension`](../type-aliases/AllowedExtension.md)

***

### getId()?

> `optional` **getId**(`item`): `string`

Defined in: [packages/contracts/PipelineContracts.ts:38](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/PipelineContracts.ts#L38)

#### Parameters

##### item

`T`

#### Returns

`string`

***

### getSecondaryId()?

> `optional` **getSecondaryId**(`item`): `string`

Defined in: [packages/contracts/PipelineContracts.ts:39](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/PipelineContracts.ts#L39)

#### Parameters

##### item

`T`

#### Returns

`string`

***

### getUsername()?

> `optional` **getUsername**(`item`): `string`

Defined in: [packages/contracts/PipelineContracts.ts:40](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/PipelineContracts.ts#L40)

#### Parameters

##### item

`T`

#### Returns

`string`
