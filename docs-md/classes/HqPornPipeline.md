[**downflux**](../README.md)

***

[downflux](../README.md) / HqPornPipeline

# Class: HqPornPipeline

Defined in: [packages/providers/hqporn/HqPornPipeline.ts:6](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/hqporn/HqPornPipeline.ts#L6)

## Extends

- [`BasePipeline`](BasePipeline.md)\<[`HqPornExecArgs`](../interfaces/HqPornExecArgs.md), [`HqPornOutput`](../interfaces/HqPornOutput.md)\>

## Constructors

### Constructor

> **new HqPornPipeline**(`fileManager`): `HqPornPipeline`

Defined in: [packages/base/BasePipeline.ts:8](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BasePipeline.ts#L8)

#### Parameters

##### fileManager

[`FileManager`](FileManager.md)

#### Returns

`HqPornPipeline`

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

[`HqPornExecArgs`](../interfaces/HqPornExecArgs.md)

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

[`HqPornExecArgs`](../interfaces/HqPornExecArgs.md)

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

Defined in: [packages/providers/hqporn/HqPornPipeline.ts:7](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/hqporn/HqPornPipeline.ts#L7)

#### Parameters

##### metadata

[`HqPornOutput`](../interfaces/HqPornOutput.md)

##### request

[`HqPornExecArgs`](../interfaces/HqPornExecArgs.md)

#### Returns

[`PipelineItem`](../interfaces/PipelineItem.md)[]

#### Overrides

[`BasePipeline`](BasePipeline.md).[`build`](BasePipeline.md#build)

***

### buildIdentifier()

> `protected` **buildIdentifier**(`ctx`): `string`

Defined in: [packages/providers/hqporn/HqPornPipeline.ts:31](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/hqporn/HqPornPipeline.ts#L31)

#### Parameters

##### ctx

[`IdentifierContext`](../interfaces/IdentifierContext.md)\<[`HqPornOutput`](../interfaces/HqPornOutput.md)\>

#### Returns

`string`

#### Overrides

[`BasePipeline`](BasePipeline.md).[`buildIdentifier`](BasePipeline.md#buildidentifier)

***

### extract()

> `protected` **extract**(`request`, `metadata`): [`PipelineExtractedItem`](../interfaces/PipelineExtractedItem.md)[]

Defined in: [packages/providers/hqporn/HqPornPipeline.ts:47](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/hqporn/HqPornPipeline.ts#L47)

#### Parameters

##### request

[`HqPornExecArgs`](../interfaces/HqPornExecArgs.md)

##### metadata

[`HqPornOutput`](../interfaces/HqPornOutput.md)

#### Returns

[`PipelineExtractedItem`](../interfaces/PipelineExtractedItem.md)[]

#### Overrides

[`BasePipeline`](BasePipeline.md).[`extract`](BasePipeline.md#extract)
