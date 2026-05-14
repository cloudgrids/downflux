[**downflux**](../README.md)

***

[downflux](../README.md) / XGroovyStrategy

# Class: XGroovyStrategy

Defined in: [packages/providers/xgroovy/XGroovyStrategy.ts:3](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/xgroovy/XGroovyStrategy.ts#L3)

## Extends

- [`BaseStrategy`](BaseStrategy.md)

## Constructors

### Constructor

> **new XGroovyStrategy**(`progressManager`): `XGroovyStrategy`

Defined in: [packages/base/BaseStrategy.ts:7](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseStrategy.ts#L7)

#### Parameters

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`XGroovyStrategy`

#### Inherited from

[`BaseStrategy`](BaseStrategy.md).[`constructor`](BaseStrategy.md#constructor)

## Properties

### progressManager

> `protected` `readonly` **progressManager**: [`ProgressManager`](ProgressManager.md)

Defined in: [packages/base/BaseStrategy.ts:7](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseStrategy.ts#L7)

#### Inherited from

[`BaseStrategy`](BaseStrategy.md).[`progressManager`](BaseStrategy.md#progressmanager)

## Methods

### shouldFallback404()

> **shouldFallback404**(`url`): `boolean`

Defined in: [packages/base/BaseStrategy.ts:9](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseStrategy.ts#L9)

#### Parameters

##### url

`string`

#### Returns

`boolean`

#### Inherited from

[`BaseStrategy`](BaseStrategy.md).[`shouldFallback404`](BaseStrategy.md#shouldfallback404)

***

### getDirectVideoUrlFromText()

> **getDirectVideoUrlFromText**(`body`, `opts`): `string` \| `null`

Defined in: [packages/base/BaseStrategy.ts:13](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseStrategy.ts#L13)

#### Parameters

##### body

`string`

##### opts

[`DownloadOptions`](../interfaces/DownloadOptions.md)

#### Returns

`string` \| `null`

#### Inherited from

[`BaseStrategy`](BaseStrategy.md).[`getDirectVideoUrlFromText`](BaseStrategy.md#getdirectvideourlfromtext)

***

### getFallbackUrl()

> **getFallbackUrl**(`url`): `string` \| `null`

Defined in: [packages/base/BaseStrategy.ts:29](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseStrategy.ts#L29)

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

Defined in: [packages/base/BaseStrategy.ts:33](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseStrategy.ts#L33)

#### Parameters

##### url

`string`

#### Returns

`boolean`

#### Inherited from

[`BaseStrategy`](BaseStrategy.md).[`shouldReExtract`](BaseStrategy.md#shouldreextract)

***

### shouldResolveTextResponse()

> **shouldResolveTextResponse**(`url`, `contentType`): `boolean`

Defined in: [packages/base/BaseStrategy.ts:37](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseStrategy.ts#L37)

#### Parameters

##### url

`string`

##### contentType

`string`

#### Returns

`boolean`

#### Inherited from

[`BaseStrategy`](BaseStrategy.md).[`shouldResolveTextResponse`](BaseStrategy.md#shouldresolvetextresponse)

***

### constructPathname()

> `protected` **constructPathname**(`url`): `string`

Defined in: [packages/base/BaseStrategy.ts:41](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseStrategy.ts#L41)

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

Defined in: [packages/providers/xgroovy/XGroovyStrategy.ts:19](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/providers/xgroovy/XGroovyStrategy.ts#L19)

#### Parameters

##### url

`string`

#### Returns

`string`[]

#### Overrides

[`BaseStrategy`](BaseStrategy.md).[`getHostFallbackUrls`](BaseStrategy.md#gethostfallbackurls)
