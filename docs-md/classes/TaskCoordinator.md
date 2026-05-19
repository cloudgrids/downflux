[**downflux**](../README.md)

***

[downflux](../README.md) / TaskCoordinator

# Class: TaskCoordinator

Defined in: [packages/core/coordinators/TaskCoordinator.ts:16](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/core/coordinators/TaskCoordinator.ts#L16)

Coordinates concurrent work within an execution result.

## Remarks

The task coordinator owns concurrency, hooks, progress updates, and output
mode behavior. It keeps download scheduling separate from provider methods
and from the lower-level transfer code that writes individual items.

## Constructors

### Constructor

> **new TaskCoordinator**(`transferCoordinator`, `fileManager`, `transformerRegistry`, `progressManager`, `pipelineRegistry`): `TaskCoordinator`

Defined in: [packages/core/coordinators/TaskCoordinator.ts:19](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/core/coordinators/TaskCoordinator.ts#L19)

#### Parameters

##### transferCoordinator

[`TransferCoordinator`](TransferCoordinator.md)

##### fileManager

[`FileManager`](FileManager.md)

##### transformerRegistry

[`TransformerRegistry`](TransformerRegistry.md)

##### progressManager

[`ProgressManager`](ProgressManager.md)

##### pipelineRegistry

[`PipelineRegistry`](PipelineRegistry.md)

#### Returns

`TaskCoordinator`

## Methods

### runWithConcurrency()

> **runWithConcurrency**\<`T`\>(`items`, `concurrency`, `worker`): `Promise`\<`void`\>

Defined in: [packages/core/coordinators/TaskCoordinator.ts:142](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/core/coordinators/TaskCoordinator.ts#L142)

Runs asynchronous workers with a bounded concurrency limit.

#### Type Parameters

##### T

`T`

#### Parameters

##### items

`T`[]

Items to process.

##### concurrency

`number`

Maximum number of active workers.

##### worker

(`item`, `index`) => `Promise`\<`void`\>

Async item handler.

#### Returns

`Promise`\<`void`\>

***

### handleJsonOutput()

> **handleJsonOutput**\<`T`, `S`\>(`result`, `options`): `Promise`\<[`ExecutionResult`](../interfaces/ExecutionResult.md)\<`T`, `S`\>\>

Defined in: [packages/core/coordinators/TaskCoordinator.ts:166](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/core/coordinators/TaskCoordinator.ts#L166)

Persists a JSON execution result.

#### Type Parameters

##### T

`T`

##### S

`S` *extends* [`ExecutionShape`](../type-aliases/ExecutionShape.md)

#### Parameters

##### result

[`ExecutionResult`](../interfaces/ExecutionResult.md)\<`T`, `S`\>

Execution result to serialize.

##### options

[`ExecutionOptions`](../interfaces/ExecutionOptions.md)

Output options containing directory configuration.

#### Returns

`Promise`\<[`ExecutionResult`](../interfaces/ExecutionResult.md)\<`T`, `S`\>\>

The original execution result.

***

### handleDeviceOutputAsync()

> **handleDeviceOutputAsync**\<`T`, `S`\>(`options`, `outputType`, `request`, `pipelineHooks`, `result`): `void`

Defined in: [packages/core/coordinators/TaskCoordinator.ts:183](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/core/coordinators/TaskCoordinator.ts#L183)

Starts background download processing for device or buffer output.

#### Type Parameters

##### T

`T`

##### S

`S` *extends* [`ExecutionShape`](../type-aliases/ExecutionShape.md)

#### Parameters

##### options

[`ExecutionOptions`](../interfaces/ExecutionOptions.md)

Execution options.

##### outputType

[`OutputType`](../enumerations/OutputType.md)

Output mode.

##### request

[`ExecutionArgs`](../interfaces/ExecutionArgs.md)

Original execution request.

##### pipelineHooks

[`PipelineHook`](../interfaces/PipelineHook.md)[]

Hooks fired around extraction/download events.

##### result

[`ExecutionResult`](../interfaces/ExecutionResult.md)\<`T`, `S`\>

Execution result to update while downloads progress.

#### Returns

`void`
