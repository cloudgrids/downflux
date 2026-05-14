[**downflux**](../README.md)

***

[downflux](../README.md) / TaskCoordinator

# Class: TaskCoordinator

Defined in: [packages/core/coordinators/TaskCoordinator.ts:8](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/core/coordinators/TaskCoordinator.ts#L8)

## Constructors

### Constructor

> **new TaskCoordinator**(`transferCoordinator`, `fileManager`, `transformerRegistry`, `progressManager`, `pipelineRegistry`): `TaskCoordinator`

Defined in: [packages/core/coordinators/TaskCoordinator.ts:11](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/core/coordinators/TaskCoordinator.ts#L11)

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

Defined in: [packages/core/coordinators/TaskCoordinator.ts:128](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/core/coordinators/TaskCoordinator.ts#L128)

#### Type Parameters

##### T

`T`

#### Parameters

##### items

`T`[]

##### concurrency

`number`

##### worker

(`item`, `index`) => `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### handleJsonOutput()

> **handleJsonOutput**\<`T`, `S`\>(`result`, `options`): `Promise`\<[`ExecutionResult`](../interfaces/ExecutionResult.md)\<`T`, `S`\>\>

Defined in: [packages/core/coordinators/TaskCoordinator.ts:145](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/core/coordinators/TaskCoordinator.ts#L145)

#### Type Parameters

##### T

`T`

##### S

`S` *extends* [`ExecutionShape`](../type-aliases/ExecutionShape.md)

#### Parameters

##### result

[`ExecutionResult`](../interfaces/ExecutionResult.md)\<`T`, `S`\>

##### options

[`ExecutionOptions`](../interfaces/ExecutionOptions.md)

#### Returns

`Promise`\<[`ExecutionResult`](../interfaces/ExecutionResult.md)\<`T`, `S`\>\>

***

### handleDeviceOutputAsync()

> **handleDeviceOutputAsync**\<`T`, `S`\>(`options`, `outputType`, `request`, `pipelineHooks`, `result`): `void`

Defined in: [packages/core/coordinators/TaskCoordinator.ts:153](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/core/coordinators/TaskCoordinator.ts#L153)

#### Type Parameters

##### T

`T`

##### S

`S` *extends* [`ExecutionShape`](../type-aliases/ExecutionShape.md)

#### Parameters

##### options

[`ExecutionOptions`](../interfaces/ExecutionOptions.md)

##### outputType

[`OutputType`](../enumerations/OutputType.md)

##### request

[`ExecutionArgs`](../interfaces/ExecutionArgs.md)

##### pipelineHooks

[`PipelineHook`](../interfaces/PipelineHook.md)[]

##### result

[`ExecutionResult`](../interfaces/ExecutionResult.md)\<`T`, `S`\>

#### Returns

`void`
