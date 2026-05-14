[**downflux**](../README.md)

***

[downflux](../README.md) / BaseParser

# Class: BaseParser

Defined in: [packages/base/BaseParser.ts:6](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L6)

## Extended by

- [`BeegParser`](BeegParser.md)
- [`CumLouderParser`](CumLouderParser.md)
- [`HqPornParser`](HqPornParser.md)
- [`OkPornParser`](OkPornParser.md)
- [`PerfectGirlsParser`](PerfectGirlsParser.md)
- [`Porn300Parser`](Porn300Parser.md)
- [`PornDoeParser`](PornDoeParser.md)
- [`PornHubParser`](PornHubParser.md)
- [`PornOneParser`](PornOneParser.md)
- [`PornsOkParser`](PornsOkParser.md)
- [`PussySpaceParser`](PussySpaceParser.md)
- [`SexVidParser`](SexVidParser.md)
- [`SuperPornParser`](SuperPornParser.md)
- [`SxyPornParser`](SxyPornParser.md)
- [`TheyAreHugeParser`](TheyAreHugeParser.md)
- [`TnAFlixParser`](TnAFlixParser.md)
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

Defined in: [packages/base/BaseParser.ts:7](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L7)

## Methods

### transform()

> **transform**(`html`, `sourceUrl`): `Partial`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\>

Defined in: [packages/base/BaseParser.ts:8](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L8)

#### Parameters

##### html

`string`

##### sourceUrl

`string`

#### Returns

`Partial`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\>

***

### getFlashVars()

> **getFlashVars**(`html`): [`FlashVarsOutput`](../interfaces/FlashVarsOutput.md)

Defined in: [packages/base/BaseParser.ts:27](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L27)

#### Parameters

##### html

`string`

#### Returns

[`FlashVarsOutput`](../interfaces/FlashVarsOutput.md)

***

### extractElementText()

> **extractElementText**(`html`, `begin`, `end`, `fallback?`): `string`

Defined in: [packages/base/BaseParser.ts:83](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L83)

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

Defined in: [packages/base/BaseParser.ts:92](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L92)

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

Defined in: [packages/base/BaseParser.ts:101](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L101)

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

Defined in: [packages/base/BaseParser.ts:121](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L121)

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

Defined in: [packages/base/BaseParser.ts:136](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L136)

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

Defined in: [packages/base/BaseParser.ts:151](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L151)

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

Defined in: [packages/base/BaseParser.ts:170](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L170)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractSourceUrls()

> **extractSourceUrls**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:186](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L186)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractVideoPosters()

> **extractVideoPosters**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:199](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L199)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractDivHrefs()

> **extractDivHrefs**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:212](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L212)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractVideoUrls()

> **extractVideoUrls**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:222](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L222)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractAllUrls()

> **extractAllUrls**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:232](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L232)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractLinks()

> **extractLinks**(`html`): `string`[]

Defined in: [packages/base/BaseParser.ts:236](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L236)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractMetaDescription()

> **extractMetaDescription**(`html`): `string`

Defined in: [packages/base/BaseParser.ts:248](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L248)

#### Parameters

##### html

`string`

#### Returns

`string`

***

### extractMetaNameContent()

> **extractMetaNameContent**(`html`, `value`): `string`

Defined in: [packages/base/BaseParser.ts:256](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L256)

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

Defined in: [packages/base/BaseParser.ts:264](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L264)

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

Defined in: [packages/base/BaseParser.ts:272](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L272)

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

Defined in: [packages/base/BaseParser.ts:324](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L324)

#### Parameters

##### html

`string`

#### Returns

`string`[]

***

### extractTitle()

> **extractTitle**(`html`): `string`

Defined in: [packages/base/BaseParser.ts:334](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L334)

#### Parameters

##### html

`string`

#### Returns

`string`

***

### resolveUrl()

> **resolveUrl**(`raw`, `base?`): `string` \| `null`

Defined in: [packages/base/BaseParser.ts:338](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L338)

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

Defined in: [packages/base/BaseParser.ts:347](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L347)

#### Parameters

##### str

`string`

#### Returns

`string`

***

### extractByTag()

> **extractByTag**(`html`, `tag`, `options?`): `string`[]

Defined in: [packages/base/BaseParser.ts:358](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L358)

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

Defined in: [packages/base/BaseParser.ts:384](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L384)

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

Defined in: [packages/base/BaseParser.ts:388](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L388)

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

Defined in: [packages/base/BaseParser.ts:406](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L406)

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

Defined in: [packages/base/BaseParser.ts:420](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L420)

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

Defined in: [packages/base/BaseParser.ts:433](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L433)

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

Defined in: [packages/base/BaseParser.ts:437](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L437)

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

Defined in: [packages/base/BaseParser.ts:441](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L441)

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

Defined in: [packages/base/BaseParser.ts:445](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L445)

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

Defined in: [packages/base/BaseParser.ts:449](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L449)

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

Defined in: [packages/base/BaseParser.ts:453](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L453)

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

Defined in: [packages/base/BaseParser.ts:457](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L457)

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

Defined in: [packages/base/BaseParser.ts:465](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L465)

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

Defined in: [packages/base/BaseParser.ts:480](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseParser.ts#L480)

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
