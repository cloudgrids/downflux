[**downflux**](../README.md)

***

[downflux](../README.md) / BaseParser

# Class: BaseParser

Defined in: [packages/base/BaseParser.ts:15](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L15)

Default HTML parser shared by provider-specific parsers.

## Remarks

Parsers exist to keep extraction rules close to the HTML they understand.
The base parser collects common page fields such as anchors, images, meta
tags, and source URLs, while provider parsers add the site-specific fields
needed by transformers and pipelines.

## Extended by

- [`BeegParser`](BeegParser.md)
- [`BoKepPornParser`](BoKepPornParser.md)
- [`ColliderPornParser`](ColliderPornParser.md)
- [`CumLouderParser`](CumLouderParser.md)
- [`DaFreePornParser`](DaFreePornParser.md)
- [`DaNudeParser`](DaNudeParser.md)
- [`EpicGfsParser`](EpicGfsParser.md)
- [`EPornerParser`](EPornerParser.md)
- [`HqPornParser`](HqPornParser.md)
- [`InterracialParser`](InterracialParser.md)
- [`ItsPornParser`](ItsPornParser.md)
- [`Lesbian8Parser`](Lesbian8Parser.md)
- [`MegaTubeParser`](MegaTubeParser.md)
- [`MomVidsParser`](MomVidsParser.md)
- [`MyLustParser`](MyLustParser.md)
- [`OkPornParser`](OkPornParser.md)
- [`PerfectGirlsParser`](PerfectGirlsParser.md)
- [`Porn300Parser`](Porn300Parser.md)
- [`PornDoeParser`](PornDoeParser.md)
- [`PornHubParser`](PornHubParser.md)
- [`PornIdParser`](PornIdParser.md)
- [`PornOneParser`](PornOneParser.md)
- [`PornSevenParser`](PornSevenParser.md)
- [`PornsOkParser`](PornsOkParser.md)
- [`PussySpaceParser`](PussySpaceParser.md)
- [`SexVidParser`](SexVidParser.md)
- [`ShamelessParser`](ShamelessParser.md)
- [`SuperPornParser`](SuperPornParser.md)
- [`SxyPornParser`](SxyPornParser.md)
- [`TheyAreHugeParser`](TheyAreHugeParser.md)
- [`TnAFlixParser`](TnAFlixParser.md)
- [`TubeVSexParser`](TubeVSexParser.md)
- [`WallHavenParser`](WallHavenParser.md)
- [`XCafeParser`](XCafeParser.md)
- [`XDeguParser`](XDeguParser.md)
- [`XGroovyParser`](XGroovyParser.md)
- [`XHamsterParser`](XHamsterParser.md)
- [`XnXXParser`](XnXXParser.md)
- [`XozillaParser`](XozillaParser.md)
- [`XVideosParser`](XVideosParser.md)
- [`ZbPornParser`](ZbPornParser.md)
- [`ZzzTubeParser`](ZzzTubeParser.md)

## Constructors

### Constructor

> **new BaseParser**(): `BaseParser`

#### Returns

`BaseParser`

## Properties

### kvsResolver

> `protected` **kvsResolver**: [`KvsResolver`](KvsResolver.md)

Defined in: [packages/base/BaseParser.ts:16](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L16)

## Methods

### transform()

> **transform**(`html`, `sourceUrl`): `Partial`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\>

Defined in: [packages/base/BaseParser.ts:25](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L25)

Extracts common metadata from a fetched HTML document.

#### Parameters

##### html

`string`

Raw HTML returned by the HTTP engine.

##### sourceUrl

`string`

Final URL used as the metadata source.

#### Returns

`Partial`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\>

Common extracted fields used as the base provider result.

***

### extractScriptMethodInput()

> `protected` **extractScriptMethodInput**(`fnName`, `html`): `string` \| `null`

Defined in: [packages/base/BaseParser.ts:51](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L51)

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

***

### getFlashVars()

> `protected` **getFlashVars**(`html`): [`FlashVarsOutput`](../interfaces/FlashVarsOutput.md)

Defined in: [packages/base/BaseParser.ts:63](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L63)

Extracts KVS `flashVars` video metadata from inline scripts.

#### Parameters

##### html

`string`

HTML containing one or more KVS `flashVars` blocks.

#### Returns

[`FlashVarsOutput`](../interfaces/FlashVarsOutput.md)

Normalized KVS fields, video sources, previews, and timelines.

***

### extractElementText()

> `protected` **extractElementText**(`html`, `begin`, `end`, `fallback?`): `string`

Defined in: [packages/base/BaseParser.ts:187](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L187)

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

***

### extractElementTextPair()

> `protected` **extractElementTextPair**(`html`, `begin`, `end`, `pos?`): \[`string` \| `null`, `number`\]

Defined in: [packages/base/BaseParser.ts:196](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L196)

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

***

### extractAllPairs()

> `protected` **extractAllPairs**(`html`, `begin`, `end`): `Generator`\<`string`\>

Defined in: [packages/base/BaseParser.ts:205](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L205)

#### Parameters

##### html

`string`

##### begin

`string`

##### end

`string`

#### Returns

`Generator`\<`string`\>

***

### extractAll()

> `protected` **extractAll**(`html`, `rules`, `startPos?`): \[`Record`\<`string`, `string`\>, `number`\]

Defined in: [packages/base/BaseParser.ts:225](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L225)

#### Parameters

##### html

`string`

##### rules

\[`string`, `string`, `string`\][]

##### startPos?

`number` = `0`

#### Returns

\[`Record`\<`string`, `string`\>, `number`\]

***

### extractAnchors()

> `protected` **extractAnchors**(`html`, `sourceUrl?`): `string`[]

Defined in: [packages/base/BaseParser.ts:240](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L240)

#### Parameters

##### html

`string`

##### sourceUrl?

`string`

#### Returns

`string`[]

***

### extractAnchorTextsByHref()

> `protected` **extractAnchorTextsByHref**(`html`, `hrefPattern`): `string`[]

Defined in: [packages/base/BaseParser.ts:255](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L255)

#### Parameters

##### html

`string`

##### hrefPattern

`RegExp`

#### Returns

`string`[]

***

### extractImageUrls()

> `protected` **extractImageUrls**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:274](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L274)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractSourceUrls()

> `protected` **extractSourceUrls**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:290](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L290)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### collectElements()

> `protected` **collectElements**(`html`, `type`, `className?`): `Record`\<`string`, `string`\>[]

Defined in: [packages/base/BaseParser.ts:303](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L303)

#### Parameters

##### html

`string`

##### type

`string`

##### className?

`string`

#### Returns

`Record`\<`string`, `string`\>[]

***

### extractVideoPosters()

> `protected` **extractVideoPosters**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:324](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L324)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractDivHrefs()

> `protected` **extractDivHrefs**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:337](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L337)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractVideoUrls()

> `protected` **extractVideoUrls**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:347](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L347)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractAllUrls()

> `protected` **extractAllUrls**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:357](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L357)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractLinks()

> `protected` **extractLinks**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:361](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L361)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractMetaDescription()

> `protected` **extractMetaDescription**(`html`): `string`

Defined in: [packages/base/BaseParser.ts:373](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L373)

#### Parameters

##### html

`string`

#### Returns

`string`

***

### extractMetaNameContent()

> `protected` **extractMetaNameContent**(`html`, `value`): `string`

Defined in: [packages/base/BaseParser.ts:381](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L381)

#### Parameters

##### html

`string`

##### value

`string`

#### Returns

`string`

***

### extractMetaPropertyContent()

> `protected` **extractMetaPropertyContent**(`html`, `value`): `string`

Defined in: [packages/base/BaseParser.ts:389](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L389)

#### Parameters

##### html

`string`

##### value

`string`

#### Returns

`string`

***

### collectAnchors()

> `protected` **collectAnchors**(`html`, `options?`): `object`[]

Defined in: [packages/base/BaseParser.ts:397](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L397)

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

***

### extractMetaKeywords()

> `protected` **extractMetaKeywords**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:449](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L449)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractTitle()

> `protected` **extractTitle**(`html`): `string`

Defined in: [packages/base/BaseParser.ts:459](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L459)

#### Parameters

##### html

`string`

#### Returns

`string`

***

### resolveUrl()

> `protected` **resolveUrl**(`raw`, `base?`): `string` \| `null`

Defined in: [packages/base/BaseParser.ts:463](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L463)

#### Parameters

##### raw

`string`

##### base?

`string`

#### Returns

`string` \| `null`

***

### decodeHtmlEntities()

> `protected` **decodeHtmlEntities**(`str`): `string`

Defined in: [packages/base/BaseParser.ts:472](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L472)

#### Parameters

##### str

`string`

#### Returns

`string`

***

### extractByTag()

> `protected` **extractByTag**(`html`, `tag`, `options?`): `string`[]

Defined in: [packages/base/BaseParser.ts:483](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L483)

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

***

### extractOneByTag()

> `protected` **extractOneByTag**(`html`, `tag`, `options?`): `string` \| `null`

Defined in: [packages/base/BaseParser.ts:509](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L509)

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

***

### extractScriptsByType()

> `protected` **extractScriptsByType**(`html`, `type`): `string`[]

Defined in: [packages/base/BaseParser.ts:513](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L513)

#### Parameters

##### html

`string`

##### type

`string`

#### Returns

`string`[]

***

### extractByClass()

> `protected` **extractByClass**(`html`, `className`): `string`[]

Defined in: [packages/base/BaseParser.ts:531](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L531)

#### Parameters

##### html

`string`

##### className

`string`

#### Returns

`string`[]

***

### extractAttributes()

> `protected` **extractAttributes**(`html`, `tag`, `attr`): `string`[]

Defined in: [packages/base/BaseParser.ts:545](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L545)

#### Parameters

##### html

`string`

##### tag

`string`

##### attr

`string`

#### Returns

`string`[]

***

### extractSpans()

> `protected` **extractSpans**(`html`, `className?`): `string`[]

Defined in: [packages/base/BaseParser.ts:558](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L558)

#### Parameters

##### html

`string`

##### className?

`string`

#### Returns

`string`[]

***

### extractDivs()

> `protected` **extractDivs**(`html`, `className?`): `string`[]

Defined in: [packages/base/BaseParser.ts:562](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L562)

#### Parameters

##### html

`string`

##### className?

`string`

#### Returns

`string`[]

***

### extractAnchorsContent()

> `protected` **extractAnchorsContent**(`html`, `className?`): `string`[]

Defined in: [packages/base/BaseParser.ts:566](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L566)

#### Parameters

##### html

`string`

##### className?

`string`

#### Returns

`string`[]

***

### extractH2s()

> `protected` **extractH2s**(`html`, `className?`): `string`[]

Defined in: [packages/base/BaseParser.ts:570](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L570)

#### Parameters

##### html

`string`

##### className?

`string`

#### Returns

`string`[]

***

### extractH3s()

> `protected` **extractH3s**(`html`, `className?`): `string`[]

Defined in: [packages/base/BaseParser.ts:574](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L574)

#### Parameters

##### html

`string`

##### className?

`string`

#### Returns

`string`[]

***

### extractLists()

> `protected` **extractLists**(`html`, `className?`): `string`[]

Defined in: [packages/base/BaseParser.ts:578](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L578)

#### Parameters

##### html

`string`

##### className?

`string`

#### Returns

`string`[]

***

### extractBlocks()

> `protected` **extractBlocks**(`html`, `tag`, `className?`): `string`[]

Defined in: [packages/base/BaseParser.ts:582](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L582)

#### Parameters

##### html

`string`

##### tag

`string`

##### className?

`string`

#### Returns

`string`[]

***

### extractKeyValue()

> `protected` **extractKeyValue**(`html`, `keyPattern`, `valuePattern`): `Record`\<`string`, `string`\>

Defined in: [packages/base/BaseParser.ts:590](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L590)

#### Parameters

##### html

`string`

##### keyPattern

`RegExp`

##### valuePattern

`RegExp`

#### Returns

`Record`\<`string`, `string`\>

***

### collectByClassNames()

> `protected` **collectByClassNames**(`html`, `classNames`, `options?`): `any`[]

Defined in: [packages/base/BaseParser.ts:605](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseParser.ts#L605)

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
