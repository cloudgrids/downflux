[**downflux**](../README.md)

***

[downflux](../README.md) / TransferCoordinator

# Class: TransferCoordinator

Defined in: [packages/core/coordinators/TransferCoordinator.ts:8](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/core/coordinators/TransferCoordinator.ts#L8)

## Constructors

### Constructor

> **new TransferCoordinator**(`fileManager`, `streamHttpClient`, `progressManager`): `TransferCoordinator`

Defined in: [packages/core/coordinators/TransferCoordinator.ts:9](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/core/coordinators/TransferCoordinator.ts#L9)

#### Parameters

##### fileManager

[`FileManager`](FileManager.md)

##### streamHttpClient

[`StreamHttpClient`](StreamHttpClient.md)

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`TransferCoordinator`

## Properties

### fileManager

> `protected` `readonly` **fileManager**: [`FileManager`](FileManager.md)

Defined in: [packages/core/coordinators/TransferCoordinator.ts:10](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/core/coordinators/TransferCoordinator.ts#L10)

***

### streamHttpClient

> `protected` `readonly` **streamHttpClient**: [`StreamHttpClient`](StreamHttpClient.md)

Defined in: [packages/core/coordinators/TransferCoordinator.ts:11](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/core/coordinators/TransferCoordinator.ts#L11)

***

### progressManager

> `protected` `readonly` **progressManager**: [`ProgressManager`](ProgressManager.md)

Defined in: [packages/core/coordinators/TransferCoordinator.ts:12](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/core/coordinators/TransferCoordinator.ts#L12)

## Methods

### download()

> **download**(`item`, `opts`): `Promise`\<[`DownloadResult`](../interfaces/DownloadResult.md)\>

Defined in: [packages/core/coordinators/TransferCoordinator.ts:15](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/core/coordinators/TransferCoordinator.ts#L15)

#### Parameters

##### item

[`PipelineItem`](../interfaces/PipelineItem.md)

##### opts

[`DownloadOptions`](../interfaces/DownloadOptions.md)

#### Returns

`Promise`\<[`DownloadResult`](../interfaces/DownloadResult.md)\>
