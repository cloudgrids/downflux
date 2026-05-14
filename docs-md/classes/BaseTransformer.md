[**downflux**](../README.md)

***

[downflux](../README.md) / BaseTransformer

# Class: BaseTransformer\<TExec, TResult\>

Defined in: [packages/base/BaseTransformer.ts:7](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseTransformer.ts#L7)

## Extended by

- [`BeegTransformer`](BeegTransformer.md)
- [`CumLouderTransformer`](CumLouderTransformer.md)
- [`HqPornTransformer`](HqPornTransformer.md)
- [`OkPornTransformer`](OkPornTransformer.md)
- [`PerfectGirlsTransformer`](PerfectGirlsTransformer.md)
- [`Porn300Transformer`](Porn300Transformer.md)
- [`PornDoeTransformer`](PornDoeTransformer.md)
- [`PornHubTransformer`](PornHubTransformer.md)
- [`PornOneTransformer`](PornOneTransformer.md)
- [`PornsOkTransformer`](PornsOkTransformer.md)
- [`PussySpaceTransformer`](PussySpaceTransformer.md)
- [`SexVidTransformer`](SexVidTransformer.md)
- [`SuperPornTransformer`](SuperPornTransformer.md)
- [`SxyPornTransformer`](SxyPornTransformer.md)
- [`TheyAreHugeTransformer`](TheyAreHugeTransformer.md)
- [`TnAFlixTransformer`](TnAFlixTransformer.md)
- [`WallHavenTransformer`](WallHavenTransformer.md)
- [`XGroovyTransformer`](XGroovyTransformer.md)
- [`XHamsterTransformer`](XHamsterTransformer.md)
- [`XnXXTransformer`](XnXXTransformer.md)
- [`XVideosTransformer`](XVideosTransformer.md)

## Type Parameters

### TExec

`TExec` *extends* [`ExecutionArgs`](../interfaces/ExecutionArgs.md)

### TResult

`TResult` = [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)

## Constructors

### Constructor

> **new BaseTransformer**\<`TExec`, `TResult`\>(`httpClient`, `progressManager`): `BaseTransformer`\<`TExec`, `TResult`\>

Defined in: [packages/base/BaseTransformer.ts:8](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseTransformer.ts#L8)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`BaseTransformer`\<`TExec`, `TResult`\>

## Properties

### httpClient

> `protected` `readonly` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: [packages/base/BaseTransformer.ts:9](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseTransformer.ts#L9)

***

### progressManager

> `protected` `readonly` **progressManager**: [`ProgressManager`](ProgressManager.md)

Defined in: [packages/base/BaseTransformer.ts:10](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseTransformer.ts#L10)

## Methods

### transform()

> **transform**(`url`, `request?`): `Promise`\<`TResult`\>

Defined in: [packages/base/BaseTransformer.ts:13](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseTransformer.ts#L13)

#### Parameters

##### url

`string`

##### request?

`TExec`

#### Returns

`Promise`\<`TResult`\>

***

### requestData()

> **requestData**(`url`, `opts`): `Promise`\<`any`\>

Defined in: [packages/base/BaseTransformer.ts:29](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseTransformer.ts#L29)

#### Parameters

##### url

`string`

##### opts

[`DownloadOptions`](../interfaces/DownloadOptions.md)

#### Returns

`Promise`\<`any`\>
