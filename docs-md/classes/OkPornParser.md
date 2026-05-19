[**downflux**](../README.md)

***

[downflux](../README.md) / OkPornParser

# Class: OkPornParser

Defined in: [packages/providers/okporn/OkPornParser.ts:14](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/okporn/OkPornParser.ts#L14)

Extracts OkPorn-specific metadata from fetched HTML.

## Remarks

Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.

## Extends

- [`BaseParser`](BaseParser.md)

## Constructors

### Constructor

> **new OkPornParser**(): `OkPornParser`

#### Returns

`OkPornParser`

#### Inherited from

[`BaseParser`](BaseParser.md).[`constructor`](BaseParser.md#constructor)

## Properties

### kvsResolver

> `protected` **kvsResolver**: [`KvsResolver`](KvsResolver.md)

Defined in: [packages/base/BaseParser.ts:16](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L16)

#### Inherited from

[`BaseParser`](BaseParser.md).[`kvsResolver`](BaseParser.md#kvsresolver)

## Methods

### extractScriptMethodInput()

> `protected` **extractScriptMethodInput**(`fnName`, `html`): `string` \| `null`

Defined in: [packages/base/BaseParser.ts:51](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L51)

Extracts the first string argument passed to a named script function.

#### Parameters

##### fnName

`string`

Function name to search for.

##### html

`string`

HTML or script text to inspect.

#### Returns

`string` \| `null`

The first string argument, or `null` when the call is absent.

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractScriptMethodInput`](BaseParser.md#extractscriptmethodinput)

***

### getFlashVars()

> `protected` **getFlashVars**(`html`): [`FlashVarsOutput`](../interfaces/FlashVarsOutput.md)

Defined in: [packages/base/BaseParser.ts:63](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L63)

Extracts KVS `flashVars` video metadata from inline scripts.

#### Parameters

##### html

`string`

HTML containing one or more KVS `flashVars` blocks.

#### Returns

[`FlashVarsOutput`](../interfaces/FlashVarsOutput.md)

Normalized KVS fields, video sources, previews, and timelines.

#### Inherited from

[`BaseParser`](BaseParser.md).[`getFlashVars`](BaseParser.md#getflashvars)

***

### extractElementText()

> `protected` **extractElementText**(`html`, `begin`, `end`, `fallback?`): `string`

Defined in: [packages/base/BaseParser.ts:187](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L187)

#### Parameters

##### html

`string`

##### begin

`string`

##### end

`string`

##### fallback?

`string` = `''`

#### Returns

`string`

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractElementText`](BaseParser.md#extractelementtext)

***

### extractElementTextPair()

> `protected` **extractElementTextPair**(`html`, `begin`, `end`, `pos?`): \[`string` \| `null`, `number`\]

Defined in: [packages/base/BaseParser.ts:196](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L196)

#### Parameters

##### html

`string`

##### begin

`string`

##### end

`string`

##### pos?

`number` = `0`

#### Returns

\[`string` \| `null`, `number`\]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractElementTextPair`](BaseParser.md#extractelementtextpair)

***

### extractAllPairs()

> `protected` **extractAllPairs**(`html`, `begin`, `end`): `Generator`\<`string`\>

Defined in: [packages/base/BaseParser.ts:205](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L205)

#### Parameters

##### html

`string`

##### begin

`string`

##### end

`string`

#### Returns

`Generator`\<`string`\>

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractAllPairs`](BaseParser.md#extractallpairs)

***

### extractAll()

> `protected` **extractAll**(`html`, `rules`, `startPos?`): \[`Record`\<`string`, `string`\>, `number`\]

Defined in: [packages/base/BaseParser.ts:225](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L225)

#### Parameters

##### html

`string`

##### rules

\[`string`, `string`, `string`\][]

##### startPos?

`number` = `0`

#### Returns

\[`Record`\<`string`, `string`\>, `number`\]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractAll`](BaseParser.md#extractall)

***

### extractAnchors()

> `protected` **extractAnchors**(`html`, `sourceUrl?`): `string`[]

Defined in: [packages/base/BaseParser.ts:240](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L240)

#### Parameters

##### html

`string`

##### sourceUrl?

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractAnchors`](BaseParser.md#extractanchors)

***

### extractAnchorTextsByHref()

> `protected` **extractAnchorTextsByHref**(`html`, `hrefPattern`): `string`[]

Defined in: [packages/base/BaseParser.ts:255](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L255)

#### Parameters

##### html

`string`

##### hrefPattern

`RegExp`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractAnchorTextsByHref`](BaseParser.md#extractanchortextsbyhref)

***

### extractImageUrls()

> `protected` **extractImageUrls**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:274](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L274)

#### Parameters

##### html

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractImageUrls`](BaseParser.md#extractimageurls)

***

### extractSourceUrls()

> `protected` **extractSourceUrls**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:290](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L290)

#### Parameters

##### html

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractSourceUrls`](BaseParser.md#extractsourceurls)

***

### collectElements()

> `protected` **collectElements**(`html`, `type`, `className?`): `Record`\<`string`, `string`\>[]

Defined in: [packages/base/BaseParser.ts:303](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L303)

#### Parameters

##### html

`string`

##### type

`string`

##### className?

`string`

#### Returns

`Record`\<`string`, `string`\>[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`collectElements`](BaseParser.md#collectelements)

***

### extractVideoPosters()

> `protected` **extractVideoPosters**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:324](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L324)

#### Parameters

##### html

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractVideoPosters`](BaseParser.md#extractvideoposters)

***

### extractDivHrefs()

> `protected` **extractDivHrefs**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:337](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L337)

#### Parameters

##### html

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractDivHrefs`](BaseParser.md#extractdivhrefs)

***

### extractVideoUrls()

> `protected` **extractVideoUrls**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:347](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L347)

#### Parameters

##### html

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractVideoUrls`](BaseParser.md#extractvideourls)

***

### extractAllUrls()

> `protected` **extractAllUrls**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:357](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L357)

#### Parameters

##### html

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractAllUrls`](BaseParser.md#extractallurls)

***

### extractLinks()

> `protected` **extractLinks**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:361](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L361)

#### Parameters

##### html

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractLinks`](BaseParser.md#extractlinks)

***

### extractMetaDescription()

> `protected` **extractMetaDescription**(`html`): `string`

Defined in: [packages/base/BaseParser.ts:373](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L373)

#### Parameters

##### html

`string`

#### Returns

`string`

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractMetaDescription`](BaseParser.md#extractmetadescription)

***

### extractMetaNameContent()

> `protected` **extractMetaNameContent**(`html`, `value`): `string`

Defined in: [packages/base/BaseParser.ts:381](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L381)

#### Parameters

##### html

`string`

##### value

`string`

#### Returns

`string`

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractMetaNameContent`](BaseParser.md#extractmetanamecontent)

***

### extractMetaPropertyContent()

> `protected` **extractMetaPropertyContent**(`html`, `value`): `string`

Defined in: [packages/base/BaseParser.ts:389](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L389)

#### Parameters

##### html

`string`

##### value

`string`

#### Returns

`string`

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractMetaPropertyContent`](BaseParser.md#extractmetapropertycontent)

***

### collectAnchors()

> `protected` **collectAnchors**(`html`, `options?`): `object`[]

Defined in: [packages/base/BaseParser.ts:397](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L397)

#### Parameters

##### html

`string`

##### options?

###### sourceUrl?

`string`

###### className?

`string`

###### hrefPattern?

`RegExp`

#### Returns

`object`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`collectAnchors`](BaseParser.md#collectanchors)

***

### extractMetaKeywords()

> `protected` **extractMetaKeywords**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:449](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L449)

#### Parameters

##### html

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractMetaKeywords`](BaseParser.md#extractmetakeywords)

***

### extractTitle()

> `protected` **extractTitle**(`html`): `string`

Defined in: [packages/base/BaseParser.ts:459](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L459)

#### Parameters

##### html

`string`

#### Returns

`string`

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractTitle`](BaseParser.md#extracttitle)

***

### resolveUrl()

> `protected` **resolveUrl**(`raw`, `base?`): `string` \| `null`

Defined in: [packages/base/BaseParser.ts:463](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L463)

#### Parameters

##### raw

`string`

##### base?

`string`

#### Returns

`string` \| `null`

#### Inherited from

[`BaseParser`](BaseParser.md).[`resolveUrl`](BaseParser.md#resolveurl)

***

### decodeHtmlEntities()

> `protected` **decodeHtmlEntities**(`str`): `string`

Defined in: [packages/base/BaseParser.ts:472](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L472)

#### Parameters

##### str

`string`

#### Returns

`string`

#### Inherited from

[`BaseParser`](BaseParser.md).[`decodeHtmlEntities`](BaseParser.md#decodehtmlentities)

***

### extractByTag()

> `protected` **extractByTag**(`html`, `tag`, `options?`): `string`[]

Defined in: [packages/base/BaseParser.ts:483](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L483)

#### Parameters

##### html

`string`

##### tag

`string`

##### options?

###### className?

`string`

###### attribute?

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractByTag`](BaseParser.md#extractbytag)

***

### extractOneByTag()

> `protected` **extractOneByTag**(`html`, `tag`, `options?`): `string` \| `null`

Defined in: [packages/base/BaseParser.ts:509](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L509)

#### Parameters

##### html

`string`

##### tag

`string`

##### options?

###### className?

`string`

#### Returns

`string` \| `null`

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractOneByTag`](BaseParser.md#extractonebytag)

***

### extractScriptsByType()

> `protected` **extractScriptsByType**(`html`, `type`): `string`[]

Defined in: [packages/base/BaseParser.ts:513](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L513)

#### Parameters

##### html

`string`

##### type

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractScriptsByType`](BaseParser.md#extractscriptsbytype)

***

### extractByClass()

> `protected` **extractByClass**(`html`, `className`): `string`[]

Defined in: [packages/base/BaseParser.ts:531](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L531)

#### Parameters

##### html

`string`

##### className

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractByClass`](BaseParser.md#extractbyclass)

***

### extractAttributes()

> `protected` **extractAttributes**(`html`, `tag`, `attr`): `string`[]

Defined in: [packages/base/BaseParser.ts:545](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L545)

#### Parameters

##### html

`string`

##### tag

`string`

##### attr

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractAttributes`](BaseParser.md#extractattributes)

***

### extractSpans()

> `protected` **extractSpans**(`html`, `className?`): `string`[]

Defined in: [packages/base/BaseParser.ts:558](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L558)

#### Parameters

##### html

`string`

##### className?

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractSpans`](BaseParser.md#extractspans)

***

### extractDivs()

> `protected` **extractDivs**(`html`, `className?`): `string`[]

Defined in: [packages/base/BaseParser.ts:562](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L562)

#### Parameters

##### html

`string`

##### className?

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractDivs`](BaseParser.md#extractdivs)

***

### extractAnchorsContent()

> `protected` **extractAnchorsContent**(`html`, `className?`): `string`[]

Defined in: [packages/base/BaseParser.ts:566](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L566)

#### Parameters

##### html

`string`

##### className?

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractAnchorsContent`](BaseParser.md#extractanchorscontent)

***

### extractH2s()

> `protected` **extractH2s**(`html`, `className?`): `string`[]

Defined in: [packages/base/BaseParser.ts:570](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L570)

#### Parameters

##### html

`string`

##### className?

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractH2s`](BaseParser.md#extracth2s)

***

### extractH3s()

> `protected` **extractH3s**(`html`, `className?`): `string`[]

Defined in: [packages/base/BaseParser.ts:574](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L574)

#### Parameters

##### html

`string`

##### className?

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractH3s`](BaseParser.md#extracth3s)

***

### extractLists()

> `protected` **extractLists**(`html`, `className?`): `string`[]

Defined in: [packages/base/BaseParser.ts:578](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L578)

#### Parameters

##### html

`string`

##### className?

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractLists`](BaseParser.md#extractlists)

***

### extractBlocks()

> `protected` **extractBlocks**(`html`, `tag`, `className?`): `string`[]

Defined in: [packages/base/BaseParser.ts:582](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L582)

#### Parameters

##### html

`string`

##### tag

`string`

##### className?

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractBlocks`](BaseParser.md#extractblocks)

***

### extractKeyValue()

> `protected` **extractKeyValue**(`html`, `keyPattern`, `valuePattern`): `Record`\<`string`, `string`\>

Defined in: [packages/base/BaseParser.ts:590](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L590)

#### Parameters

##### html

`string`

##### keyPattern

`RegExp`

##### valuePattern

`RegExp`

#### Returns

`Record`\<`string`, `string`\>

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractKeyValue`](BaseParser.md#extractkeyvalue)

***

### collectByClassNames()

> `protected` **collectByClassNames**(`html`, `classNames`, `options?`): `any`[]

Defined in: [packages/base/BaseParser.ts:605](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseParser.ts#L605)

#### Parameters

##### html

`string`

##### classNames

`string` \| `string`[]

##### options?

###### includeInnerHTML?

`boolean`

###### attributes?

`string`[]

###### sourceUrl?

`string`

#### Returns

`any`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`collectByClassNames`](BaseParser.md#collectbyclassnames)

***

### transform()

> **transform**(`html`, `sourceUrl`): `Partial`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`Partial`\<[`OkPornOutput`](../interfaces/OkPornOutput.md)\>\>\>

Defined in: [packages/providers/okporn/OkPornParser.ts:15](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/okporn/OkPornParser.ts#L15)

Extracts common metadata from a fetched HTML document.

#### Parameters

##### html

`string`

Raw HTML returned by the HTTP engine.

##### sourceUrl

`string`

Final URL used as the metadata source.

#### Returns

`Partial`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`Partial`\<[`OkPornOutput`](../interfaces/OkPornOutput.md)\>\>\>

Common extracted fields used as the base provider result.

#### Overrides

[`BaseParser`](BaseParser.md).[`transform`](BaseParser.md#transform)

***

### extractVideoCards()

> **extractVideoCards**(`html`, `sourceUrl?`): [`OkPornModelVideoCard`](../interfaces/OkPornModelVideoCard.md)[]

Defined in: [packages/providers/okporn/OkPornParser.ts:49](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/okporn/OkPornParser.ts#L49)

#### Parameters

##### html

`string`

##### sourceUrl?

`string`

#### Returns

[`OkPornModelVideoCard`](../interfaces/OkPornModelVideoCard.md)[]

***

### extractCustomTitle()

> **extractCustomTitle**(`html`): `string`

Defined in: [packages/providers/okporn/OkPornParser.ts:77](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/okporn/OkPornParser.ts#L77)

#### Parameters

##### html

`string`

#### Returns

`string`

***

### extractStarredModels()

> **extractStarredModels**(`html`, `sourceUrl?`): `object`[]

Defined in: [packages/providers/okporn/OkPornParser.ts:81](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/okporn/OkPornParser.ts#L81)

#### Parameters

##### html

`string`

##### sourceUrl?

`string`

#### Returns

`object`[]

***

### getVideoInfo()

> **getVideoInfo**(`html`): `any`

Defined in: [packages/providers/okporn/OkPornParser.ts:97](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/okporn/OkPornParser.ts#L97)

#### Parameters

##### html

`string`

#### Returns

`any`
