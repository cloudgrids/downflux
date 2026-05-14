[**downflux**](../README.md)

***

[downflux](../README.md) / PathBuilder

# Class: PathBuilder

Defined in: [packages/storage/PathBuilder.ts:3](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/storage/PathBuilder.ts#L3)

## Constructors

### Constructor

> **new PathBuilder**(): `PathBuilder`

#### Returns

`PathBuilder`

## Methods

### buildOutputPath()

> **buildOutputPath**(`basePath`, `filename`, `identifier?`): `string`

Defined in: [packages/storage/PathBuilder.ts:4](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/storage/PathBuilder.ts#L4)

#### Parameters

##### basePath

`string`

##### filename

`string`

##### identifier?

`string`

#### Returns

`string`

***

### buildDirectoryPath()

> **buildDirectoryPath**(`filename`, `identifier?`): `string`

Defined in: [packages/storage/PathBuilder.ts:12](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/storage/PathBuilder.ts#L12)

#### Parameters

##### filename

`string`

##### identifier?

`string`

#### Returns

`string`

***

### join()

> **join**(...`segments`): `string`

Defined in: [packages/storage/PathBuilder.ts:18](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/storage/PathBuilder.ts#L18)

#### Parameters

##### segments

...`string`[]

#### Returns

`string`

***

### spaceNormalizer()

> **spaceNormalizer**(`input?`): `string`

Defined in: [packages/storage/PathBuilder.ts:22](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/storage/PathBuilder.ts#L22)

#### Parameters

##### input?

`string` = `'unknown'`

#### Returns

`string`
