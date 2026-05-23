[**downflux**](../README.md)

***

[downflux](../README.md) / PipelineRegistry

# Class: PipelineRegistry

Defined in: [packages/core/registries/PipelineRegistry.ts:100](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/core/registries/PipelineRegistry.ts#L100)

Resolves provider pipelines and builds download work items.

## Remarks

The pipeline registry separates provider lookup from coordinator logic. It
lazy-loads the provider pipeline, injects storage support, and returns the
concrete items that the download coordinator can process.

## Constructors

### Constructor

> **new PipelineRegistry**(`fileManager`): `PipelineRegistry`

Defined in: [packages/core/registries/PipelineRegistry.ts:103](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/core/registries/PipelineRegistry.ts#L103)

#### Parameters

##### fileManager

[`FileManager`](FileManager.md)

#### Returns

`PipelineRegistry`

## Properties

### fileManager

> `protected` `readonly` **fileManager**: [`FileManager`](FileManager.md)

Defined in: [packages/core/registries/PipelineRegistry.ts:103](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/core/registries/PipelineRegistry.ts#L103)

## Methods

### build()

> **build**\<`TResult`, `TExec`\>(`metadata`, `request`): `Promise`\<[`PipelineItem`](../interfaces/PipelineItem.md)[]\>

Defined in: [packages/core/registries/PipelineRegistry.ts:126](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/core/registries/PipelineRegistry.ts#L126)

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
