[**downflux**](../README.md)

***

[downflux](../README.md) / PornsOkPipeline

# Class: PornsOkPipeline

Defined in: [packages/providers/pornsok/PornsOkPipeline.ts:6](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/pornsok/PornsOkPipeline.ts#L6)

## Extends

- [`BasePipeline`](BasePipeline.md)\<[`PornsOkExecArgs`](../interfaces/PornsOkExecArgs.md), [`PornsOkOutput`](../interfaces/PornsOkOutput.md)\>

## Constructors

### Constructor

> **new PornsOkPipeline**(`fileManager`): `PornsOkPipeline`

Defined in: [packages/base/BasePipeline.ts:8](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BasePipeline.ts#L8)

#### Parameters

##### fileManager

[`FileManager`](FileManager.md)

#### Returns

`PornsOkPipeline`

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`constructor`](BasePipeline.md#constructor)

## Properties

### pathBuilder

> `protected` `readonly` **pathBuilder**: [`PathBuilder`](PathBuilder.md)

Defined in: [packages/base/BasePipeline.ts:6](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BasePipeline.ts#L6)

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`pathBuilder`](BasePipeline.md#pathbuilder)

***

### fileManager

> `protected` **fileManager**: [`FileManager`](FileManager.md)

Defined in: [packages/base/BasePipeline.ts:8](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BasePipeline.ts#L8)

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`fileManager`](BasePipeline.md#filemanager)

## Methods

### filterByExt()

> `protected` **filterByExt**(`request`, `pipelineItems`): [`PipelineItem`](../interfaces/PipelineItem.md)[]

Defined in: [packages/base/BasePipeline.ts:33](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BasePipeline.ts#L33)

#### Parameters

##### request

[`PornsOkExecArgs`](../interfaces/PornsOkExecArgs.md)

##### pipelineItems

[`PipelineItem`](../interfaces/PipelineItem.md)[]

#### Returns

[`PipelineItem`](../interfaces/PipelineItem.md)[]

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`filterByExt`](BasePipeline.md#filterbyext)

***

### sliceByMaxDownloads()

> `protected` **sliceByMaxDownloads**(`request`, `items`): [`PipelineItem`](../interfaces/PipelineItem.md)[]

Defined in: [packages/base/BasePipeline.ts:39](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BasePipeline.ts#L39)

#### Parameters

##### request

[`PornsOkExecArgs`](../interfaces/PornsOkExecArgs.md)

##### items

[`PipelineItem`](../interfaces/PipelineItem.md)[]

#### Returns

[`PipelineItem`](../interfaces/PipelineItem.md)[]

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`sliceByMaxDownloads`](BasePipeline.md#slicebymaxdownloads)

***

### filterByQuality()

> `protected` **filterByQuality**\<`T`, `TEnum`\>(`items`, `options`): `T`[]

Defined in: [packages/base/BasePipeline.ts:75](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BasePipeline.ts#L75)

#### Type Parameters

##### T

`T`

##### TEnum

`TEnum` = `string` \| `number`

#### Parameters

##### items

`T`[]

##### options

###### allowedQuality?

`TEnum`

###### getQuality

(`item`) => `TEnum`

#### Returns

`T`[]

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`filterByQuality`](BasePipeline.md#filterbyquality)

***

### build()

> **build**(`metadata`, `request`): [`PipelineItem`](../interfaces/PipelineItem.md)[]

Defined in: [packages/providers/pornsok/PornsOkPipeline.ts:7](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/pornsok/PornsOkPipeline.ts#L7)

#### Parameters

##### metadata

[`PornsOkOutput`](../interfaces/PornsOkOutput.md)

##### request

[`PornsOkExecArgs`](../interfaces/PornsOkExecArgs.md)

#### Returns

[`PipelineItem`](../interfaces/PipelineItem.md)[]

#### Overrides

[`BasePipeline`](BasePipeline.md).[`build`](BasePipeline.md#build)

***

### buildIdentifier()

> `protected` **buildIdentifier**(`ctx`): `string`

Defined in: [packages/providers/pornsok/PornsOkPipeline.ts:31](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/pornsok/PornsOkPipeline.ts#L31)

#### Parameters

##### ctx

[`IdentifierContext`](../interfaces/IdentifierContext.md)\<[`PornsOkOutput`](../interfaces/PornsOkOutput.md)\>

#### Returns

`string`

#### Overrides

[`BasePipeline`](BasePipeline.md).[`buildIdentifier`](BasePipeline.md#buildidentifier)

***

### extract()

> `protected` **extract**(`request`, `metadata`): [`PipelineExtractedItem`](../interfaces/PipelineExtractedItem.md)[]

Defined in: [packages/providers/pornsok/PornsOkPipeline.ts:52](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/pornsok/PornsOkPipeline.ts#L52)

#### Parameters

##### request

[`PornsOkExecArgs`](../interfaces/PornsOkExecArgs.md)

##### metadata

[`PornsOkOutput`](../interfaces/PornsOkOutput.md)

#### Returns

[`PipelineExtractedItem`](../interfaces/PipelineExtractedItem.md)[]

#### Overrides

[`BasePipeline`](BasePipeline.md).[`extract`](BasePipeline.md#extract)
