[**downflux**](../README.md)

***

[downflux](../README.md) / DaFreePornOutput

# Interface: DaFreePornOutput

Defined in: [packages/providers/dafreeporn/DaFreePornContracts.ts:3](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/dafreeporn/DaFreePornContracts.ts#L3)

Default output structure for extractor operations.
Represents normalized metadata and extracted resources.

## Extends

- [`DefaultExecutionResult`](DefaultExecutionResult.md).[`DaFreePornVideoOutput`](DaFreePornVideoOutput.md)

## Properties

### title

> **title**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:140](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L140)

Page title

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`title`](DefaultExecutionResult.md#title)

***

### description

> **description**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:143](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L143)

Page description

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`description`](DefaultExecutionResult.md#description)

***

### keywords

> **keywords**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:146](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L146)

SEO keywords

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`keywords`](DefaultExecutionResult.md#keywords)

***

### status

> **status**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:149](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L149)

HTTP status code

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`status`](DefaultExecutionResult.md#status)

***

### sourceUrl

> **sourceUrl**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:152](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L152)

Final resolved URL

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`sourceUrl`](DefaultExecutionResult.md#sourceurl)

***

### anchors

> **anchors**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:155](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L155)

Anchor links

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`anchors`](DefaultExecutionResult.md#anchors)

***

### images

> **images**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:158](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L158)

Image URLs

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`images`](DefaultExecutionResult.md#images)

***

### sources

> **sources**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:161](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L161)

Media source URLs

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`sources`](DefaultExecutionResult.md#sources)

***

### videoSources

> **videoSources**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:164](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L164)

Video URLs

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`videoSources`](DefaultExecutionResult.md#videosources)

***

### links

> **links**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:167](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L167)

Hyper links

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`links`](DefaultExecutionResult.md#links)

***

### videoPosters?

> `optional` **videoPosters?**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:170](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L170)

Video poster URLs

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`videoPosters`](DefaultExecutionResult.md#videoposters)

***

### divHREFs?

> `optional` **divHREFs?**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:173](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L173)

URLs extracted from div href attributes

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`divHREFs`](DefaultExecutionResult.md#divhrefs)

***

### allUrls?

> `optional` **allUrls?**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:176](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L176)

All discovered URLs

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`allUrls`](DefaultExecutionResult.md#allurls)

***

### extractionTarget?

> `optional` **extractionTarget?**: [`ExtractionTarget`](../enumerations/ExtractionTarget.md)

Defined in: [packages/contracts/ExecutionContracts.ts:179](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L179)

URL category for pipeline routing

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`extractionTarget`](DefaultExecutionResult.md#extractiontarget)

***

### customFields?

> `optional` **customFields?**: `unknown`

Defined in: [packages/contracts/ExecutionContracts.ts:182](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L182)

Extensible service-specific fields

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`customFields`](DefaultExecutionResult.md#customfields)

***

### tags

> **tags**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:187](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L187)

#### Inherited from

[`DaFreePornVideoOutput`](DaFreePornVideoOutput.md).[`tags`](DaFreePornVideoOutput.md#tags)

***

### pageUrl

> **pageUrl**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:189](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L189)

#### Inherited from

[`DaFreePornVideoOutput`](DaFreePornVideoOutput.md).[`pageUrl`](DaFreePornVideoOutput.md#pageurl)

***

### poster

> **poster**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:198](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L198)

#### Inherited from

[`DaFreePornVideoOutput`](DaFreePornVideoOutput.md).[`poster`](DaFreePornVideoOutput.md#poster)

***

### videos

> **videos**: [`VideosFormat`](VideosFormat.md)

Defined in: [packages/contracts/ExecutionContracts.ts:199](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L199)

#### Inherited from

[`DaFreePornVideoOutput`](DaFreePornVideoOutput.md).[`videos`](DaFreePornVideoOutput.md#videos)

***

### videoId

> **videoId**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:203](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L203)

#### Inherited from

[`DaFreePornVideoOutput`](DaFreePornVideoOutput.md).[`videoId`](DaFreePornVideoOutput.md#videoid)

***

### previews

> **previews**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:204](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L204)

#### Inherited from

[`DaFreePornVideoOutput`](DaFreePornVideoOutput.md).[`previews`](DaFreePornVideoOutput.md#previews)

***

### timelineScreenCount?

> `optional` **timelineScreenCount?**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:205](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L205)

#### Inherited from

[`DaFreePornVideoOutput`](DaFreePornVideoOutput.md).[`timelineScreenCount`](DaFreePornVideoOutput.md#timelinescreencount)

***

### timelineScreens?

> `optional` **timelineScreens?**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:206](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L206)

#### Inherited from

[`DaFreePornVideoOutput`](DaFreePornVideoOutput.md).[`timelineScreens`](DaFreePornVideoOutput.md#timelinescreens)

***

### starred?

> `optional` **starred?**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:207](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L207)

#### Inherited from

[`DaFreePornVideoOutput`](DaFreePornVideoOutput.md).[`starred`](DaFreePornVideoOutput.md#starred)

***

### uploader?

> `optional` **uploader?**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:208](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/contracts/ExecutionContracts.ts#L208)

#### Inherited from

[`DaFreePornVideoOutput`](DaFreePornVideoOutput.md).[`uploader`](DaFreePornVideoOutput.md#uploader)
