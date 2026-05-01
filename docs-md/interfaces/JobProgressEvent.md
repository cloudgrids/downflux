[**downflux**](../README.md)

***

[downflux](../README.md) / JobProgressEvent

# Interface: JobProgressEvent

Defined in: [util/interfaces/common/JobProgress.ts:15](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobProgress.ts#L15)

## Properties

### status

> **status**: [`JobProgressStatus`](../type-aliases/JobProgressStatus.md)

Defined in: [util/interfaces/common/JobProgress.ts:16](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobProgress.ts#L16)

***

### target?

> `optional` **target?**: `string`

Defined in: [util/interfaces/common/JobProgress.ts:17](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobProgress.ts#L17)

***

### totalTargets?

> `optional` **totalTargets?**: `number`

Defined in: [util/interfaces/common/JobProgress.ts:18](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobProgress.ts#L18)

***

### totalItems?

> `optional` **totalItems?**: `number`

Defined in: [util/interfaces/common/JobProgress.ts:19](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobProgress.ts#L19)

***

### extracted?

> `optional` **extracted?**: `number`

Defined in: [util/interfaces/common/JobProgress.ts:20](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobProgress.ts#L20)

***

### downloaded?

> `optional` **downloaded?**: `number`

Defined in: [util/interfaces/common/JobProgress.ts:21](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobProgress.ts#L21)

***

### failed?

> `optional` **failed?**: `number`

Defined in: [util/interfaces/common/JobProgress.ts:22](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobProgress.ts#L22)

***

### item?

> `optional` **item?**: [`PipelineItem`](PipelineItem.md)

Defined in: [util/interfaces/common/JobProgress.ts:23](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobProgress.ts#L23)

***

### result?

> `optional` **result?**: `Omit`\<[`DownloadResult`](DownloadResult.md), `"buffer"`\>

Defined in: [util/interfaces/common/JobProgress.ts:24](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobProgress.ts#L24)

***

### error?

> `optional` **error?**: `Error`

Defined in: [util/interfaces/common/JobProgress.ts:25](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/JobProgress.ts#L25)
