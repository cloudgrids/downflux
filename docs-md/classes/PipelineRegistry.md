[**downflux**](../README.md)

***

[downflux](../README.md) / PipelineRegistry

# Class: PipelineRegistry

Defined in: [packages/core/registries/PipelineRegistry.ts:76](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/core/registries/PipelineRegistry.ts#L76)

Resolves provider pipelines and builds download work items.

## Remarks

The pipeline registry separates provider lookup from coordinator logic. It
lazy-loads the provider pipeline, injects storage support, and returns the
concrete items that the download coordinator can process.

## Constructors

### Constructor

> **new PipelineRegistry**(`fileManager`): `PipelineRegistry`

Defined in: [packages/core/registries/PipelineRegistry.ts:79](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/core/registries/PipelineRegistry.ts#L79)

#### Parameters

##### fileManager

[`FileManager`](FileManager.md)

#### Returns

`PipelineRegistry`

## Properties

### fileManager

> `protected` `readonly` **fileManager**: [`FileManager`](FileManager.md)

Defined in: [packages/core/registries/PipelineRegistry.ts:79](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/core/registries/PipelineRegistry.ts#L79)

## Methods

### build()

> **build**\<`TResult`, `TExec`\>(`metadata`, `request`): `Promise`\<[`PipelineItem`](../interfaces/PipelineItem.md)[]\>

Defined in: [packages/core/registries/PipelineRegistry.ts:102](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/core/registries/PipelineRegistry.ts#L102)

Builds pipeline items with the matching provider pipeline.

#### Type Parameters

##### TResult

`TResult`

##### TExec

`TExec` *extends* [`ExecutionArgs`](../interfaces/ExecutionArgs.md)\<[`ExecutionShape`](../type-aliases/ExecutionShape.md)\>

#### Parameters

##### metadata

`TResult`

Extracted provider metadata.

##### request

`TExec`

Execution request containing the provider.

#### Returns

`Promise`\<[`PipelineItem`](../interfaces/PipelineItem.md)[]\>

Downloadable pipeline items.
