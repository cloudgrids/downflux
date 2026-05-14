[**downflux**](../README.md)

***

[downflux](../README.md) / PipelineHook

# Interface: PipelineHook

Defined in: [packages/contracts/PipelineContracts.ts:18](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/PipelineContracts.ts#L18)

## Methods

### onExtract()?

> `optional` **onExtract**(`item`): `void` \| `Promise`\<`void`\>

Defined in: [packages/contracts/PipelineContracts.ts:19](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/PipelineContracts.ts#L19)

#### Parameters

##### item

[`PipelineItem`](PipelineItem.md)

#### Returns

`void` \| `Promise`\<`void`\>

***

### onDownload()?

> `optional` **onDownload**(`payload`): `void` \| `Promise`\<`void`\>

Defined in: [packages/contracts/PipelineContracts.ts:20](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/PipelineContracts.ts#L20)

#### Parameters

##### payload

###### item

[`PipelineItem`](PipelineItem.md)

###### result

[`DownloadResult`](DownloadResult.md)

#### Returns

`void` \| `Promise`\<`void`\>
