[**downflux**](../README.md)

***

[downflux](../README.md) / ExecutionCoordinator

# Class: ExecutionCoordinator

Defined in: [packages/core/coordinators/ExecutionCoordinator.ts:7](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/core/coordinators/ExecutionCoordinator.ts#L7)

## Constructors

### Constructor

> **new ExecutionCoordinator**(`transformerRegistry`, `taskCoordinator`, `progressManager`, `pipelineRegistry`): `ExecutionCoordinator`

Defined in: [packages/core/coordinators/ExecutionCoordinator.ts:10](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/core/coordinators/ExecutionCoordinator.ts#L10)

#### Parameters

##### transformerRegistry

[`TransformerRegistry`](TransformerRegistry.md)

##### taskCoordinator

[`TaskCoordinator`](TaskCoordinator.md)

##### progressManager

[`ProgressManager`](ProgressManager.md)

##### pipelineRegistry

[`PipelineRegistry`](PipelineRegistry.md)

#### Returns

`ExecutionCoordinator`

## Methods

### execute()

> **execute**\<`TResult`, `TShape`, `TExec`\>(`request`): `Promise`\<[`ExecutionResult`](../interfaces/ExecutionResult.md)\<`TResult`, `TShape`\>\>

Defined in: [packages/core/coordinators/ExecutionCoordinator.ts:17](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/core/coordinators/ExecutionCoordinator.ts#L17)

#### Type Parameters

##### TResult

`TResult`

##### TShape

`TShape` *extends* [`ExecutionShape`](../type-aliases/ExecutionShape.md)

##### TExec

`TExec` *extends* [`ExecutionArgs`](../interfaces/ExecutionArgs.md)\<`TShape`\>

#### Parameters

##### request

`TExec`

#### Returns

`Promise`\<[`ExecutionResult`](../interfaces/ExecutionResult.md)\<`TResult`, `TShape`\>\>
