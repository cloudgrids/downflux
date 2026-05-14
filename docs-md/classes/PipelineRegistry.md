[**downflux**](../README.md)

***

[downflux](../README.md) / PipelineRegistry

# Class: PipelineRegistry

Defined in: [packages/core/registries/PipelineRegistry.ts:48](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/core/registries/PipelineRegistry.ts#L48)

## Constructors

### Constructor

> **new PipelineRegistry**(`fileManager`): `PipelineRegistry`

Defined in: [packages/core/registries/PipelineRegistry.ts:51](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/core/registries/PipelineRegistry.ts#L51)

#### Parameters

##### fileManager

[`FileManager`](FileManager.md)

#### Returns

`PipelineRegistry`

## Properties

### fileManager

> `protected` `readonly` **fileManager**: [`FileManager`](FileManager.md)

Defined in: [packages/core/registries/PipelineRegistry.ts:51](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/core/registries/PipelineRegistry.ts#L51)

## Methods

### build()

> **build**\<`TResult`, `TExec`\>(`metadata`, `request`): `Promise`\<[`PipelineItem`](../interfaces/PipelineItem.md)[]\>

Defined in: [packages/core/registries/PipelineRegistry.ts:67](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/core/registries/PipelineRegistry.ts#L67)

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
