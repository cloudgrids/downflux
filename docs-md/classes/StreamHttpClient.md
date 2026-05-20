[**downflux**](../README.md)

***

[downflux](../README.md) / StreamHttpClient

# Class: StreamHttpClient

Defined in: [packages/engines/http/StreamingClient.ts:19](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/engines/http/StreamingClient.ts#L19)

HTTP engine for downloadable media streams.

## Remarks

Streaming is separate from page fetching because downloads need byte progress,
provider-aware CDN fallback, expired URL re-extraction, direct media redirect
resolution, and HLS delegation.

## Extends

- [`BaseHttpClient`](BaseHttpClient.md)

## Constructors

### Constructor

> **new StreamHttpClient**(`hlsClient`, `strategyRegistry`, `progressManager`): `StreamHttpClient`

Defined in: [packages/engines/http/StreamingClient.ts:25](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/engines/http/StreamingClient.ts#L25)

#### Parameters

##### hlsClient

[`HlsClient`](HlsClient.md)

##### strategyRegistry

[`StrategyRegistry`](StrategyRegistry.md)

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`StreamHttpClient`

#### Overrides

[`BaseHttpClient`](BaseHttpClient.md).[`constructor`](BaseHttpClient.md#constructor)

## Properties

### progressManager

> `protected` `readonly` **progressManager**: [`ProgressManager`](ProgressManager.md)

Defined in: [packages/base/BaseHttpClient.ts:16](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseHttpClient.ts#L16)

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`progressManager`](BaseHttpClient.md#progressmanager)

***

### cookieJar

> `protected` `readonly` **cookieJar**: `Map`\<`string`, `Map`\<`string`, `string`\>\>

Defined in: [packages/base/BaseHttpClient.ts:18](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseHttpClient.ts#L18)

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`cookieJar`](BaseHttpClient.md#cookiejar)

***

### CHROME\_CIPHERS

> `protected` `readonly` **CHROME\_CIPHERS**: `string`

Defined in: [packages/base/BaseHttpClient.ts:19](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseHttpClient.ts#L19)

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`CHROME_CIPHERS`](BaseHttpClient.md#chrome_ciphers)

***

### agent

> `protected` `readonly` **agent**: `Agent`

Defined in: [packages/base/BaseHttpClient.ts:37](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseHttpClient.ts#L37)

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`agent`](BaseHttpClient.md#agent)

***

### spoofAgent

> `protected` `readonly` **spoofAgent**: `Agent`

Defined in: [packages/base/BaseHttpClient.ts:47](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseHttpClient.ts#L47)

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`spoofAgent`](BaseHttpClient.md#spoofagent)

## Methods

### randomHeaders()

> `protected` **randomHeaders**(`extra?`): `object`

Defined in: [packages/base/BaseHttpClient.ts:60](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseHttpClient.ts#L60)

#### Parameters

##### extra?

`Record`\<`string`, `string`\> = `{}`

#### Returns

`object`

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`randomHeaders`](BaseHttpClient.md#randomheaders)

***

### buildHlsHeaders()

> `protected` **buildHlsHeaders**(`opts`): `object`

Defined in: [packages/base/BaseHttpClient.ts:69](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseHttpClient.ts#L69)

#### Parameters

##### opts

[`DownloadOptions`](../interfaces/DownloadOptions.md)

#### Returns

`object`

##### User-Agent

> **User-Agent**: `string` = `'Mozilla/5.0'`

##### Accept

> **Accept**: `string` = `'*/*'`

##### Referer

> **Referer**: `string`

##### Origin

> **Origin**: `string`

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`buildHlsHeaders`](BaseHttpClient.md#buildhlsheaders)

***

### delay()

> `protected` **delay**(`attempt`): `Promise`\<`unknown`\>

Defined in: [packages/base/BaseHttpClient.ts:94](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseHttpClient.ts#L94)

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

Defined in: [packages/base/BaseHttpClient.ts:101](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseHttpClient.ts#L101)

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

Defined in: [packages/base/BaseHttpClient.ts:116](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseHttpClient.ts#L116)

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

Defined in: [packages/base/BaseHttpClient.ts:132](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseHttpClient.ts#L132)

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

Defined in: [packages/base/BaseHttpClient.ts:147](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseHttpClient.ts#L147)

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

Defined in: [packages/base/BaseHttpClient.ts:170](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseHttpClient.ts#L170)

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

Defined in: [packages/base/BaseHttpClient.ts:181](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseHttpClient.ts#L181)

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

Defined in: [packages/base/BaseHttpClient.ts:185](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseHttpClient.ts#L185)

#### Parameters

##### error

`unknown`

#### Returns

`string` \| `undefined`

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`isTransportError`](BaseHttpClient.md#istransporterror)

***

### fetchWithTransportFallback()

> **fetchWithTransportFallback**(`url`, `init`, `options`, `allowFallback?`): `Promise`\<`Response`\>

Defined in: [packages/base/BaseHttpClient.ts:208](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseHttpClient.ts#L208)

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

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`fetchWithTransportFallback`](BaseHttpClient.md#fetchwithtransportfallback)

***

### fetchText()

> **fetchText**(`url`, `timeoutMs`, `headers`): `Promise`\<`string`\>

Defined in: [packages/base/BaseHttpClient.ts:231](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseHttpClient.ts#L231)

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

Defined in: [packages/base/BaseHttpClient.ts:235](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseHttpClient.ts#L235)

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

### requestStream()

> **requestStream**(`url`, `opts`): `Promise`\<[`HLSStreamRequest`](../interfaces/HLSStreamRequest.md)\>

Defined in: [packages/engines/http/StreamingClient.ts:97](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/engines/http/StreamingClient.ts#L97)

Resolves a media URL into a stream starter and final response metadata.

#### Parameters

##### url

`string`

Media URL to request.

##### opts

[`DownloadOptions`](../interfaces/DownloadOptions.md)

Download options and provider context.

#### Returns

`Promise`\<[`HLSStreamRequest`](../interfaces/HLSStreamRequest.md)\>

Stream start callback with final URL, headers, and media flags.
