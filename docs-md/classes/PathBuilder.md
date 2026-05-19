[**downflux**](../README.md)

***

[downflux](../README.md) / PathBuilder

# Class: PathBuilder

Defined in: [packages/storage/PathBuilder.ts:10](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/storage/PathBuilder.ts#L10)

Small helper for provider output paths and identifiers.

## Remarks

Path building is centralized so providers can describe logical media groups
without duplicating path separators, normalization, or filename conventions.

## Constructors

### Constructor

> **new PathBuilder**(): `PathBuilder`

#### Returns

`PathBuilder`

## Methods

### buildOutputPath()

> **buildOutputPath**(`basePath`, `filename`, `identifier?`): `string`

Defined in: [packages/storage/PathBuilder.ts:11](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/storage/PathBuilder.ts#L11)

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

Defined in: [packages/storage/PathBuilder.ts:19](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/storage/PathBuilder.ts#L19)

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

Defined in: [packages/storage/PathBuilder.ts:25](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/storage/PathBuilder.ts#L25)

#### Parameters

##### segments

...`string`[]

#### Returns

`string`

***

### spaceNormalizer()

> **spaceNormalizer**(`input?`): `string`

Defined in: [packages/storage/PathBuilder.ts:29](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/storage/PathBuilder.ts#L29)

#### Parameters

##### input?

`string` = `'unknown'`

#### Returns

`string`
