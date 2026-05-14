[**downflux**](../README.md)

***

[downflux](../README.md) / BaseParser

# Class: BaseParser

Defined in: [packages/base/BaseParser.ts:6](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L6)

## Extended by

- [`BeegParser`](BeegParser.md)
- [`ColliderPornParser`](ColliderPornParser.md)
- [`CumLouderParser`](CumLouderParser.md)
- [`HqPornParser`](HqPornParser.md)
- [`Lesbian8Parser`](Lesbian8Parser.md)
- [`MegaTubeParser`](MegaTubeParser.md)
- [`OkPornParser`](OkPornParser.md)
- [`PerfectGirlsParser`](PerfectGirlsParser.md)
- [`Porn300Parser`](Porn300Parser.md)
- [`PornDoeParser`](PornDoeParser.md)
- [`PornHubParser`](PornHubParser.md)
- [`PornIdParser`](PornIdParser.md)
- [`PornOneParser`](PornOneParser.md)
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
- [`XGroovyParser`](XGroovyParser.md)
- [`XHamsterParser`](XHamsterParser.md)
- [`XnXXParser`](XnXXParser.md)
- [`XVideosParser`](XVideosParser.md)

## Constructors

### Constructor

> **new BaseParser**(): `BaseParser`

#### Returns

`BaseParser`

## Properties

### kvsResolver

> `protected` **kvsResolver**: [`KvsResolver`](KvsResolver.md)

Defined in: [packages/base/BaseParser.ts:7](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L7)

## Methods

### transform()

> **transform**(`html`, `sourceUrl`): `Partial`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\>

Defined in: [packages/base/BaseParser.ts:8](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L8)

#### Parameters

##### html

`string`

##### sourceUrl

`string`

#### Returns

`Partial`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\>

***

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

***

### getFlashVars()

> **getFlashVars**(`html`): [`FlashVarsOutput`](../interfaces/FlashVarsOutput.md)

Defined in: [packages/base/BaseParser.ts:33](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L33)

#### Parameters

##### html

`string`

#### Returns

[`FlashVarsOutput`](../interfaces/FlashVarsOutput.md)

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

***

### extractImageUrls()

> **extractImageUrls**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:237](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L237)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractSourceUrls()

> **extractSourceUrls**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:253](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L253)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractVideoPosters()

> **extractVideoPosters**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:266](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L266)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractDivHrefs()

> **extractDivHrefs**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:279](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L279)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractVideoUrls()

> **extractVideoUrls**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:289](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L289)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractAllUrls()

> **extractAllUrls**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:299](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L299)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractLinks()

> **extractLinks**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:303](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L303)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractMetaDescription()

> **extractMetaDescription**(`html`): `string`

Defined in: [packages/base/BaseParser.ts:315](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L315)

#### Parameters

##### html

`string`

#### Returns

`string`

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

***

### extractMetaKeywords()

> **extractMetaKeywords**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:391](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L391)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractTitle()

> **extractTitle**(`html`): `string`

Defined in: [packages/base/BaseParser.ts:401](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L401)

#### Parameters

##### html

`string`

#### Returns

`string`

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

***

### decodeHtmlEntities()

> **decodeHtmlEntities**(`str`): `string`

Defined in: [packages/base/BaseParser.ts:414](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseParser.ts#L414)

#### Parameters

##### str

`string`

#### Returns

`string`

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
