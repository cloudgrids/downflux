[**downflux**](../README.md)

***

[downflux](../README.md) / HttpClient

# Class: HttpClient

Defined in: [packages/engines/http/HttpClient.ts:7](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/HttpClient.ts#L7)

## Extends

- [`BaseHttpClient`](BaseHttpClient.md)

## Constructors

### Constructor

> **new HttpClient**(`progressManager`): `HttpClient`

Defined in: [packages/engines/http/HttpClient.ts:8](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/HttpClient.ts#L8)

#### Parameters

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`HttpClient`

#### Overrides

[`BaseHttpClient`](BaseHttpClient.md).[`constructor`](BaseHttpClient.md#constructor)

## Properties

### progressManager

> `protected` `readonly` **progressManager**: [`ProgressManager`](ProgressManager.md)

Defined in: [packages/engines/http/BaseHttpClient.ts:8](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L8)

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`progressManager`](BaseHttpClient.md#progressmanager)

***

### cookieJar

> `protected` `readonly` **cookieJar**: `Map`\<`string`, `Map`\<`string`, `string`\>\>

Defined in: [packages/engines/http/BaseHttpClient.ts:10](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L10)

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`cookieJar`](BaseHttpClient.md#cookiejar)

***

### CHROME\_CIPHERS

> `protected` `readonly` **CHROME\_CIPHERS**: `string`

Defined in: [packages/engines/http/BaseHttpClient.ts:11](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L11)

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`CHROME_CIPHERS`](BaseHttpClient.md#chrome_ciphers)

***

### agent

> `protected` `readonly` **agent**: `Agent`

Defined in: [packages/engines/http/BaseHttpClient.ts:29](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L29)

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`agent`](BaseHttpClient.md#agent)

## Methods

### randomHeaders()

> `protected` **randomHeaders**(`extra?`): `object`

Defined in: [packages/engines/http/BaseHttpClient.ts:39](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L39)

#### Parameters

##### extra?

`Record`\<`string`, `string`\> = `{}`

#### Returns

`object`

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`randomHeaders`](BaseHttpClient.md#randomheaders)

***

### delay()

> `protected` **delay**(`attempt`): `Promise`\<`unknown`\>

Defined in: [packages/engines/http/BaseHttpClient.ts:48](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L48)

#### Parameters

##### attempt

`number`

#### Returns

`Promise`\<`unknown`\>

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`delay`](BaseHttpClient.md#delay)

***

### readBody()

> `protected` **readBody**(`body`): `Promise`\<`Buffer`\<`ArrayBufferLike`\>\>

Defined in: [packages/engines/http/BaseHttpClient.ts:55](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L55)

#### Parameters

##### body

`ReadableStream`\<`Uint8Array`\<`ArrayBufferLike`\>\> \| `null`

#### Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\>\>

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`readBody`](BaseHttpClient.md#readbody)

***

### decodeBody()

> `protected` **decodeBody**(`buffer`, `headers`): `Buffer`

Defined in: [packages/engines/http/BaseHttpClient.ts:70](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L70)

#### Parameters

##### buffer

`Buffer`

##### headers

`Headers`

#### Returns

`Buffer`

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`decodeBody`](BaseHttpClient.md#decodebody)

***

### applyCookieWithHeader()

> `protected` **applyCookieWithHeader**(`url`, `headers`): `Record`\<`string`, `string`\>

Defined in: [packages/engines/http/BaseHttpClient.ts:86](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L86)

#### Parameters

##### url

`string`

##### headers

`Record`\<`string`, `string`\>

#### Returns

`Record`\<`string`, `string`\>

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`applyCookieWithHeader`](BaseHttpClient.md#applycookiewithheader)

***

### storeCookies()

> `protected` **storeCookies**(`url`, `headers`): `void`

Defined in: [packages/engines/http/BaseHttpClient.ts:101](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L101)

#### Parameters

##### url

`string`

##### headers

`Headers`

#### Returns

`void`

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`storeCookies`](BaseHttpClient.md#storecookies)

***

### addOriginWithHeader()

> `protected` **addOriginWithHeader**(`headers`, `referer?`): `Record`\<`string`, `string`\>

Defined in: [packages/engines/http/BaseHttpClient.ts:124](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L124)

#### Parameters

##### headers

`Record`\<`string`, `string`\>

##### referer?

`string`

#### Returns

`Record`\<`string`, `string`\>

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`addOriginWithHeader`](BaseHttpClient.md#addoriginwithheader)

***

### headers()

> `protected` **headers**(`headers`): `Record`\<`string`, `string`\>

Defined in: [packages/engines/http/BaseHttpClient.ts:135](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L135)

#### Parameters

##### headers

`Headers`

#### Returns

`Record`\<`string`, `string`\>

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`headers`](BaseHttpClient.md#headers)

***

### isTransportError()

> `protected` **isTransportError**(`error`): `string` \| `undefined`

Defined in: [packages/engines/http/BaseHttpClient.ts:139](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L139)

#### Parameters

##### error

`unknown`

#### Returns

`string` \| `undefined`

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`isTransportError`](BaseHttpClient.md#istransporterror)

***

### fetchWithTransportFallback()

> `protected` **fetchWithTransportFallback**(`url`, `init`, `allowFallback?`): `Promise`\<`Response`\>

Defined in: [packages/engines/http/BaseHttpClient.ts:153](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L153)

#### Parameters

##### url

`string`

##### init

`RequestInit` \| `undefined`

##### allowFallback?

`boolean` = `true`

#### Returns

`Promise`\<`Response`\>

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`fetchWithTransportFallback`](BaseHttpClient.md#fetchwithtransportfallback)

***

### fetchText()

> **fetchText**(`url`, `timeoutMs`, `headers`): `Promise`\<`string`\>

Defined in: [packages/engines/http/BaseHttpClient.ts:169](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L169)

#### Parameters

##### url

`string`

##### timeoutMs

`number`

##### headers

`Record`\<`string`, `any`\>

#### Returns

`Promise`\<`string`\>

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`fetchText`](BaseHttpClient.md#fetchtext)

***

### fetchJson()

> **fetchJson**(`url`, `opts`): `Promise`\<`any`\>

Defined in: [packages/engines/http/BaseHttpClient.ts:173](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L173)

#### Parameters

##### url

`string`

##### opts

[`DownloadOptions`](../interfaces/DownloadOptions.md)

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`fetchJson`](BaseHttpClient.md#fetchjson)

***

### fetchHtml()

> **fetchHtml**(`url`, `opts`): `Promise`\<[`FetchResult`](../interfaces/FetchResult.md)\>

Defined in: [packages/engines/http/HttpClient.ts:13](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/HttpClient.ts#L13)

#### Parameters

##### url

`string`

##### opts

[`DownloadOptions`](../interfaces/DownloadOptions.md)

#### Returns

`Promise`\<[`FetchResult`](../interfaces/FetchResult.md)\>
