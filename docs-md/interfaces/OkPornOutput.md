[**downflux**](../README.md)

***

[downflux](../README.md) / OkPornOutput

# Interface: OkPornOutput

Defined in: [packages/providers/okporn/OkPornContracts.ts:160](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L160)

Combined OkPorn output structure.
Used for broad internal service typing.

## Extends

- [`DefaultExecutionResult`](DefaultExecutionResult.md).[`OkPornAlbumOutput`](OkPornAlbumOutput.md).[`OkPornVideoOutput`](OkPornVideoOutput.md).[`OkPornModelOutput`](OkPornModelOutput.md).[`OkPornModelVideoIdsOutput`](OkPornModelVideoIdsOutput.md)

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

[`OkPornVideoOutput`](OkPornVideoOutput.md).[`tags`](OkPornVideoOutput.md#tags)

***

### pageUrl

> **pageUrl**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:189](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L189)

Model listing page URL

#### Inherited from

[`OkPornVideoOutput`](OkPornVideoOutput.md).[`pageUrl`](OkPornVideoOutput.md#pageurl)

***

### poster

> **poster**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:198](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L198)

#### Inherited from

[`OkPornVideoOutput`](OkPornVideoOutput.md).[`poster`](OkPornVideoOutput.md#poster)

***

### videos

> **videos**: [`VideosFormat`](VideosFormat.md)

Defined in: [packages/contracts/ExecutionContracts.ts:199](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/contracts/ExecutionContracts.ts#L199)

#### Inherited from

[`OkPornVideoOutput`](OkPornVideoOutput.md).[`videos`](OkPornVideoOutput.md#videos)

***

### modelName

> **modelName**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:23](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L23)

Model name associated with the album

#### Inherited from

[`OkPornAlbumOutput`](OkPornAlbumOutput.md).[`modelName`](OkPornAlbumOutput.md#modelname)

***

### starredModels

> **starredModels**: `string`[]

Defined in: [packages/providers/okporn/OkPornContracts.ts:26](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L26)

Starred models associated with the album

#### Inherited from

[`OkPornAlbumOutput`](OkPornAlbumOutput.md).[`starredModels`](OkPornAlbumOutput.md#starredmodels)

***

### albumId

> **albumId**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:29](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L29)

Album identifier

#### Inherited from

[`OkPornAlbumOutput`](OkPornAlbumOutput.md).[`albumId`](OkPornAlbumOutput.md#albumid)

***

### albumTitle

> **albumTitle**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:32](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L32)

Album title

#### Inherited from

[`OkPornAlbumOutput`](OkPornAlbumOutput.md).[`albumTitle`](OkPornAlbumOutput.md#albumtitle)

***

### albumDescription

> **albumDescription**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:35](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L35)

Album description

#### Inherited from

[`OkPornAlbumOutput`](OkPornAlbumOutput.md).[`albumDescription`](OkPornAlbumOutput.md#albumdescription)

***

### albumKeywords

> **albumKeywords**: `string`[]

Defined in: [packages/providers/okporn/OkPornContracts.ts:38](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L38)

Album keywords

#### Inherited from

[`OkPornAlbumOutput`](OkPornAlbumOutput.md).[`albumKeywords`](OkPornAlbumOutput.md#albumkeywords)

***

### albumUrl

> **albumUrl**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:41](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L41)

Album page URL

#### Inherited from

[`OkPornAlbumOutput`](OkPornAlbumOutput.md).[`albumUrl`](OkPornAlbumOutput.md#albumurl)

***

### albumThumbnail

> **albumThumbnail**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:44](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L44)

Album thumbnail URL

#### Inherited from

[`OkPornAlbumOutput`](OkPornAlbumOutput.md).[`albumThumbnail`](OkPornAlbumOutput.md#albumthumbnail)

***

### albumImages

> **albumImages**: `string`[]

Defined in: [packages/providers/okporn/OkPornContracts.ts:47](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L47)

Album image URLs

#### Inherited from

[`OkPornAlbumOutput`](OkPornAlbumOutput.md).[`albumImages`](OkPornAlbumOutput.md#albumimages)

***

### albumImageCount

> **albumImageCount**: `number`

Defined in: [packages/providers/okporn/OkPornContracts.ts:50](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L50)

Album image count

#### Inherited from

[`OkPornAlbumOutput`](OkPornAlbumOutput.md).[`albumImageCount`](OkPornAlbumOutput.md#albumimagecount)

***

### videoId

> **videoId**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:59](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L59)

Video identifier

#### Inherited from

[`OkPornVideoOutput`](OkPornVideoOutput.md).[`videoId`](OkPornVideoOutput.md#videoid)

***

### videoScreenshot

> **videoScreenshot**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:62](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L62)

Screenshot image URL

#### Inherited from

[`OkPornVideoOutput`](OkPornVideoOutput.md).[`videoScreenshot`](OkPornVideoOutput.md#videoscreenshot)

***

### videoCreatedAt?

> `optional` **videoCreatedAt?**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:65](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L65)

Video creation date text

#### Inherited from

[`OkPornVideoOutput`](OkPornVideoOutput.md).[`videoCreatedAt`](OkPornVideoOutput.md#videocreatedat)

***

### author

> **author**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:68](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L68)

Author name associated with the video

#### Inherited from

[`OkPornVideoOutput`](OkPornVideoOutput.md).[`author`](OkPornVideoOutput.md#author)

***

### fullVideoSource?

> `optional` **fullVideoSource?**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:71](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L71)

Full source URL when available

#### Inherited from

[`OkPornVideoOutput`](OkPornVideoOutput.md).[`fullVideoSource`](OkPornVideoOutput.md#fullvideosource)

***

### videoAlbumId?

> `optional` **videoAlbumId?**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:74](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L74)

Album identifier linked to the video

#### Inherited from

[`OkPornVideoOutput`](OkPornVideoOutput.md).[`videoAlbumId`](OkPornVideoOutput.md#videoalbumid)

***

### videoAlbum?

> `optional` **videoAlbum?**: [`OkPornAlbumOutput`](OkPornAlbumOutput.md)

Defined in: [packages/providers/okporn/OkPornContracts.ts:77](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L77)

Album metadata linked to the video

#### Inherited from

[`OkPornVideoOutput`](OkPornVideoOutput.md).[`videoAlbum`](OkPornVideoOutput.md#videoalbum)

***

### starredBy

> **starredBy**: `string`[]

Defined in: [packages/providers/okporn/OkPornContracts.ts:80](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L80)

Starred by list

#### Inherited from

[`OkPornVideoOutput`](OkPornVideoOutput.md).[`starredBy`](OkPornVideoOutput.md#starredby)

***

### videoCount

> **videoCount**: `number`

Defined in: [packages/providers/okporn/OkPornContracts.ts:130](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L130)

Number of video cards found

#### Inherited from

[`OkPornModelVideoIdsOutput`](OkPornModelVideoIdsOutput.md).[`videoCount`](OkPornModelVideoIdsOutput.md#videocount)

***

### videoCards

> **videoCards**: [`OkPornModelVideoCard`](OkPornModelVideoCard.md)[]

Defined in: [packages/providers/okporn/OkPornContracts.ts:136](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L136)

Video cards found on the page

#### Inherited from

[`OkPornModelVideoIdsOutput`](OkPornModelVideoIdsOutput.md).[`videoCards`](OkPornModelVideoIdsOutput.md#videocards)

***

### pageTitle

> **pageTitle**: `string`

Defined in: [packages/providers/okporn/OkPornContracts.ts:144](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L144)

Model listing page title

#### Inherited from

[`OkPornModelOutput`](OkPornModelOutput.md).[`pageTitle`](OkPornModelOutput.md#pagetitle)

***

### modelUrls

> **modelUrls**: `string`[]

Defined in: [packages/providers/okporn/OkPornContracts.ts:150](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L150)

Model URLs or path values

#### Inherited from

[`OkPornModelOutput`](OkPornModelOutput.md).[`modelUrls`](OkPornModelOutput.md#modelurls)

***

### modelCount

> **modelCount**: `number`

Defined in: [packages/providers/okporn/OkPornContracts.ts:153](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/providers/okporn/OkPornContracts.ts#L153)

Number of models found

#### Inherited from

[`OkPornModelOutput`](OkPornModelOutput.md).[`modelCount`](OkPornModelOutput.md#modelcount)
