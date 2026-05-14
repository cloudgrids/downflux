[**downflux**](../README.md)

***

[downflux](../README.md) / PornHubStrategy

# Class: PornHubStrategy

Defined in: [packages/providers/pornhub/PornHubStrategy.ts:6](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/pornhub/PornHubStrategy.ts#L6)

## Extends

- [`BaseStrategy`](BaseStrategy.md)

## Constructors

### Constructor

> **new PornHubStrategy**(`progressManager`): `PornHubStrategy`

Defined in: [packages/base/BaseStrategy.ts:7](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseStrategy.ts#L7)

#### Parameters

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`PornHubStrategy`

#### Inherited from

[`BaseStrategy`](BaseStrategy.md).[`constructor`](BaseStrategy.md#constructor)

## Properties

### progressManager

> `protected` `readonly` **progressManager**: [`ProgressManager`](ProgressManager.md)

Defined in: [packages/base/BaseStrategy.ts:7](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseStrategy.ts#L7)

#### Inherited from

[`XnXXStrategy`](XnXXStrategy.md).[`progressManager`](XnXXStrategy.md#progressmanager)

## Methods

### constructPathname()

> `protected` **constructPathname**(`url`): `string`

Defined in: [packages/base/BaseStrategy.ts:41](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseStrategy.ts#L41)

#### Parameters

##### url

`URL`

#### Returns

`string`

#### Inherited from

[`BaseStrategy`](BaseStrategy.md).[`constructPathname`](BaseStrategy.md#constructpathname)

***

### getHostFallbackUrls()

> **getHostFallbackUrls**(`url`): `string`[]

Defined in: [packages/providers/pornhub/PornHubStrategy.ts:19](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/pornhub/PornHubStrategy.ts#L19)

#### Parameters

##### url

`string`

#### Returns

`string`[]

#### Overrides

[`BaseStrategy`](BaseStrategy.md).[`getHostFallbackUrls`](BaseStrategy.md#gethostfallbackurls)

***

### shouldFallback404()

> **shouldFallback404**(`url`): `boolean`

Defined in: [packages/providers/pornhub/PornHubStrategy.ts:23](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/pornhub/PornHubStrategy.ts#L23)

#### Parameters

##### url

`string`

#### Returns

`boolean`

#### Overrides

[`BaseStrategy`](BaseStrategy.md).[`shouldFallback404`](BaseStrategy.md#shouldfallback404)

***

### getFallbackUrl()

> **getFallbackUrl**(`url`): `string` \| `null`

Defined in: [packages/providers/pornhub/PornHubStrategy.ts:27](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/pornhub/PornHubStrategy.ts#L27)

#### Parameters

##### url

`string`

#### Returns

`string` \| `null`

#### Overrides

[`BaseStrategy`](BaseStrategy.md).[`getFallbackUrl`](BaseStrategy.md#getfallbackurl)

***

### shouldReExtract()

> **shouldReExtract**(`url`): `boolean`

Defined in: [packages/providers/pornhub/PornHubStrategy.ts:35](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/pornhub/PornHubStrategy.ts#L35)

#### Parameters

##### url

`string`

#### Returns

`boolean`

#### Overrides

[`BaseStrategy`](BaseStrategy.md).[`shouldReExtract`](BaseStrategy.md#shouldreextract)

***

### shouldResolveTextResponse()

> **shouldResolveTextResponse**(`url`, `contentType`): `boolean`

Defined in: [packages/providers/pornhub/PornHubStrategy.ts:41](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/pornhub/PornHubStrategy.ts#L41)

#### Parameters

##### url

`string`

##### contentType

`string`

#### Returns

`boolean`

#### Overrides

[`BaseStrategy`](BaseStrategy.md).[`shouldResolveTextResponse`](BaseStrategy.md#shouldresolvetextresponse)

***

### getDirectVideoUrlFromText()

> **getDirectVideoUrlFromText**(`body`, `opts`): `string` \| `null`

Defined in: [packages/providers/pornhub/PornHubStrategy.ts:48](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/pornhub/PornHubStrategy.ts#L48)

#### Parameters

##### body

`string`

##### opts

[`DownloadOptions`](../interfaces/DownloadOptions.md)

#### Returns

`string` \| `null`

#### Overrides

[`BaseStrategy`](BaseStrategy.md).[`getDirectVideoUrlFromText`](BaseStrategy.md#getdirectvideourlfromtext)
