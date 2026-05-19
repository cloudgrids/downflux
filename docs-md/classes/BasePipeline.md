[**downflux**](../README.md)

***

[downflux](../README.md) / BasePipeline

# Class: BasePipeline\<TExec, TResult\>

Defined in: [packages/base/BasePipeline.ts:24](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L24)

Converts extracted metadata into downloadable work items.

## Remarks

Pipelines exist because extraction output is descriptive, while downloads
need concrete URLs, media types, file extensions, and stable identifiers.
Provider pipelines decide which media are eligible and how files should be
grouped on disk.

## Extended by

- [`BeegPipeline`](BeegPipeline.md)
- [`BoKepPornPipeline`](BoKepPornPipeline.md)
- [`ColliderPornPipeline`](ColliderPornPipeline.md)
- [`CumLouderPipeline`](CumLouderPipeline.md)
- [`DaFreePornPipeline`](DaFreePornPipeline.md)
- [`DaNudePipeline`](DaNudePipeline.md)
- [`EpicGfsPipeline`](EpicGfsPipeline.md)
- [`EPornerPipeline`](EPornerPipeline.md)
- [`HqPornPipeline`](HqPornPipeline.md)
- [`InterracialPipeline`](InterracialPipeline.md)
- [`ItsPornPipeline`](ItsPornPipeline.md)
- [`Lesbian8Pipeline`](Lesbian8Pipeline.md)
- [`MegaTubePipeline`](MegaTubePipeline.md)
- [`MomVidsPipeline`](MomVidsPipeline.md)
- [`MyLustPipeline`](MyLustPipeline.md)
- [`OkPornPipeline`](OkPornPipeline.md)
- [`PerfectGirlsPipeline`](PerfectGirlsPipeline.md)
- [`Porn300Pipeline`](Porn300Pipeline.md)
- [`PornDoePipeline`](PornDoePipeline.md)
- [`PornHubPipeline`](PornHubPipeline.md)
- [`PornIdPipeline`](PornIdPipeline.md)
- [`PornOnePipeline`](PornOnePipeline.md)
- [`PornSevenPipeline`](PornSevenPipeline.md)
- [`PornsOkPipeline`](PornsOkPipeline.md)
- [`PussySpacePipeline`](PussySpacePipeline.md)
- [`SexVidPipeline`](SexVidPipeline.md)
- [`ShamelessPipeline`](ShamelessPipeline.md)
- [`SuperPornPipeline`](SuperPornPipeline.md)
- [`SxyPornPipeline`](SxyPornPipeline.md)
- [`TheyAreHugePipeline`](TheyAreHugePipeline.md)
- [`TnAFlixPipeline`](TnAFlixPipeline.md)
- [`TubeVSexPipeline`](TubeVSexPipeline.md)
- [`WallHavenPipeline`](WallHavenPipeline.md)
- [`XCafePipeline`](XCafePipeline.md)
- [`XDeguPipeline`](XDeguPipeline.md)
- [`XGroovyPipeline`](XGroovyPipeline.md)
- [`XHamsterPipeline`](XHamsterPipeline.md)
- [`XnXXPipeline`](XnXXPipeline.md)
- [`XozillaPipeline`](XozillaPipeline.md)
- [`XVideosPipeline`](XVideosPipeline.md)
- [`ZbPornPipeline`](ZbPornPipeline.md)
- [`ZzzTubePipeline`](ZzzTubePipeline.md)

## Type Parameters

### TExec

`TExec` *extends* [`ExecutionArgs`](../interfaces/ExecutionArgs.md)

### TResult

`TResult` *extends* [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md) = [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)

## Constructors

### Constructor

> **new BasePipeline**\<`TExec`, `TResult`\>(`fileManager`): `BasePipeline`\<`TExec`, `TResult`\>

Defined in: [packages/base/BasePipeline.ts:28](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L28)

#### Parameters

##### fileManager

[`FileManager`](FileManager.md)

#### Returns

`BasePipeline`\<`TExec`, `TResult`\>

## Properties

### pathBuilder

> `protected` `readonly` **pathBuilder**: [`PathBuilder`](PathBuilder.md)

Defined in: [packages/base/BasePipeline.ts:25](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L25)

***

### helper

> `protected` `readonly` **helper**: [`Helper`](Helper.md)

Defined in: [packages/base/BasePipeline.ts:26](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L26)

***

### fileManager

> `protected` **fileManager**: [`FileManager`](FileManager.md)

Defined in: [packages/base/BasePipeline.ts:28](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L28)

## Methods

### build()

> **build**(`metadata`, `request`): [`PipelineItem`](../interfaces/PipelineItem.md)[]

Defined in: [packages/base/BasePipeline.ts:37](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L37)

Builds filtered, deduplicated pipeline items for a single metadata result.

#### Parameters

##### metadata

`TResult`

Extracted provider metadata.

##### request

`TExec`

Execution request with filters and provider options.

#### Returns

[`PipelineItem`](../interfaces/PipelineItem.md)[]

Downloadable pipeline items.

***

### filterByExt()

> `protected` **filterByExt**(`request`, `pipelineItems`): [`PipelineItem`](../interfaces/PipelineItem.md)[]

Defined in: [packages/base/BasePipeline.ts:62](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L62)

#### Parameters

##### request

`TExec`

##### pipelineItems

[`PipelineItem`](../interfaces/PipelineItem.md)[]

#### Returns

[`PipelineItem`](../interfaces/PipelineItem.md)[]

***

### sliceByMaxDownloads()

> `protected` **sliceByMaxDownloads**(`request`, `items`): [`PipelineItem`](../interfaces/PipelineItem.md)[]

Defined in: [packages/base/BasePipeline.ts:68](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L68)

#### Parameters

##### request

`TExec`

##### items

[`PipelineItem`](../interfaces/PipelineItem.md)[]

#### Returns

[`PipelineItem`](../interfaces/PipelineItem.md)[]

***

### buildIdentifier()

> `protected` **buildIdentifier**(`ctx`): `string`

Defined in: [packages/base/BasePipeline.ts:78](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L78)

Builds the storage identifier used as the logical output path.

#### Parameters

##### ctx

[`IdentifierContext`](../interfaces/IdentifierContext.md)\<`TResult`\>

Media item context and source metadata.

#### Returns

`string`

Stable identifier for storage and progress output.

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

***

### mappings()

> `protected` **mappings**(`metadata`, `request`): [`PipelineMappings`](../type-aliases/PipelineMappings.md)

Defined in: [packages/base/BasePipeline.ts:97](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L97)

Defines which metadata collections should become pipeline items.

#### Parameters

##### metadata

`TResult`

Extracted provider metadata.

##### request

`TExec`

Execution request with provider filters.

#### Returns

[`PipelineMappings`](../type-aliases/PipelineMappings.md)

Mapping definitions used by `extract`.

***

### extract()

> `protected` **extract**(`request`, `metadata`): [`PipelineExtractedItem`](../interfaces/PipelineExtractedItem.md)[]

Defined in: [packages/base/BasePipeline.ts:106](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L106)

#### Parameters

##### request

`TExec`

##### metadata

`TResult`

#### Returns

[`PipelineExtractedItem`](../interfaces/PipelineExtractedItem.md)[]

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

***

### uniquePipelines()

> `protected` **uniquePipelines**(`pipelines`): [`PipelineItem`](../interfaces/PipelineItem.md)[]

Defined in: [packages/base/BasePipeline.ts:137](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BasePipeline.ts#L137)

#### Parameters

##### pipelines

[`PipelineItem`](../interfaces/PipelineItem.md)[]

#### Returns

[`PipelineItem`](../interfaces/PipelineItem.md)[]

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
