[**downflux**](../README.md)

***

[downflux](../README.md) / PipelineRegistry

# Class: PipelineRegistry

Defined in: [packages/core/registries/PipelineRegistry.ts:54](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/core/registries/PipelineRegistry.ts#L54)

## Constructors

### Constructor

> **new PipelineRegistry**(`fileManager`): `PipelineRegistry`

Defined in: [packages/core/registries/PipelineRegistry.ts:57](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/core/registries/PipelineRegistry.ts#L57)

#### Parameters

##### fileManager

[`FileManager`](FileManager.md)

#### Returns

`PipelineRegistry`

## Properties

### fileManager

> `protected` `readonly` **fileManager**: [`FileManager`](FileManager.md)

Defined in: [packages/core/registries/PipelineRegistry.ts:57](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/core/registries/PipelineRegistry.ts#L57)

## Methods

### build()

> **build**\<`TResult`, `TExec`\>(`metadata`, `request`): `Promise`\<[`PipelineItem`](../interfaces/PipelineItem.md)[]\>

Defined in: [packages/core/registries/PipelineRegistry.ts:73](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/core/registries/PipelineRegistry.ts#L73)

#### Type Parameters

##### TResult

`TResult`

##### TExec

`TExec` *extends* [`ExecutionArgs`](../interfaces/ExecutionArgs.md)\<[`ExecutionShape`](../type-aliases/ExecutionShape.md)\>

#### Parameters

##### metadata

`TResult`

##### request

`TExec`

#### Returns

`Promise`\<[`PipelineItem`](../interfaces/PipelineItem.md)[]\>
