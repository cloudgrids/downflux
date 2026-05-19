[**downflux**](../README.md)

***

[downflux](../README.md) / BaseStrategy

# Class: BaseStrategy

Defined in: [packages/base/BaseStrategy.ts:14](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseStrategy.ts#L14)

Default provider transport strategy.

## Remarks

Strategies exist for provider-specific HTTP behavior that does not belong in
parsers or pipelines, such as host fallbacks, direct URL resolution, expired
URL re-extraction, or text responses that should be treated as redirects.

## Extended by

- [`EPornerStrategy`](EPornerStrategy.md)
- [`MyLustStrategy`](MyLustStrategy.md)
- [`PerfectGirlsStrategy`](PerfectGirlsStrategy.md)
- [`Porn300Strategy`](Porn300Strategy.md)
- [`PornDoeStrategy`](PornDoeStrategy.md)
- [`PornHubStrategy`](PornHubStrategy.md)
- [`PornOneStrategy`](PornOneStrategy.md)
- [`XGroovyStrategy`](XGroovyStrategy.md)
- [`XHamsterStrategy`](XHamsterStrategy.md)
- [`XnXXStrategy`](XnXXStrategy.md)
- [`XVideosStrategy`](XVideosStrategy.md)

## Implements

- [`ServiceStrategy`](../interfaces/ServiceStrategy.md)

## Constructors

### Constructor

> **new BaseStrategy**(`progressManager`): `BaseStrategy`

Defined in: [packages/base/BaseStrategy.ts:15](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseStrategy.ts#L15)

#### Parameters

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`BaseStrategy`

## Properties

### progressManager

> `protected` `readonly` **progressManager**: [`ProgressManager`](ProgressManager.md)

Defined in: [packages/base/BaseStrategy.ts:15](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseStrategy.ts#L15)

## Methods

### shouldFallback404()

> **shouldFallback404**(`url`): `boolean`

Defined in: [packages/base/BaseStrategy.ts:17](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseStrategy.ts#L17)

#### Parameters

##### url

`string`

#### Returns

`boolean`

#### Implementation of

[`ServiceStrategy`](../interfaces/ServiceStrategy.md).[`shouldFallback404`](../interfaces/ServiceStrategy.md#shouldfallback404)

***

### getDirectVideoUrlFromText()

> **getDirectVideoUrlFromText**(`body`, `opts`): `string` \| `null`

Defined in: [packages/base/BaseStrategy.ts:21](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseStrategy.ts#L21)

#### Parameters

##### body

`string`

##### opts

[`DownloadOptions`](../interfaces/DownloadOptions.md)

#### Returns

`string` \| `null`

#### Implementation of

[`ServiceStrategy`](../interfaces/ServiceStrategy.md).[`getDirectVideoUrlFromText`](../interfaces/ServiceStrategy.md#getdirectvideourlfromtext)

***

### getHostFallbackUrls()

> **getHostFallbackUrls**(`url`, `subDomains?`): `string`[]

Defined in: [packages/base/BaseStrategy.ts:25](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseStrategy.ts#L25)

#### Parameters

##### url

`string`

##### subDomains?

`string`[] = `[]`

#### Returns

`string`[]

#### Implementation of

[`ServiceStrategy`](../interfaces/ServiceStrategy.md).[`getHostFallbackUrls`](../interfaces/ServiceStrategy.md#gethostfallbackurls)

***

### getFallbackUrl()

> **getFallbackUrl**(`url`): `string` \| `null`

Defined in: [packages/base/BaseStrategy.ts:37](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseStrategy.ts#L37)

#### Parameters

##### url

`string`

#### Returns

`string` \| `null`

#### Implementation of

[`ServiceStrategy`](../interfaces/ServiceStrategy.md).[`getFallbackUrl`](../interfaces/ServiceStrategy.md#getfallbackurl)

***

### shouldReExtract()

> **shouldReExtract**(`url`): `boolean`

Defined in: [packages/base/BaseStrategy.ts:41](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseStrategy.ts#L41)

#### Parameters

##### url

`string`

#### Returns

`boolean`

#### Implementation of

[`ServiceStrategy`](../interfaces/ServiceStrategy.md).[`shouldReExtract`](../interfaces/ServiceStrategy.md#shouldreextract)

***

### shouldResolveTextResponse()

> **shouldResolveTextResponse**(`url`, `contentType`): `boolean`

Defined in: [packages/base/BaseStrategy.ts:45](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseStrategy.ts#L45)

#### Parameters

##### url

`string`

##### contentType

`string`

#### Returns

`boolean`

#### Implementation of

[`ServiceStrategy`](../interfaces/ServiceStrategy.md).[`shouldResolveTextResponse`](../interfaces/ServiceStrategy.md#shouldresolvetextresponse)

***

### constructPathname()

> `protected` **constructPathname**(`url`): `string`

Defined in: [packages/base/BaseStrategy.ts:49](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/base/BaseStrategy.ts#L49)

#### Parameters

##### url

`URL`

#### Returns

`string`
