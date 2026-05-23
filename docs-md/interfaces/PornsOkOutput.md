[**downflux**](../README.md)

***

[downflux](../README.md) / PornsOkOutput

# Interface: PornsOkOutput

Defined in: [packages/providers/pornsok/PornsOkContracts.ts:14](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/pornsok/PornsOkContracts.ts#L14)

Default output structure for extractor operations.
Represents normalized metadata and extracted resources.

## Extends

- [`DefaultExecutionResult`](DefaultExecutionResult.md).[`PornsOkVideoOutput`](PornsOkVideoOutput.md)

## Properties

### title

> **title**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:164](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L164)

Page title

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`title`](DefaultExecutionResult.md#title)

***

### description

> **description**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:167](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L167)

Page description

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`description`](DefaultExecutionResult.md#description)

***

### keywords

> **keywords**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:170](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L170)

SEO keywords

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`keywords`](DefaultExecutionResult.md#keywords)

***

### status

> **status**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:173](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L173)

HTTP status code

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`status`](DefaultExecutionResult.md#status)

***

### sourceUrl

> **sourceUrl**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:176](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L176)

Final resolved URL

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`sourceUrl`](DefaultExecutionResult.md#sourceurl)

***

### anchors

> **anchors**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:179](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L179)

Anchor links

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`anchors`](DefaultExecutionResult.md#anchors)

***

### images

> **images**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:182](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L182)

Image URLs

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`images`](DefaultExecutionResult.md#images)

***

### sources

> **sources**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:185](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L185)

Media source URLs

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`sources`](DefaultExecutionResult.md#sources)

***

### videoSources

> **videoSources**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:188](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L188)

Video URLs

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`videoSources`](DefaultExecutionResult.md#videosources)

***

### links

> **links**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:191](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L191)

Hyper links

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`links`](DefaultExecutionResult.md#links)

***

### videoPosters?

> `optional` **videoPosters?**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:194](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L194)

Video poster URLs

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`videoPosters`](DefaultExecutionResult.md#videoposters)

***

### divHREFs?

> `optional` **divHREFs?**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:197](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L197)

URLs extracted from div href attributes

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`divHREFs`](DefaultExecutionResult.md#divhrefs)

***

### allUrls?

> `optional` **allUrls?**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:200](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L200)

All discovered URLs

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`allUrls`](DefaultExecutionResult.md#allurls)

***

### extractionTarget?

> `optional` **extractionTarget?**: [`ExtractionTarget`](../enumerations/ExtractionTarget.md)

Defined in: [packages/contracts/ExecutionContracts.ts:203](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L203)

URL category for pipeline routing

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`extractionTarget`](DefaultExecutionResult.md#extractiontarget)

***

### customFields?

> `optional` **customFields?**: `unknown`

Defined in: [packages/contracts/ExecutionContracts.ts:206](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L206)

Extensible service-specific fields

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`customFields`](DefaultExecutionResult.md#customfields)

***

### tags

> **tags**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:211](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L211)

#### Inherited from

[`PornsOkVideoOutput`](PornsOkVideoOutput.md).[`tags`](PornsOkVideoOutput.md#tags)

***

### pageUrl

> **pageUrl**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:213](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L213)

#### Inherited from

[`PornsOkVideoOutput`](PornsOkVideoOutput.md).[`pageUrl`](PornsOkVideoOutput.md#pageurl)

***

### poster

> **poster**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:222](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L222)

#### Inherited from

[`PornsOkVideoOutput`](PornsOkVideoOutput.md).[`poster`](PornsOkVideoOutput.md#poster)

***

### videos

> **videos**: [`VideosFormat`](VideosFormat.md)

Defined in: [packages/contracts/ExecutionContracts.ts:223](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L223)

#### Inherited from

[`PornsOkVideoOutput`](PornsOkVideoOutput.md).[`videos`](PornsOkVideoOutput.md#videos)

***

### duration

> **duration**: `number`

Defined in: [packages/providers/pornsok/PornsOkContracts.ts:6](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/pornsok/PornsOkContracts.ts#L6)

#### Inherited from

[`PornsOkVideoOutput`](PornsOkVideoOutput.md).[`duration`](PornsOkVideoOutput.md#duration)

***

### uploadedAt

> **uploadedAt**: `string`

Defined in: [packages/providers/pornsok/PornsOkContracts.ts:7](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/pornsok/PornsOkContracts.ts#L7)

#### Inherited from

[`PornsOkVideoOutput`](PornsOkVideoOutput.md).[`uploadedAt`](PornsOkVideoOutput.md#uploadedat)

***

### totalViews

> **totalViews**: `number`

Defined in: [packages/providers/pornsok/PornsOkContracts.ts:8](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/pornsok/PornsOkContracts.ts#L8)

#### Inherited from

[`PornsOkVideoOutput`](PornsOkVideoOutput.md).[`totalViews`](PornsOkVideoOutput.md#totalviews)

***

### type

> **type**: `string`

Defined in: [packages/providers/pornsok/PornsOkContracts.ts:9](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/pornsok/PornsOkContracts.ts#L9)

#### Inherited from

[`PornsOkVideoOutput`](PornsOkVideoOutput.md).[`type`](PornsOkVideoOutput.md#type)

***

### starredBy?

> `optional` **starredBy?**: `string`[]

Defined in: [packages/providers/pornsok/PornsOkContracts.ts:10](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/pornsok/PornsOkContracts.ts#L10)

#### Inherited from

[`PornsOkVideoOutput`](PornsOkVideoOutput.md).[`starredBy`](PornsOkVideoOutput.md#starredby)

***

### categories?

> `optional` **categories?**: `string`[]

Defined in: [packages/providers/pornsok/PornsOkContracts.ts:11](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/pornsok/PornsOkContracts.ts#L11)

#### Inherited from

[`PornsOkVideoOutput`](PornsOkVideoOutput.md).[`categories`](PornsOkVideoOutput.md#categories)
