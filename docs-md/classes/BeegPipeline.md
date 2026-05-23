[**downflux**](../README.md)

***

[downflux](../README.md) / BeegPipeline

# Class: BeegPipeline

Defined in: [packages/providers/beeg/BeegPipeline.ts:12](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/beeg/BeegPipeline.ts#L12)

Builds downloadable Beeg pipeline items from normalized metadata.

## Remarks

Pipelines decide which media URLs become work items and how those items are identified on disk.

## Extends

- [`BasePipeline`](BasePipeline.md)\<[`BeegExecArgs`](../interfaces/BeegExecArgs.md), [`BeegOutput`](../interfaces/BeegOutput.md)\>

## Constructors

### Constructor

> **new BeegPipeline**(`fileManager`): `BeegPipeline`

Defined in: [packages/base/BasePipeline.ts:28](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BasePipeline.ts#L28)

#### Parameters

##### fileManager

[`FileManager`](FileManager.md)

#### Returns

`BeegPipeline`

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`constructor`](BasePipeline.md#constructor)

## Properties

### pathBuilder

> `protected` `readonly` **pathBuilder**: [`PathBuilder`](PathBuilder.md)

Defined in: [packages/base/BasePipeline.ts:25](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BasePipeline.ts#L25)

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`pathBuilder`](BasePipeline.md#pathbuilder)

***

### helper

> `protected` `readonly` **helper**: [`Helper`](Helper.md)

Defined in: [packages/base/BasePipeline.ts:26](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BasePipeline.ts#L26)

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`helper`](BasePipeline.md#helper)

***

### fileManager

> `protected` **fileManager**: [`FileManager`](FileManager.md)

Defined in: [packages/base/BasePipeline.ts:28](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BasePipeline.ts#L28)

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`fileManager`](BasePipeline.md#filemanager)

## Methods

### build()

> **build**(`metadata`, `request`): [`PipelineItem`](../interfaces/PipelineItem.md)[]

Defined in: [packages/base/BasePipeline.ts:37](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BasePipeline.ts#L37)

Builds filtered, deduplicated pipeline items for a single metadata result.

#### Parameters

##### metadata

[`BeegOutput`](../interfaces/BeegOutput.md)

Extracted provider metadata.

##### request

[`BeegExecArgs`](../interfaces/BeegExecArgs.md)

Execution request with filters and provider options.

#### Returns

[`PipelineItem`](../interfaces/PipelineItem.md)[]

Downloadable pipeline items.

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`build`](BasePipeline.md#build)

***

### filterByExt()

> `protected` **filterByExt**(`request`, `pipelineItems`): [`PipelineItem`](../interfaces/PipelineItem.md)[]

Defined in: [packages/base/BasePipeline.ts:62](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BasePipeline.ts#L62)

#### Parameters

##### request

[`BeegExecArgs`](../interfaces/BeegExecArgs.md)

##### pipelineItems

[`PipelineItem`](../interfaces/PipelineItem.md)[]

#### Returns

[`PipelineItem`](../interfaces/PipelineItem.md)[]

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`filterByExt`](BasePipeline.md#filterbyext)

***

### sliceByMaxDownloads()

> `protected` **sliceByMaxDownloads**(`request`, `items`): [`PipelineItem`](../interfaces/PipelineItem.md)[]

Defined in: [packages/base/BasePipeline.ts:68](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BasePipeline.ts#L68)

#### Parameters

##### request

[`BeegExecArgs`](../interfaces/BeegExecArgs.md)

##### items

[`PipelineItem`](../interfaces/PipelineItem.md)[]

#### Returns

[`PipelineItem`](../interfaces/PipelineItem.md)[]

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`sliceByMaxDownloads`](BasePipeline.md#slicebymaxdownloads)

***

### createMappings()

> `protected` **createMappings**\<`T`\>(`elements`, `handler`): [`PipelineMapping`](../type-aliases/PipelineMapping.md)\<`T`\>

Defined in: [packages/base/BasePipeline.ts:84](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BasePipeline.ts#L84)

#### Type Parameters

##### T

`T`

#### Parameters

##### elements

`T`[] \| `undefined`

##### handler

[`PipelineExtractionHandler`](../interfaces/PipelineExtractionHandler.md)\<`T`\>

#### Returns

[`PipelineMapping`](../type-aliases/PipelineMapping.md)\<`T`\>

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`createMappings`](BasePipeline.md#createmappings)

***

### extract()

> `protected` **extract**(`request`, `metadata`): [`PipelineExtractedItem`](../interfaces/PipelineExtractedItem.md)[]

Defined in: [packages/base/BasePipeline.ts:108](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BasePipeline.ts#L108)

#### Parameters

##### request

[`BeegExecArgs`](../interfaces/BeegExecArgs.md)

##### metadata

[`BeegOutput`](../interfaces/BeegOutput.md)

#### Returns

[`PipelineExtractedItem`](../interfaces/PipelineExtractedItem.md)[]

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`extract`](BasePipeline.md#extract)

***

### filterByQuality()

> `protected` **filterByQuality**\<`T`, `TEnum`\>(`items?`, `options`): `T`[]

Defined in: [packages/base/BasePipeline.ts:125](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BasePipeline.ts#L125)

Applies provider quality filtering without changing source order.

#### Type Parameters

##### T

`T`

##### TEnum

`TEnum` = `string` \| `number`

#### Parameters

##### items?

`T`[] = `[]`

Source records to filter.

##### options

Quality selector and requested quality.

###### allowedQuality?

`TEnum`

###### getQuality

(`item`) => `TEnum`

#### Returns

`T`[]

Sources matching the requested quality, or all sources when no quality is requested.

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`filterByQuality`](BasePipeline.md#filterbyquality)

***

### uniquePipelines()

> `protected` **uniquePipelines**(`pipelines`): [`PipelineItem`](../interfaces/PipelineItem.md)[]

Defined in: [packages/base/BasePipeline.ts:139](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BasePipeline.ts#L139)

#### Parameters

##### pipelines

[`PipelineItem`](../interfaces/PipelineItem.md)[]

#### Returns

[`PipelineItem`](../interfaces/PipelineItem.md)[]

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`uniquePipelines`](BasePipeline.md#uniquepipelines)

***

### extractedItems()

> `protected` **extractedItems**\<`T`\>(`targets`, `handlers`, `elements?`): `never`[] \| `undefined`

Defined in: [packages/base/BasePipeline.ts:151](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BasePipeline.ts#L151)

#### Type Parameters

##### T

`T`

#### Parameters

##### targets

[`PipelineExtractedItem`](../interfaces/PipelineExtractedItem.md)[]

##### handlers

[`PipelineExtractionHandler`](../interfaces/PipelineExtractionHandler.md)\<`T`\>

##### elements?

`T`[]

#### Returns

`never`[] \| `undefined`

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`extractedItems`](BasePipeline.md#extracteditems)

***

### buildIdentifier()

> `protected` **buildIdentifier**(`ctx`): `string`

Defined in: [packages/providers/beeg/BeegPipeline.ts:13](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/beeg/BeegPipeline.ts#L13)

Builds the storage identifier used as the logical output path.

#### Parameters

##### ctx

[`IdentifierContext`](../interfaces/IdentifierContext.md)\<[`BeegOutput`](../interfaces/BeegOutput.md)\>

Media item context and source metadata.

#### Returns

`string`

Stable identifier for storage and progress output.

#### Overrides

[`BasePipeline`](BasePipeline.md).[`buildIdentifier`](BasePipeline.md#buildidentifier)

***

### mappings()

> `protected` **mappings**(`metadata`, `request`): [`PipelineMapping`](../type-aliases/PipelineMapping.md)\<`any`\>[]

Defined in: [packages/providers/beeg/BeegPipeline.ts:30](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/beeg/BeegPipeline.ts#L30)

Defines which metadata collections should become pipeline items.

#### Parameters

##### metadata

[`BeegOutput`](../interfaces/BeegOutput.md)

Extracted provider metadata.

##### request

[`BeegExecArgs`](../interfaces/BeegExecArgs.md)

Execution request with provider filters.

#### Returns

[`PipelineMapping`](../type-aliases/PipelineMapping.md)\<`any`\>[]

Mapping definitions used by `extract`.

#### Overrides

[`BasePipeline`](BasePipeline.md).[`mappings`](BasePipeline.md#mappings)
