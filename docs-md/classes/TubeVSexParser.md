[**downflux**](../README.md)

***

[downflux](../README.md) / TubeVSexParser

# Class: TubeVSexParser

Defined in: [packages/providers/tubevsex/TubeVSexParser.ts:7](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/tubevsex/TubeVSexParser.ts#L7)

## Extends

- [`BaseParser`](BaseParser.md)

## Constructors

### Constructor

> **new TubeVSexParser**(): `TubeVSexParser`

#### Returns

`TubeVSexParser`

#### Inherited from

[`BaseParser`](BaseParser.md).[`constructor`](BaseParser.md#constructor)

## Properties

### kvsResolver

> `protected` **kvsResolver**: [`KvsResolver`](KvsResolver.md)

Defined in: [packages/base/BaseParser.ts:7](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L7)

#### Inherited from

[`BaseParser`](BaseParser.md).[`kvsResolver`](BaseParser.md#kvsresolver)

## Methods

### extractScriptMethodInput()

> **extractScriptMethodInput**(`fnName`, `html`): `string` \| `null`

Defined in: [packages/base/BaseParser.ts:27](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L27)

#### Parameters

##### fnName

`string`

##### html

`string`

#### Returns

`string` \| `null`

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractScriptMethodInput`](BaseParser.md#extractscriptmethodinput)

***

### getFlashVars()

> **getFlashVars**(`html`): [`FlashVarsOutput`](../interfaces/FlashVarsOutput.md)

Defined in: [packages/base/BaseParser.ts:33](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L33)

#### Parameters

##### html

`string`

#### Returns

[`FlashVarsOutput`](../interfaces/FlashVarsOutput.md)

#### Inherited from

[`BaseParser`](BaseParser.md).[`getFlashVars`](BaseParser.md#getflashvars)

***

### extractElementText()

> **extractElementText**(`html`, `begin`, `end`, `fallback?`): `string`

Defined in: [packages/base/BaseParser.ts:150](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L150)

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

> **extractElementTextPair**(`html`, `begin`, `end`, `pos?`): \[`string` \| `null`, `number`\]

Defined in: [packages/base/BaseParser.ts:159](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L159)

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

> **extractAllPairs**(`html`, `begin`, `end`): `Generator`\<`string`\>

Defined in: [packages/base/BaseParser.ts:168](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L168)

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

> **extractAll**(`html`, `rules`, `startPos?`): \[`Record`\<`string`, `string`\>, `number`\]

Defined in: [packages/base/BaseParser.ts:188](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L188)

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

> **extractAnchors**(`html`, `sourceUrl?`): `string`[]

Defined in: [packages/base/BaseParser.ts:203](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L203)

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

> **extractAnchorTextsByHref**(`html`, `hrefPattern`): `string`[]

Defined in: [packages/base/BaseParser.ts:218](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L218)

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

> **extractImageUrls**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:237](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L237)

#### Parameters

##### html

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractImageUrls`](BaseParser.md#extractimageurls)

***

### extractSourceUrls()

> **extractSourceUrls**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:253](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L253)

#### Parameters

##### html

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractSourceUrls`](BaseParser.md#extractsourceurls)

***

### extractVideoPosters()

> **extractVideoPosters**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:266](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L266)

#### Parameters

##### html

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractVideoPosters`](BaseParser.md#extractvideoposters)

***

### extractDivHrefs()

> **extractDivHrefs**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:279](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L279)

#### Parameters

##### html

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractDivHrefs`](BaseParser.md#extractdivhrefs)

***

### extractVideoUrls()

> **extractVideoUrls**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:289](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L289)

#### Parameters

##### html

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractVideoUrls`](BaseParser.md#extractvideourls)

***

### extractAllUrls()

> **extractAllUrls**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:299](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L299)

#### Parameters

##### html

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractAllUrls`](BaseParser.md#extractallurls)

***

### extractLinks()

> **extractLinks**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:303](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L303)

#### Parameters

##### html

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractLinks`](BaseParser.md#extractlinks)

***

### extractMetaDescription()

> **extractMetaDescription**(`html`): `string`

Defined in: [packages/base/BaseParser.ts:315](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L315)

#### Parameters

##### html

`string`

#### Returns

`string`

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractMetaDescription`](BaseParser.md#extractmetadescription)

***

### extractMetaNameContent()

> **extractMetaNameContent**(`html`, `value`): `string`

Defined in: [packages/base/BaseParser.ts:323](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L323)

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

> **extractMetaPropertyContent**(`html`, `value`): `string`

Defined in: [packages/base/BaseParser.ts:331](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L331)

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

> **collectAnchors**(`html`, `options?`): `object`[]

Defined in: [packages/base/BaseParser.ts:339](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L339)

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

> **extractMetaKeywords**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:391](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L391)

#### Parameters

##### html

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractMetaKeywords`](BaseParser.md#extractmetakeywords)

***

### extractTitle()

> **extractTitle**(`html`): `string`

Defined in: [packages/base/BaseParser.ts:401](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L401)

#### Parameters

##### html

`string`

#### Returns

`string`

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractTitle`](BaseParser.md#extracttitle)

***

### resolveUrl()

> **resolveUrl**(`raw`, `base?`): `string` \| `null`

Defined in: [packages/base/BaseParser.ts:405](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L405)

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

> **decodeHtmlEntities**(`str`): `string`

Defined in: [packages/base/BaseParser.ts:414](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L414)

#### Parameters

##### str

`string`

#### Returns

`string`

#### Inherited from

[`BaseParser`](BaseParser.md).[`decodeHtmlEntities`](BaseParser.md#decodehtmlentities)

***

### extractByTag()

> **extractByTag**(`html`, `tag`, `options?`): `string`[]

Defined in: [packages/base/BaseParser.ts:425](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L425)

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

> **extractOneByTag**(`html`, `tag`, `options?`): `string` \| `null`

Defined in: [packages/base/BaseParser.ts:451](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L451)

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

> **extractScriptsByType**(`html`, `type`): `string`[]

Defined in: [packages/base/BaseParser.ts:455](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L455)

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

> **extractByClass**(`html`, `className`): `string`[]

Defined in: [packages/base/BaseParser.ts:473](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L473)

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

> **extractAttributes**(`html`, `tag`, `attr`): `string`[]

Defined in: [packages/base/BaseParser.ts:487](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L487)

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

> **extractSpans**(`html`, `className?`): `string`[]

Defined in: [packages/base/BaseParser.ts:500](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L500)

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

> **extractDivs**(`html`, `className?`): `string`[]

Defined in: [packages/base/BaseParser.ts:504](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L504)

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

> **extractAnchorsContent**(`html`, `className?`): `string`[]

Defined in: [packages/base/BaseParser.ts:508](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L508)

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

> **extractH2s**(`html`, `className?`): `string`[]

Defined in: [packages/base/BaseParser.ts:512](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L512)

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

> **extractH3s**(`html`, `className?`): `string`[]

Defined in: [packages/base/BaseParser.ts:516](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L516)

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

> **extractLists**(`html`, `className?`): `string`[]

Defined in: [packages/base/BaseParser.ts:520](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L520)

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

> **extractBlocks**(`html`, `tag`, `className?`): `string`[]

Defined in: [packages/base/BaseParser.ts:524](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L524)

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

> **extractKeyValue**(`html`, `keyPattern`, `valuePattern`): `Record`\<`string`, `string`\>

Defined in: [packages/base/BaseParser.ts:532](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L532)

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

> **collectByClassNames**(`html`, `classNames`, `options?`): `any`[]

Defined in: [packages/base/BaseParser.ts:547](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L547)

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

> **transform**(`html`, `sourceUrl`): `Partial`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`Partial`\<[`TubeVSexOutput`](../interfaces/TubeVSexOutput.md)\>\>\>

Defined in: [packages/providers/tubevsex/TubeVSexParser.ts:8](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/tubevsex/TubeVSexParser.ts#L8)

#### Parameters

##### html

`string`

##### sourceUrl

`string`

#### Returns

`Partial`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`Partial`\<[`TubeVSexOutput`](../interfaces/TubeVSexOutput.md)\>\>\>

#### Overrides

[`BaseParser`](BaseParser.md).[`transform`](BaseParser.md#transform)
