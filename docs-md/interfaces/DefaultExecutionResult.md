[**downflux**](../README.md)

***

[downflux](../README.md) / DefaultExecutionResult

# Interface: DefaultExecutionResult\<TCustomFields\>

Defined in: [packages/contracts/ExecutionContracts.ts:107](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/ExecutionContracts.ts#L107)

Default output structure for extractor operations.
Represents normalized metadata and extracted resources.

## Type Parameters

### TCustomFields

`TCustomFields` = `unknown`

## Properties

### title

> **title**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:109](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/ExecutionContracts.ts#L109)

Page title

***

### description

> **description**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:112](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/ExecutionContracts.ts#L112)

Page description

***

### keywords

> **keywords**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:115](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/ExecutionContracts.ts#L115)

SEO keywords

***

### status

> **status**: `number`

Defined in: [packages/contracts/ExecutionContracts.ts:118](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/ExecutionContracts.ts#L118)

HTTP status code

***

### sourceUrl

> **sourceUrl**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:121](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/ExecutionContracts.ts#L121)

Final resolved URL

***

### anchors

> **anchors**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:124](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/ExecutionContracts.ts#L124)

Anchor links

***

### images

> **images**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:127](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/ExecutionContracts.ts#L127)

Image URLs

***

### sources

> **sources**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:130](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/ExecutionContracts.ts#L130)

Media source URLs

***

### videos

> **videos**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:133](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/ExecutionContracts.ts#L133)

Video URLs

***

### links

> **links**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:136](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/ExecutionContracts.ts#L136)

Hyper links

***

### videoPosters?

> `optional` **videoPosters?**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:139](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/ExecutionContracts.ts#L139)

Video poster URLs

***

### divHREFs?

> `optional` **divHREFs?**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:142](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/ExecutionContracts.ts#L142)

URLs extracted from div href attributes

***

### allUrls?

> `optional` **allUrls?**: `string`[]

Defined in: [packages/contracts/ExecutionContracts.ts:145](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/ExecutionContracts.ts#L145)

All discovered URLs

***

### extractionTarget?

> `optional` **extractionTarget?**: [`ExtractionTarget`](../enumerations/ExtractionTarget.md)

Defined in: [packages/contracts/ExecutionContracts.ts:148](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/ExecutionContracts.ts#L148)

URL category for pipeline routing

***

### customFields?

> `optional` **customFields?**: `TCustomFields`

Defined in: [packages/contracts/ExecutionContracts.ts:151](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/contracts/ExecutionContracts.ts#L151)

Extensible service-specific fields
