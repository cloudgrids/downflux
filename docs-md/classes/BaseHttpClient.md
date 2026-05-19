[**downflux**](../README.md)

***

[downflux](../README.md) / BaseHttpClient

# Abstract Class: BaseHttpClient

Defined in: [packages/base/BaseHttpClient.ts:15](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseHttpClient.ts#L15)

Shared HTTP engine foundation.

## Remarks

Engines centralize transport concerns that should not leak into providers:
randomized browser-like headers, cookies, compression decoding, proxy/SNI
dispatchers, retries, and low-level fetch fallback behavior.

## Extended by

- [`HlsClient`](HlsClient.md)
- [`HttpClient`](HttpClient.md)
- [`StreamHttpClient`](StreamHttpClient.md)

## Constructors

### Constructor

> **new BaseHttpClient**(`progressManager`): `BaseHttpClient`

Defined in: [packages/base/BaseHttpClient.ts:16](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseHttpClient.ts#L16)

#### Parameters

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`BaseHttpClient`

## Properties

### progressManager

> `protected` `readonly` **progressManager**: [`ProgressManager`](ProgressManager.md)

Defined in: [packages/base/BaseHttpClient.ts:16](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseHttpClient.ts#L16)

***

### cookieJar

> `protected` `readonly` **cookieJar**: `Map`\<`string`, `Map`\<`string`, `string`\>\>

Defined in: [packages/base/BaseHttpClient.ts:18](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseHttpClient.ts#L18)

***

### CHROME\_CIPHERS

> `protected` `readonly` **CHROME\_CIPHERS**: `string`

Defined in: [packages/base/BaseHttpClient.ts:19](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseHttpClient.ts#L19)

***

### agent

> `protected` `readonly` **agent**: `Agent`

Defined in: [packages/base/BaseHttpClient.ts:37](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseHttpClient.ts#L37)

***

### spoofAgent

> `protected` `readonly` **spoofAgent**: `Agent`

Defined in: [packages/base/BaseHttpClient.ts:47](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseHttpClient.ts#L47)

## Methods

### randomHeaders()

> `protected` **randomHeaders**(`extra?`): `object`

Defined in: [packages/base/BaseHttpClient.ts:60](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseHttpClient.ts#L60)

#### Parameters

##### extra?

`Record`\<`string`, `string`\> = `{}`

#### Returns

`object`

***

### delay()

> `protected` **delay**(`attempt`): `Promise`\<`unknown`\>

Defined in: [packages/base/BaseHttpClient.ts:85](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseHttpClient.ts#L85)

#### Parameters

##### attempt

`number`

#### Returns

`Promise`\<`unknown`\>

***

### readBody()

> `protected` **readBody**(`body`): `Promise`\<`Buffer`\<`ArrayBufferLike`\>\>

Defined in: [packages/base/BaseHttpClient.ts:92](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseHttpClient.ts#L92)

#### Parameters

##### body

`ReadableStream`\<`Uint8Array`\<`ArrayBufferLike`\>\> \| `null`

#### Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\>\>

***

### decodeBody()

> `protected` **decodeBody**(`buffer`, `headers`): `Buffer`

Defined in: [packages/base/BaseHttpClient.ts:107](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseHttpClient.ts#L107)

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

Defined in: [packages/base/BaseHttpClient.ts:123](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseHttpClient.ts#L123)

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

Defined in: [packages/base/BaseHttpClient.ts:138](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseHttpClient.ts#L138)

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

Defined in: [packages/base/BaseHttpClient.ts:161](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseHttpClient.ts#L161)

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

Defined in: [packages/base/BaseHttpClient.ts:172](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseHttpClient.ts#L172)

#### Parameters

##### headers

`Headers`

#### Returns

`Record`\<`string`, `string`\>

***

### isTransportError()

> `protected` **isTransportError**(`error`): `string` \| `undefined`

Defined in: [packages/base/BaseHttpClient.ts:176](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseHttpClient.ts#L176)

#### Parameters

##### error

`unknown`

#### Returns

`string` \| `undefined`

***

### fetchWithTransportFallback()

> **fetchWithTransportFallback**(`url`, `init`, `options`, `allowFallback?`): `Promise`\<`Response`\>

Defined in: [packages/base/BaseHttpClient.ts:199](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseHttpClient.ts#L199)

Runs a fetch request with transport fallback for transient TLS/socket failures.

#### Parameters

##### url

`string`

URL to request.

##### init

`RequestInit` \| `undefined`

Fetch options.

##### options

[`HttpAgentOptions`](../interfaces/HttpAgentOptions.md)

Agent, proxy, and SNI options.

##### allowFallback?

`boolean` = `true`

Whether fallback dispatchers may be attempted.

#### Returns

`Promise`\<`Response`\>

Native fetch response.

***

### fetchText()

> **fetchText**(`url`, `timeoutMs`, `headers`): `Promise`\<`string`\>

Defined in: [packages/base/BaseHttpClient.ts:222](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseHttpClient.ts#L222)

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

Defined in: [packages/base/BaseHttpClient.ts:226](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseHttpClient.ts#L226)

#### Parameters

##### url

`string`

##### opts

[`DownloadOptions`](../interfaces/DownloadOptions.md)

#### Returns

`Promise`\<`any`\>
