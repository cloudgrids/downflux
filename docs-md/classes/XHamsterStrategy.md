[**downflux**](../README.md)

***

[downflux](../README.md) / XHamsterStrategy

# Class: XHamsterStrategy

Defined in: [packages/providers/xhamster/XHamsterStrategy.ts:9](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/xhamster/XHamsterStrategy.ts#L9)

Provides XHamster-specific HTTP behavior.

## Remarks

Strategies isolate host fallbacks, headers, and transport quirks from shared HTTP clients.

## Extends

- [`BaseStrategy`](BaseStrategy.md)

## Constructors

### Constructor

> **new XHamsterStrategy**(`progressManager`): `XHamsterStrategy`

Defined in: [packages/base/BaseStrategy.ts:15](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseStrategy.ts#L15)

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

Defined in: [packages/base/BaseStrategy.ts:15](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseStrategy.ts#L15)

#### Inherited from

[`BaseStrategy`](BaseStrategy.md).[`progressManager`](BaseStrategy.md#progressmanager)

## Methods

### shouldFallback404()

> **shouldFallback404**(`url`): `boolean`

Defined in: [packages/base/BaseStrategy.ts:17](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseStrategy.ts#L17)

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

Defined in: [packages/base/BaseStrategy.ts:37](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseStrategy.ts#L37)

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

Defined in: [packages/base/BaseStrategy.ts:41](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseStrategy.ts#L41)

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

Defined in: [packages/base/BaseStrategy.ts:49](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseStrategy.ts#L49)

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

Defined in: [packages/providers/xhamster/XHamsterStrategy.ts:12](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/xhamster/XHamsterStrategy.ts#L12)

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

Defined in: [packages/providers/xhamster/XHamsterStrategy.ts:16](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/xhamster/XHamsterStrategy.ts#L16)

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

Defined in: [packages/providers/xhamster/XHamsterStrategy.ts:20](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/xhamster/XHamsterStrategy.ts#L20)

#### Parameters

##### body

`string`

#### Returns

`string` \| `null`

#### Overrides

[`BaseStrategy`](BaseStrategy.md).[`getDirectVideoUrlFromText`](BaseStrategy.md#getdirectvideourlfromtext)
