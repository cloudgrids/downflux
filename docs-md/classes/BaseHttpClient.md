[**downflux**](../README.md)

***

[downflux](../README.md) / BaseHttpClient

# Abstract Class: BaseHttpClient

Defined in: [packages/engines/http/BaseHttpClient.ts:7](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L7)

## Extended by

- [`HlsClient`](HlsClient.md)
- [`HttpClient`](HttpClient.md)
- [`StreamHttpClient`](StreamHttpClient.md)

## Constructors

### Constructor

> **new BaseHttpClient**(`progressManager`): `BaseHttpClient`

Defined in: [packages/engines/http/BaseHttpClient.ts:8](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L8)

#### Parameters

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`BaseHttpClient`

## Properties

### progressManager

> `protected` `readonly` **progressManager**: [`ProgressManager`](ProgressManager.md)

Defined in: [packages/engines/http/BaseHttpClient.ts:8](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L8)

***

### cookieJar

> `protected` `readonly` **cookieJar**: `Map`\<`string`, `Map`\<`string`, `string`\>\>

Defined in: [packages/engines/http/BaseHttpClient.ts:10](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L10)

***

### CHROME\_CIPHERS

> `protected` `readonly` **CHROME\_CIPHERS**: `string`

Defined in: [packages/engines/http/BaseHttpClient.ts:11](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L11)

***

### agent

> `protected` `readonly` **agent**: `Agent`

Defined in: [packages/engines/http/BaseHttpClient.ts:29](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L29)

## Methods

### randomHeaders()

> `protected` **randomHeaders**(`extra?`): `object`

Defined in: [packages/engines/http/BaseHttpClient.ts:39](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L39)

#### Parameters

##### extra?

`Record`\<`string`, `string`\> = `{}`

#### Returns

`object`

***

### delay()

> `protected` **delay**(`attempt`): `Promise`\<`unknown`\>

Defined in: [packages/engines/http/BaseHttpClient.ts:48](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L48)

#### Parameters

##### attempt

`number`

#### Returns

`Promise`\<`unknown`\>

***

### readBody()

> `protected` **readBody**(`body`): `Promise`\<`Buffer`\<`ArrayBufferLike`\>\>

Defined in: [packages/engines/http/BaseHttpClient.ts:55](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L55)

#### Parameters

##### body

`ReadableStream`\<`Uint8Array`\<`ArrayBufferLike`\>\> \| `null`

#### Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\>\>

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

***

### headers()

> `protected` **headers**(`headers`): `Record`\<`string`, `string`\>

Defined in: [packages/engines/http/BaseHttpClient.ts:135](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L135)

#### Parameters

##### headers

`Headers`

#### Returns

`Record`\<`string`, `string`\>

***

### isTransportError()

> `protected` **isTransportError**(`error`): `string` \| `undefined`

Defined in: [packages/engines/http/BaseHttpClient.ts:139](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/engines/http/BaseHttpClient.ts#L139)

#### Parameters

##### error

`unknown`

#### Returns

`string` \| `undefined`

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
