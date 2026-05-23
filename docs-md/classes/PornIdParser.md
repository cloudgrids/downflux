[**downflux**](../README.md)

***

[downflux](../README.md) / PornIdParser

# Class: PornIdParser

Defined in: [packages/providers/pornid/PornIdParser.ts:13](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/pornid/PornIdParser.ts#L13)

Extracts PornId-specific metadata from fetched HTML.

## Remarks

Parsers keep DOM/string extraction separate from network and download code so provider page changes can be fixed in one place.

## Extends

- [`BaseParser`](BaseParser.md)

## Constructors

### Constructor

> **new PornIdParser**(): `PornIdParser`

#### Returns

`PornIdParser`

#### Inherited from

[`BaseParser`](BaseParser.md).[`constructor`](BaseParser.md#constructor)

## Properties

### kvsResolver

> `protected` **kvsResolver**: [`KvsResolver`](KvsResolver.md)

Defined in: [packages/base/BaseParser.ts:16](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L16)

#### Inherited from

[`BaseParser`](BaseParser.md).[`kvsResolver`](BaseParser.md#kvsresolver)

## Methods

### extractScriptMethodInput()

> `protected` **extractScriptMethodInput**(`fnName`, `html`): `string` \| `null`

Defined in: [packages/base/BaseParser.ts:54](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L54)

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

Defined in: [packages/base/BaseParser.ts:66](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L66)

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

Defined in: [packages/base/BaseParser.ts:190](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L190)

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

Defined in: [packages/base/BaseParser.ts:199](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L199)

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

Defined in: [packages/base/BaseParser.ts:208](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L208)

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

Defined in: [packages/base/BaseParser.ts:228](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L228)

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

Defined in: [packages/base/BaseParser.ts:243](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L243)

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

Defined in: [packages/base/BaseParser.ts:258](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L258)

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

> `protected` **extractImageUrls**(`html`, `sourceUrl?`): `string`[]

Defined in: [packages/base/BaseParser.ts:277](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L277)

#### Parameters

##### html

`string`

##### sourceUrl?

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractImageUrls`](BaseParser.md#extractimageurls)

***

### extractSourceUrls()

> `protected` **extractSourceUrls**(`html`, `sourceUrl?`): `string`[]

Defined in: [packages/base/BaseParser.ts:316](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L316)

#### Parameters

##### html

`string`

##### sourceUrl?

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractSourceUrls`](BaseParser.md#extractsourceurls)

***

### getFlashVarsVideo()

> `protected` **getFlashVarsVideo**(`html`, `sourceUrl`, `uploader?`, `starred?`): [`DefaultFlashVarsVideoOutput`](../interfaces/DefaultFlashVarsVideoOutput.md)

Defined in: [packages/base/BaseParser.ts:333](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L333)

#### Parameters

##### html

`string`

##### sourceUrl

`string`

##### uploader?

`string`

##### starred?

`string`[]

#### Returns

[`DefaultFlashVarsVideoOutput`](../interfaces/DefaultFlashVarsVideoOutput.md)

#### Inherited from

[`BaseParser`](BaseParser.md).[`getFlashVarsVideo`](BaseParser.md#getflashvarsvideo)

***

### collectElements()

> `protected` **collectElements**(`html`, `type`, `className?`): `Record`\<`string`, `string`\>[]

Defined in: [packages/base/BaseParser.ts:356](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L356)

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

> `protected` **extractVideoPosters**(`html`, `sourceUrl?`): `string`[]

Defined in: [packages/base/BaseParser.ts:377](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L377)

#### Parameters

##### html

`string`

##### sourceUrl?

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractVideoPosters`](BaseParser.md#extractvideoposters)

***

### extractDivHrefs()

> `protected` **extractDivHrefs**(`html`, `sourceUrl?`): `string`[]

Defined in: [packages/base/BaseParser.ts:394](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L394)

#### Parameters

##### html

`string`

##### sourceUrl?

`string`

#### Returns

`string`[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractDivHrefs`](BaseParser.md#extractdivhrefs)

***

### extractVideoUrls()

> `protected` **extractVideoUrls**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:405](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L405)

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

Defined in: [packages/base/BaseParser.ts:415](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L415)

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

Defined in: [packages/base/BaseParser.ts:419](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L419)

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

Defined in: [packages/base/BaseParser.ts:431](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L431)

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

Defined in: [packages/base/BaseParser.ts:439](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L439)

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

Defined in: [packages/base/BaseParser.ts:447](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L447)

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

Defined in: [packages/base/BaseParser.ts:455](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L455)

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

Defined in: [packages/base/BaseParser.ts:507](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L507)

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

Defined in: [packages/base/BaseParser.ts:517](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L517)

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

Defined in: [packages/base/BaseParser.ts:521](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L521)

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

### isHttpUrl()

> `protected` **isHttpUrl**(`url?`): `url is string`

Defined in: [packages/base/BaseParser.ts:530](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L530)

#### Parameters

##### url?

`string` \| `null`

#### Returns

`url is string`

#### Inherited from

[`BaseParser`](BaseParser.md).[`isHttpUrl`](BaseParser.md#ishttpurl)

***

### decodeHtmlEntities()

> `protected` **decodeHtmlEntities**(`str`): `string`

Defined in: [packages/base/BaseParser.ts:534](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L534)

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

Defined in: [packages/base/BaseParser.ts:545](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L545)

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

Defined in: [packages/base/BaseParser.ts:571](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L571)

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

> `protected` **extractScriptsByType**(`html`, `type`, `objectType?`): `Record`\<`string`, `any`\>[]

Defined in: [packages/base/BaseParser.ts:575](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L575)

#### Parameters

##### html

`string`

##### type

`string`

##### objectType?

`string`

#### Returns

`Record`\<`string`, `any`\>[]

#### Inherited from

[`BaseParser`](BaseParser.md).[`extractScriptsByType`](BaseParser.md#extractscriptsbytype)

***

### extractByClass()

> `protected` **extractByClass**(`html`, `className`): `string`[]

Defined in: [packages/base/BaseParser.ts:595](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L595)

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

Defined in: [packages/base/BaseParser.ts:609](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L609)

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

Defined in: [packages/base/BaseParser.ts:622](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L622)

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

Defined in: [packages/base/BaseParser.ts:626](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L626)

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

Defined in: [packages/base/BaseParser.ts:630](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L630)

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

Defined in: [packages/base/BaseParser.ts:634](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L634)

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

Defined in: [packages/base/BaseParser.ts:638](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L638)

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

Defined in: [packages/base/BaseParser.ts:642](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L642)

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

Defined in: [packages/base/BaseParser.ts:646](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L646)

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

Defined in: [packages/base/BaseParser.ts:654](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L654)

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

Defined in: [packages/base/BaseParser.ts:669](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseParser.ts#L669)

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

> **transform**(`html`, `sourceUrl`): `Partial`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`Partial`\<[`PornIdOutput`](../interfaces/PornIdOutput.md)\>\>\>

Defined in: [packages/providers/pornid/PornIdParser.ts:14](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/providers/pornid/PornIdParser.ts#L14)

Extracts common metadata from a fetched HTML document.

#### Parameters

##### html

`string`

Raw HTML returned by the HTTP engine.

##### sourceUrl

`string`

Final URL used as the metadata source.

#### Returns

`Partial`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`Partial`\<[`PornIdOutput`](../interfaces/PornIdOutput.md)\>\>\>

Common extracted fields used as the base provider result.

#### Overrides

[`BaseParser`](BaseParser.md).[`transform`](BaseParser.md#transform)
