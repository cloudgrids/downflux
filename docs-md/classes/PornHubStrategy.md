[**downflux**](../README.md)

***

[downflux](../README.md) / PornHubStrategy

# Class: PornHubStrategy

Defined in: [packages/providers/pornhub/PornHubStrategy.ts:12](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/pornhub/PornHubStrategy.ts#L12)

Provides PornHub-specific HTTP behavior.

## Remarks

Strategies isolate host fallbacks, headers, and transport quirks from shared HTTP clients.

## Extends

- [`BaseStrategy`](BaseStrategy.md)

## Constructors

### Constructor

> **new PornHubStrategy**(`progressManager`): `PornHubStrategy`

Defined in: [packages/base/BaseStrategy.ts:15](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseStrategy.ts#L15)

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

Defined in: [packages/base/BaseStrategy.ts:15](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseStrategy.ts#L15)

#### Inherited from

[`XnXXStrategy`](XnXXStrategy.md).[`progressManager`](XnXXStrategy.md#progressmanager)

## Methods

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

Defined in: [packages/providers/pornhub/PornHubStrategy.ts:25](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/pornhub/PornHubStrategy.ts#L25)

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

Defined in: [packages/providers/pornhub/PornHubStrategy.ts:29](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/pornhub/PornHubStrategy.ts#L29)

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

Defined in: [packages/providers/pornhub/PornHubStrategy.ts:33](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/pornhub/PornHubStrategy.ts#L33)

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

Defined in: [packages/providers/pornhub/PornHubStrategy.ts:41](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/pornhub/PornHubStrategy.ts#L41)

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

Defined in: [packages/providers/pornhub/PornHubStrategy.ts:47](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/pornhub/PornHubStrategy.ts#L47)

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

Defined in: [packages/providers/pornhub/PornHubStrategy.ts:54](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/providers/pornhub/PornHubStrategy.ts#L54)

#### Parameters

##### body

`string`

##### opts

[`DownloadOptions`](../interfaces/DownloadOptions.md)

#### Returns

`string` \| `null`

#### Overrides

[`BaseStrategy`](BaseStrategy.md).[`getDirectVideoUrlFromText`](BaseStrategy.md#getdirectvideourlfromtext)
