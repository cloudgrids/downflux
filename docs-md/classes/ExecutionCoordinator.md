[**downflux**](../README.md)

***

[downflux](../README.md) / ExecutionCoordinator

# Class: ExecutionCoordinator

Defined in: [packages/core/coordinators/ExecutionCoordinator.ts:16](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/core/coordinators/ExecutionCoordinator.ts#L16)

Coordinates extraction, pipeline creation, and output dispatch.

## Remarks

Coordinators exist to keep providers small. The execution coordinator owns
the job-level flow: extract metadata from targets, convert metadata into
pipeline items, build the result shape, and hand output handling to the task
coordinator.

## Constructors

### Constructor

> **new ExecutionCoordinator**(`transformerRegistry`, `taskCoordinator`, `progressManager`, `pipelineRegistry`): `ExecutionCoordinator`

Defined in: [packages/core/coordinators/ExecutionCoordinator.ts:19](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/core/coordinators/ExecutionCoordinator.ts#L19)

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

Defined in: [packages/core/coordinators/ExecutionCoordinator.ts:32](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/core/coordinators/ExecutionCoordinator.ts#L32)

Runs an execution request.

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

Provider request containing targets, output mode, and execution options.

#### Returns

`Promise`\<[`ExecutionResult`](../interfaces/ExecutionResult.md)\<`TResult`, `TShape`\>\>

Execution result with extracted metadata and generated pipeline items.
