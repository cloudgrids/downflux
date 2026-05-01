[**downflux**](../README.md)

***

[downflux](../README.md) / PipelineHook

# Interface: PipelineHook

Defined in: [util/interfaces/common/PipelineItem.ts:19](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/PipelineItem.ts#L19)

## Methods

### onExtract()?

> `optional` **onExtract**(`item`): `void` \| `Promise`\<`void`\>

Defined in: [util/interfaces/common/PipelineItem.ts:20](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/PipelineItem.ts#L20)

#### Parameters

##### item

[`PipelineItem`](PipelineItem.md)

#### Returns

`void` \| `Promise`\<`void`\>

***

### onDownload()?

> `optional` **onDownload**(`payload`): `void` \| `Promise`\<`void`\>

Defined in: [util/interfaces/common/PipelineItem.ts:21](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/PipelineItem.ts#L21)

#### Parameters

##### payload

###### item

[`PipelineItem`](PipelineItem.md)

###### result

[`DownloadResult`](DownloadResult.md)

#### Returns

`void` \| `Promise`\<`void`\>
