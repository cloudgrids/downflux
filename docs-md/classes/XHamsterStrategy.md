[**downflux**](../README.md)

***

[downflux](../README.md) / XHamsterStrategy

# Class: XHamsterStrategy

Defined in: [packages/providers/xhamster/XHamsterStrategy.ts:3](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/xhamster/XHamsterStrategy.ts#L3)

## Extends

- [`BaseStrategy`](BaseStrategy.md)

## Constructors

### Constructor

> **new XHamsterStrategy**(`progressManager`): `XHamsterStrategy`

Defined in: [packages/base/BaseStrategy.ts:7](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseStrategy.ts#L7)

#### Parameters

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`XHamsterStrategy`

#### Inherited from

[`BaseStrategy`](BaseStrategy.md).[`constructor`](BaseStrategy.md#constructor)

## Properties

### progressManager

> `protected` `readonly` **progressManager**: [`ProgressManager`](ProgressManager.md)

Defined in: [packages/base/BaseStrategy.ts:7](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseStrategy.ts#L7)

#### Inherited from

[`BaseStrategy`](BaseStrategy.md).[`progressManager`](BaseStrategy.md#progressmanager)

## Methods

### shouldFallback404()

> **shouldFallback404**(`url`): `boolean`

Defined in: [packages/base/BaseStrategy.ts:9](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseStrategy.ts#L9)

#### Parameters

##### url

`string`

#### Returns

`boolean`

#### Inherited from

[`BaseStrategy`](BaseStrategy.md).[`shouldFallback404`](BaseStrategy.md#shouldfallback404)

***

### getFallbackUrl()

> **getFallbackUrl**(`url`): `string` \| `null`

Defined in: [packages/base/BaseStrategy.ts:29](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseStrategy.ts#L29)

#### Parameters

##### url

`string`

#### Returns

`string` \| `null`

#### Inherited from

[`BaseStrategy`](BaseStrategy.md).[`getFallbackUrl`](BaseStrategy.md#getfallbackurl)

***

### shouldReExtract()

> **shouldReExtract**(`url`): `boolean`

Defined in: [packages/base/BaseStrategy.ts:33](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseStrategy.ts#L33)

#### Parameters

##### url

`string`

#### Returns

`boolean`

#### Inherited from

[`BaseStrategy`](BaseStrategy.md).[`shouldReExtract`](BaseStrategy.md#shouldreextract)

***

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

Defined in: [packages/providers/xhamster/XHamsterStrategy.ts:6](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/xhamster/XHamsterStrategy.ts#L6)

#### Parameters

##### url

`string`

#### Returns

`string`[]

#### Overrides

[`BaseStrategy`](BaseStrategy.md).[`getHostFallbackUrls`](BaseStrategy.md#gethostfallbackurls)

***

### shouldResolveTextResponse()

> **shouldResolveTextResponse**(`url`, `contentType`): `boolean`

Defined in: [packages/providers/xhamster/XHamsterStrategy.ts:10](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/xhamster/XHamsterStrategy.ts#L10)

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

> **getDirectVideoUrlFromText**(`body`): `string` \| `null`

Defined in: [packages/providers/xhamster/XHamsterStrategy.ts:14](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/xhamster/XHamsterStrategy.ts#L14)

#### Parameters

##### body

`string`

#### Returns

`string` \| `null`

#### Overrides

[`BaseStrategy`](BaseStrategy.md).[`getDirectVideoUrlFromText`](BaseStrategy.md#getdirectvideourlfromtext)
