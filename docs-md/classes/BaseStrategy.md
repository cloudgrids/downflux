[**downflux**](../README.md)

***

[downflux](../README.md) / BaseStrategy

# Class: BaseStrategy

Defined in: [packages/base/BaseStrategy.ts:6](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseStrategy.ts#L6)

## Extended by

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

Defined in: [packages/base/BaseStrategy.ts:7](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseStrategy.ts#L7)

#### Parameters

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`BaseStrategy`

## Properties

### progressManager

> `protected` `readonly` **progressManager**: [`ProgressManager`](ProgressManager.md)

Defined in: [packages/base/BaseStrategy.ts:7](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseStrategy.ts#L7)

## Methods

### shouldFallback404()

> **shouldFallback404**(`url`): `boolean`

Defined in: [packages/base/BaseStrategy.ts:9](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseStrategy.ts#L9)

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

Defined in: [packages/base/BaseStrategy.ts:13](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseStrategy.ts#L13)

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

Defined in: [packages/base/BaseStrategy.ts:17](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseStrategy.ts#L17)

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

Defined in: [packages/base/BaseStrategy.ts:29](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseStrategy.ts#L29)

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

Defined in: [packages/base/BaseStrategy.ts:33](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseStrategy.ts#L33)

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

Defined in: [packages/base/BaseStrategy.ts:37](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseStrategy.ts#L37)

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

Defined in: [packages/base/BaseStrategy.ts:41](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseStrategy.ts#L41)

#### Parameters

##### url

`URL`

#### Returns

`string`
