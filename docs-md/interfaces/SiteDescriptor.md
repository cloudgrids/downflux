[**downflux**](../README.md)

***

[downflux](../README.md) / SiteDescriptor

# Interface: SiteDescriptor

Defined in: [util/interfaces/common/SiteDescriptor.ts:5](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/SiteDescriptor.ts#L5)

## Properties

### category

> **category**: `string`

Defined in: [util/interfaces/common/SiteDescriptor.ts:6](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/SiteDescriptor.ts#L6)

***

### pattern

> **pattern**: `RegExp`

Defined in: [util/interfaces/common/SiteDescriptor.ts:7](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/SiteDescriptor.ts#L7)

***

### urlType?

> `optional` **urlType?**: [`UrlType`](../enumerations/UrlType.md)

Defined in: [util/interfaces/common/SiteDescriptor.ts:8](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/SiteDescriptor.ts#L8)

***

### transform?

> `optional` **transform?**: (`ctx`) => `Partial`\<[`DefaultExtractorResult`](DefaultExtractorResult.md)\>

Defined in: [util/interfaces/common/SiteDescriptor.ts:9](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/SiteDescriptor.ts#L9)

#### Parameters

##### ctx

###### html

`string`

###### finalUrl

`string`

###### parser

`HtmlParserService`

###### match

`RegExpMatchArray`

#### Returns

`Partial`\<[`DefaultExtractorResult`](DefaultExtractorResult.md)\>
