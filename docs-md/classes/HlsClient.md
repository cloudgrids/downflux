[**downflux**](../README.md)

***

[downflux](../README.md) / HlsClient

# Class: HlsClient

Defined in: [packages/engines/http/HlsClient.ts:23](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/engines/http/HlsClient.ts#L23)

HTTP engine for HLS playlists and media segments.

## Remarks

HLS handling is isolated from generic streaming because playlists require
variant selection, segment stitching, optional AES decryption, and fMP4
detection before storage can finalize the media.

## Extends

- [`BaseHttpClient`](BaseHttpClient.md)

## Constructors

### Constructor

> **new HlsClient**(`progressManager`): `HlsClient`

Defined in: [packages/engines/http/HlsClient.ts:24](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/engines/http/HlsClient.ts#L24)

#### Parameters

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`HlsClient`

#### Overrides

[`BaseHttpClient`](BaseHttpClient.md).[`constructor`](BaseHttpClient.md#constructor)

## Properties

### progressManager

> `protected` `readonly` **progressManager**: [`ProgressManager`](ProgressManager.md)

Defined in: [packages/base/BaseHttpClient.ts:16](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseHttpClient.ts#L16)

#### Inherited from

[`StreamHttpClient`](StreamHttpClient.md).[`progressManager`](StreamHttpClient.md#progressmanager)

***

### cookieJar

> `protected` `readonly` **cookieJar**: `Map`\<`string`, `Map`\<`string`, `string`\>\>

Defined in: [packages/base/BaseHttpClient.ts:18](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseHttpClient.ts#L18)

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`cookieJar`](BaseHttpClient.md#cookiejar)

***

### CHROME\_CIPHERS

> `protected` `readonly` **CHROME\_CIPHERS**: `string`

Defined in: [packages/base/BaseHttpClient.ts:19](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseHttpClient.ts#L19)

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`CHROME_CIPHERS`](BaseHttpClient.md#chrome_ciphers)

***

### agent

> `protected` `readonly` **agent**: `Agent`

Defined in: [packages/base/BaseHttpClient.ts:37](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseHttpClient.ts#L37)

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`agent`](BaseHttpClient.md#agent)

***

### spoofAgent

> `protected` `readonly` **spoofAgent**: `Agent`

Defined in: [packages/base/BaseHttpClient.ts:47](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseHttpClient.ts#L47)

#### Inherited from

[`BaseHttpClient`](BaseHttpClient.md).[`spoofAgent`](BaseHttpClient.md#spoofagent)

## Methods

### randomHeaders()

> `protected` **randomHeaders**(`extra?`): `object`

Defined in: [packages/base/BaseHttpClient.ts:60](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseHttpClient.ts#L60)

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

Defined in: [packages/base/BaseHttpClient.ts:69](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseHttpClient.ts#L69)

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

Defined in: [packages/base/BaseHttpClient.ts:94](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseHttpClient.ts#L94)

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

Defined in: [packages/base/BaseHttpClient.ts:101](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseHttpClient.ts#L101)

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

Defined in: [packages/base/BaseHttpClient.ts:116](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseHttpClient.ts#L116)

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

Defined in: [packages/base/BaseHttpClient.ts:132](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseHttpClient.ts#L132)

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

Defined in: [packages/base/BaseHttpClient.ts:147](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseHttpClient.ts#L147)

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

Defined in: [packages/base/BaseHttpClient.ts:170](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseHttpClient.ts#L170)

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

Defined in: [packages/base/BaseHttpClient.ts:181](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseHttpClient.ts#L181)

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

Defined in: [packages/base/BaseHttpClient.ts:185](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseHttpClient.ts#L185)

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

Defined in: [packages/base/BaseHttpClient.ts:208](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseHttpClient.ts#L208)

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

Defined in: [packages/base/BaseHttpClient.ts:231](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseHttpClient.ts#L231)

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

Defined in: [packages/base/BaseHttpClient.ts:235](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseHttpClient.ts#L235)

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

### fetchHlsStream()

> **fetchHlsStream**(`manifest`, `manifestUrl`, `timeoutMs`, `stream`, `opts`): `Promise`\<`void`\>

Defined in: [packages/engines/http/HlsClient.ts:37](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/engines/http/HlsClient.ts#L37)

Writes a resolved HLS playlist to a destination stream.

#### Parameters

##### manifest

`string`

Already fetched manifest content.

##### manifestUrl

`string`

URL used to resolve relative playlist entries.

##### timeoutMs

`number`

Segment request timeout.

##### stream

`Writable`

Destination stream.

##### opts

[`DownloadOptions`](../interfaces/DownloadOptions.md)

Download and quality options.

#### Returns

`Promise`\<`void`\>

***

### isFmp4()

> **isFmp4**(`manifest`, `manifestUrl`, `opts`): `Promise`\<`boolean`\>

Defined in: [packages/engines/http/HlsClient.ts:74](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/engines/http/HlsClient.ts#L74)

Detects whether the selected playlist uses fMP4 initialization segments.

#### Parameters

##### manifest

`string`

Manifest content.

##### manifestUrl

`string`

URL used to resolve relative entries.

##### opts

[`DownloadOptions`](../interfaces/DownloadOptions.md)

Download and quality options.

#### Returns

`Promise`\<`boolean`\>

`true` when an fMP4 init segment is present.

***

### isHlsManifest()

> **isHlsManifest**(`contentType`, `url`): `boolean`

Defined in: [packages/engines/http/HlsClient.ts:192](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/engines/http/HlsClient.ts#L192)

Checks whether a response should be handled as an HLS manifest.

#### Parameters

##### contentType

`string`

Response content type.

##### url

`string`

Final response URL.

#### Returns

`boolean`

`true` when the response appears to be an HLS playlist.
