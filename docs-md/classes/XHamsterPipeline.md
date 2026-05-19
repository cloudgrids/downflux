[**downflux**](../README.md)

***

[downflux](../README.md) / XHamsterPipeline

# Class: XHamsterPipeline

Defined in: [packages/providers/xhamster/XHamsterPipeline.ts:12](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/xhamster/XHamsterPipeline.ts#L12)

Builds downloadable XHamster pipeline items from normalized metadata.

## Remarks

Pipelines decide which media URLs become work items and how those items are identified on disk.

## Extends

- [`BasePipeline`](BasePipeline.md)\<[`XHamsterExecArgs`](../interfaces/XHamsterExecArgs.md), [`XHamsterOutput`](../interfaces/XHamsterOutput.md)\>

## Constructors

### Constructor

> **new XHamsterPipeline**(`fileManager`): `XHamsterPipeline`

Defined in: [packages/base/BasePipeline.ts:28](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L28)

#### Parameters

##### fileManager

[`FileManager`](FileManager.md)

#### Returns

`XHamsterPipeline`

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`constructor`](BasePipeline.md#constructor)

## Properties

### pathBuilder

> `protected` `readonly` **pathBuilder**: [`PathBuilder`](PathBuilder.md)

Defined in: [packages/base/BasePipeline.ts:25](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L25)

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`pathBuilder`](BasePipeline.md#pathbuilder)

***

### helper

> `protected` `readonly` **helper**: [`Helper`](Helper.md)

Defined in: [packages/base/BasePipeline.ts:26](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L26)

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`helper`](BasePipeline.md#helper)

***

### fileManager

> `protected` **fileManager**: [`FileManager`](FileManager.md)

Defined in: [packages/base/BasePipeline.ts:28](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L28)

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`fileManager`](BasePipeline.md#filemanager)

## Methods

### build()

> **build**(`metadata`, `request`): [`PipelineItem`](../interfaces/PipelineItem.md)[]

Defined in: [packages/base/BasePipeline.ts:37](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L37)

Builds filtered, deduplicated pipeline items for a single metadata result.

#### Parameters

##### metadata

[`XHamsterOutput`](../interfaces/XHamsterOutput.md)

Extracted provider metadata.

##### request

[`XHamsterExecArgs`](../interfaces/XHamsterExecArgs.md)

Execution request with filters and provider options.

#### Returns

[`PipelineItem`](../interfaces/PipelineItem.md)[]

Downloadable pipeline items.

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`build`](BasePipeline.md#build)

***

### filterByExt()

> `protected` **filterByExt**(`request`, `pipelineItems`): [`PipelineItem`](../interfaces/PipelineItem.md)[]

Defined in: [packages/base/BasePipeline.ts:62](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L62)

#### Parameters

##### request

[`XHamsterExecArgs`](../interfaces/XHamsterExecArgs.md)

##### pipelineItems

[`PipelineItem`](../interfaces/PipelineItem.md)[]

#### Returns

[`PipelineItem`](../interfaces/PipelineItem.md)[]

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`filterByExt`](BasePipeline.md#filterbyext)

***

### sliceByMaxDownloads()

> `protected` **sliceByMaxDownloads**(`request`, `items`): [`PipelineItem`](../interfaces/PipelineItem.md)[]

Defined in: [packages/base/BasePipeline.ts:68](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L68)

#### Parameters

##### request

[`XHamsterExecArgs`](../interfaces/XHamsterExecArgs.md)

##### items

[`PipelineItem`](../interfaces/PipelineItem.md)[]

#### Returns

[`PipelineItem`](../interfaces/PipelineItem.md)[]

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`sliceByMaxDownloads`](BasePipeline.md#slicebymaxdownloads)

***

### createMappings()

> `protected` **createMappings**\<`T`\>(`elements`, `handler`): [`PipelineMapping`](../type-aliases/PipelineMapping.md)\<`T`\>

Defined in: [packages/base/BasePipeline.ts:84](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L84)

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

Defined in: [packages/base/BasePipeline.ts:106](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L106)

#### Parameters

##### request

[`XHamsterExecArgs`](../interfaces/XHamsterExecArgs.md)

##### metadata

[`XHamsterOutput`](../interfaces/XHamsterOutput.md)

#### Returns

[`PipelineExtractedItem`](../interfaces/PipelineExtractedItem.md)[]

#### Inherited from

[`BasePipeline`](BasePipeline.md).[`extract`](BasePipeline.md#extract)

***

### filterByQuality()

> `protected` **filterByQuality**\<`T`, `TEnum`\>(`items?`, `options`): `T`[]

Defined in: [packages/base/BasePipeline.ts:123](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L123)

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

Defined in: [packages/base/BasePipeline.ts:137](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L137)

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

Defined in: [packages/base/BasePipeline.ts:149](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L149)

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

Defined in: [packages/providers/xhamster/XHamsterPipeline.ts:13](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/xhamster/XHamsterPipeline.ts#L13)

Builds the storage identifier used as the logical output path.

#### Parameters

##### ctx

[`IdentifierContext`](../interfaces/IdentifierContext.md)\<[`XHamsterOutput`](../interfaces/XHamsterOutput.md)\>

Media item context and source metadata.

#### Returns

`string`

Stable identifier for storage and progress output.

#### Overrides

[`BasePipeline`](BasePipeline.md).[`buildIdentifier`](BasePipeline.md#buildidentifier)

***

### mappings()

> `protected` **mappings**(`metadata`, `request`): [`PipelineMappings`](../type-aliases/PipelineMappings.md)

Defined in: [packages/providers/xhamster/XHamsterPipeline.ts:29](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/xhamster/XHamsterPipeline.ts#L29)

Defines which metadata collections should become pipeline items.

#### Parameters

##### metadata

[`XHamsterOutput`](../interfaces/XHamsterOutput.md)

Extracted provider metadata.

##### request

[`XHamsterExecArgs`](../interfaces/XHamsterExecArgs.md)

Execution request with provider filters.

#### Returns

[`PipelineMappings`](../type-aliases/PipelineMappings.md)

Mapping definitions used by `extract`.

#### Overrides

[`BasePipeline`](BasePipeline.md).[`mappings`](BasePipeline.md#mappings)
