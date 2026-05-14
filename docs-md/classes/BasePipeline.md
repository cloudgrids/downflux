[**downflux**](../README.md)

***

[downflux](../README.md) / BasePipeline

# Class: BasePipeline\<TExec, TResult\>

Defined in: [packages/base/BasePipeline.ts:5](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BasePipeline.ts#L5)

## Extended by

- [`BeegPipeline`](BeegPipeline.md)
- [`CumLouderPipeline`](CumLouderPipeline.md)
- [`HqPornPipeline`](HqPornPipeline.md)
- [`OkPornPipeline`](OkPornPipeline.md)
- [`PerfectGirlsPipeline`](PerfectGirlsPipeline.md)
- [`Porn300Pipeline`](Porn300Pipeline.md)
- [`PornDoePipeline`](PornDoePipeline.md)
- [`PornHubPipeline`](PornHubPipeline.md)
- [`PornOnePipeline`](PornOnePipeline.md)
- [`PornsOkPipeline`](PornsOkPipeline.md)
- [`PussySpacePipeline`](PussySpacePipeline.md)
- [`SexVidPipeline`](SexVidPipeline.md)
- [`SuperPornPipeline`](SuperPornPipeline.md)
- [`SxyPornPipeline`](SxyPornPipeline.md)
- [`TheyAreHugePipeline`](TheyAreHugePipeline.md)
- [`TnAFlixPipeline`](TnAFlixPipeline.md)
- [`WallHavenPipeline`](WallHavenPipeline.md)
- [`XGroovyPipeline`](XGroovyPipeline.md)
- [`XHamsterPipeline`](XHamsterPipeline.md)
- [`XnXXPipeline`](XnXXPipeline.md)
- [`XVideosPipeline`](XVideosPipeline.md)

## Type Parameters

### TExec

`TExec` *extends* [`ExecutionArgs`](../interfaces/ExecutionArgs.md)

### TResult

`TResult` = [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)

## Constructors

### Constructor

> **new BasePipeline**\<`TExec`, `TResult`\>(`fileManager`): `BasePipeline`\<`TExec`, `TResult`\>

Defined in: [packages/base/BasePipeline.ts:8](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BasePipeline.ts#L8)

#### Parameters

##### fileManager

[`FileManager`](FileManager.md)

#### Returns

`BasePipeline`\<`TExec`, `TResult`\>

## Properties

### pathBuilder

> `protected` `readonly` **pathBuilder**: [`PathBuilder`](PathBuilder.md)

Defined in: [packages/base/BasePipeline.ts:6](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BasePipeline.ts#L6)

***

### fileManager

> `protected` **fileManager**: [`FileManager`](FileManager.md)

Defined in: [packages/base/BasePipeline.ts:8](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BasePipeline.ts#L8)

## Methods

### build()

> **build**(`metadata`, `request`): [`PipelineItem`](../interfaces/PipelineItem.md)[]

Defined in: [packages/base/BasePipeline.ts:10](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BasePipeline.ts#L10)

#### Parameters

##### metadata

`TResult`

##### request

`TExec`

#### Returns

[`PipelineItem`](../interfaces/PipelineItem.md)[]

***

### filterByExt()

> `protected` **filterByExt**(`request`, `pipelineItems`): [`PipelineItem`](../interfaces/PipelineItem.md)[]

Defined in: [packages/base/BasePipeline.ts:33](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BasePipeline.ts#L33)

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

Defined in: [packages/base/BasePipeline.ts:39](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BasePipeline.ts#L39)

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

Defined in: [packages/base/BasePipeline.ts:43](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BasePipeline.ts#L43)

#### Parameters

##### ctx

[`IdentifierContext`](../interfaces/IdentifierContext.md)\<`TResult`\>

#### Returns

`string`

***

### extract()

> `protected` **extract**(`request`, `metadata`): [`PipelineExtractedItem`](../interfaces/PipelineExtractedItem.md)[]

Defined in: [packages/base/BasePipeline.ts:49](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BasePipeline.ts#L49)

#### Parameters

##### request

`TExec`

##### metadata

`any`

#### Returns

[`PipelineExtractedItem`](../interfaces/PipelineExtractedItem.md)[]

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
