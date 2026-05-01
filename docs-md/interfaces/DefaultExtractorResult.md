[**downflux**](../README.md)

***

[downflux](../README.md) / DefaultExtractorResult

# Interface: DefaultExtractorResult

Defined in: [util/interfaces/common/DefaultExtractorResult.ts:7](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DefaultExtractorResult.ts#L7)

Default output structure for extractor operations.
Represents normalized metadata and extracted resources.

## Properties

### title

> **title**: `string`

Defined in: [util/interfaces/common/DefaultExtractorResult.ts:9](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DefaultExtractorResult.ts#L9)

Page title

***

### description

> **description**: `string`

Defined in: [util/interfaces/common/DefaultExtractorResult.ts:12](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DefaultExtractorResult.ts#L12)

Page description

***

### keywords

> **keywords**: `string`[]

Defined in: [util/interfaces/common/DefaultExtractorResult.ts:15](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DefaultExtractorResult.ts#L15)

SEO keywords

***

### status

> **status**: `number`

Defined in: [util/interfaces/common/DefaultExtractorResult.ts:18](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DefaultExtractorResult.ts#L18)

HTTP status code

***

### baseUrl

> **baseUrl**: `string`

Defined in: [util/interfaces/common/DefaultExtractorResult.ts:21](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DefaultExtractorResult.ts#L21)

Final resolved URL

***

### anchors

> **anchors**: `string`[]

Defined in: [util/interfaces/common/DefaultExtractorResult.ts:24](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DefaultExtractorResult.ts#L24)

Anchor links

***

### images

> **images**: `string`[]

Defined in: [util/interfaces/common/DefaultExtractorResult.ts:27](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DefaultExtractorResult.ts#L27)

Image URLs

***

### sources

> **sources**: `string`[]

Defined in: [util/interfaces/common/DefaultExtractorResult.ts:30](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DefaultExtractorResult.ts#L30)

Media source URLs

***

### videoPosters?

> `optional` **videoPosters?**: `string`[]

Defined in: [util/interfaces/common/DefaultExtractorResult.ts:33](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DefaultExtractorResult.ts#L33)

Video poster URLs

***

### divHrefs?

> `optional` **divHrefs?**: `string`[]

Defined in: [util/interfaces/common/DefaultExtractorResult.ts:36](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DefaultExtractorResult.ts#L36)

URLs extracted from div href attributes

***

### allUrls?

> `optional` **allUrls?**: `string`[]

Defined in: [util/interfaces/common/DefaultExtractorResult.ts:39](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DefaultExtractorResult.ts#L39)

All discovered URLs

***

### urlType?

> `optional` **urlType?**: [`UrlType`](../enumerations/UrlType.md)

Defined in: [util/interfaces/common/DefaultExtractorResult.ts:42](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DefaultExtractorResult.ts#L42)

URL category for pipeline routing

***

### customFields?

> `optional` **customFields?**: `Record`\<`string`, `unknown`\>

Defined in: [util/interfaces/common/DefaultExtractorResult.ts:45](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DefaultExtractorResult.ts#L45)

Extensible service-specific fields
