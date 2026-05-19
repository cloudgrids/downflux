[**downflux**](../README.md)

***

[downflux](../README.md) / TubeVSexOutput

# Interface: TubeVSexOutput

Defined in: [packages/providers/tubevsex/TubeVSexContracts.ts:4](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/tubevsex/TubeVSexContracts.ts#L4)

Default output structure for extractor operations.
Represents normalized metadata and extracted resources.

## Extends

- [`DefaultExecutionResult`](DefaultExecutionResult.md).[`TubeVSexVideoOutput`](TubeVSexVideoOutput.md)

## Properties

### title

> **title**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:140](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L140)

Page title

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`title`](DefaultExecutionResult.md#title)

***

### description

> **description**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:143](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L143)

Page description

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`description`](DefaultExecutionResult.md#description)

***

### keywords

> **keywords**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:146](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L146)

SEO keywords

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`keywords`](DefaultExecutionResult.md#keywords)

***

### status

> **status**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:149](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L149)

HTTP status code

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`status`](DefaultExecutionResult.md#status)

***

### sourceUrl

> **sourceUrl**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:152](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L152)

Final resolved URL

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`sourceUrl`](DefaultExecutionResult.md#sourceurl)

***

### anchors

> **anchors**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:155](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L155)

Anchor links

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`anchors`](DefaultExecutionResult.md#anchors)

***

### images

> **images**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:158](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L158)

Image URLs

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`images`](DefaultExecutionResult.md#images)

***

### sources

> **sources**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:161](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L161)

Media source URLs

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`sources`](DefaultExecutionResult.md#sources)

***

### videoSources

> **videoSources**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:164](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L164)

Video URLs

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`videoSources`](DefaultExecutionResult.md#videosources)

***

### links

> **links**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:167](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L167)

Hyper links

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`links`](DefaultExecutionResult.md#links)

***

### videoPosters?

> `optional` **videoPosters?**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:170](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L170)

Video poster URLs

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`videoPosters`](DefaultExecutionResult.md#videoposters)

***

### divHREFs?

> `optional` **divHREFs?**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:173](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L173)

URLs extracted from div href attributes

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`divHREFs`](DefaultExecutionResult.md#divhrefs)

***

### allUrls?

> `optional` **allUrls?**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:176](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L176)

All discovered URLs

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`allUrls`](DefaultExecutionResult.md#allurls)

***

### extractionTarget?

> `optional` **extractionTarget?**: [`ExtractionTarget`](../enumerations/ExtractionTarget.md)

Defined in: [packages/contracts/ExecutionContracts.ts:179](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L179)

URL category for pipeline routing

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`extractionTarget`](DefaultExecutionResult.md#extractiontarget)

***

### customFields?

> `optional` **customFields?**: `unknown`

Defined in: [packages/contracts/ExecutionContracts.ts:182](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L182)

Extensible service-specific fields

#### Inherited from

[`DefaultExecutionResult`](DefaultExecutionResult.md).[`customFields`](DefaultExecutionResult.md#customfields)

***

### tags

> **tags**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:187](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L187)

#### Inherited from

[`TubeVSexVideoOutput`](TubeVSexVideoOutput.md).[`tags`](TubeVSexVideoOutput.md#tags)

***

### pageUrl

> **pageUrl**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:189](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L189)

#### Inherited from

[`TubeVSexVideoOutput`](TubeVSexVideoOutput.md).[`pageUrl`](TubeVSexVideoOutput.md#pageurl)

***

### poster

> **poster**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:198](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L198)

#### Inherited from

[`TubeVSexVideoOutput`](TubeVSexVideoOutput.md).[`poster`](TubeVSexVideoOutput.md#poster)

***

### videos

> **videos**: [`VideosFormat`](VideosFormat.md)

Defined in: [packages/contracts/ExecutionContracts.ts:199](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L199)

#### Inherited from

[`TubeVSexVideoOutput`](TubeVSexVideoOutput.md).[`videos`](TubeVSexVideoOutput.md#videos)

***

### videoId

> **videoId**: `string`

Defined in: [packages/providers/tubevsex/TubeVSexContracts.ts:7](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/tubevsex/TubeVSexContracts.ts#L7)

#### Inherited from

[`TubeVSexVideoOutput`](TubeVSexVideoOutput.md).[`videoId`](TubeVSexVideoOutput.md#videoid)

***

### width

> **width**: `string`

Defined in: [packages/providers/tubevsex/TubeVSexContracts.ts:8](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/tubevsex/TubeVSexContracts.ts#L8)

#### Inherited from

[`TubeVSexVideoOutput`](TubeVSexVideoOutput.md).[`width`](TubeVSexVideoOutput.md#width)

***

### height

> **height**: `string`

Defined in: [packages/providers/tubevsex/TubeVSexContracts.ts:9](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/tubevsex/TubeVSexContracts.ts#L9)

#### Inherited from

[`TubeVSexVideoOutput`](TubeVSexVideoOutput.md).[`height`](TubeVSexVideoOutput.md#height)

***

### duration

> **duration**: `string`

Defined in: [packages/providers/tubevsex/TubeVSexContracts.ts:10](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/tubevsex/TubeVSexContracts.ts#L10)

#### Inherited from

[`TubeVSexVideoOutput`](TubeVSexVideoOutput.md).[`duration`](TubeVSexVideoOutput.md#duration)

***

### quality

> **quality**: `string`

Defined in: [packages/providers/tubevsex/TubeVSexContracts.ts:11](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/tubevsex/TubeVSexContracts.ts#L11)

#### Inherited from

[`TubeVSexVideoOutput`](TubeVSexVideoOutput.md).[`quality`](TubeVSexVideoOutput.md#quality)

***

### uploader

> **uploader**: `string`

Defined in: [packages/providers/tubevsex/TubeVSexContracts.ts:12](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/tubevsex/TubeVSexContracts.ts#L12)

#### Inherited from

[`TubeVSexVideoOutput`](TubeVSexVideoOutput.md).[`uploader`](TubeVSexVideoOutput.md#uploader)

***

### uploadedAt

> **uploadedAt**: `string`

Defined in: [packages/providers/tubevsex/TubeVSexContracts.ts:13](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/tubevsex/TubeVSexContracts.ts#L13)

#### Inherited from

[`TubeVSexVideoOutput`](TubeVSexVideoOutput.md).[`uploadedAt`](TubeVSexVideoOutput.md#uploadedat)

***

### categories

> **categories**: `string`[]

Defined in: [packages/providers/tubevsex/TubeVSexContracts.ts:14](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/tubevsex/TubeVSexContracts.ts#L14)

#### Inherited from

[`TubeVSexVideoOutput`](TubeVSexVideoOutput.md).[`categories`](TubeVSexVideoOutput.md#categories)
