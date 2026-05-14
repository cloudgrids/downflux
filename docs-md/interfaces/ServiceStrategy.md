[**downflux**](../README.md)

***

[downflux](../README.md) / ServiceStrategy

# Interface: ServiceStrategy

Defined in: [packages/contracts/DownloadContracts.ts:93](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L93)

## Methods

### shouldFallback404()?

> `optional` **shouldFallback404**(`url`): `boolean`

Defined in: [packages/contracts/DownloadContracts.ts:94](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L94)

#### Parameters

##### url

`string`

#### Returns

`boolean`

***

### getFallbackUrl()?

> `optional` **getFallbackUrl**(`url`): `string` \| `null`

Defined in: [packages/contracts/DownloadContracts.ts:95](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L95)

#### Parameters

##### url

`string`

#### Returns

`string` \| `null`

***

### shouldReExtract()?

> `optional` **shouldReExtract**(`url`): `boolean`

Defined in: [packages/contracts/DownloadContracts.ts:96](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L96)

#### Parameters

##### url

`string`

#### Returns

`boolean`

***

### shouldResolveTextResponse()?

> `optional` **shouldResolveTextResponse**(`url`, `contentType`): `boolean`

Defined in: [packages/contracts/DownloadContracts.ts:97](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L97)

#### Parameters

##### url

`string`

##### contentType

`string`

#### Returns

`boolean`

***

### getDirectVideoUrlFromText()?

> `optional` **getDirectVideoUrlFromText**(`body`, `opts`): `string` \| `null`

Defined in: [packages/contracts/DownloadContracts.ts:98](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L98)

#### Parameters

##### body

`string`

##### opts

[`DownloadOptions`](DownloadOptions.md)

#### Returns

`string` \| `null`

***

### getHostFallbackUrls()?

> `optional` **getHostFallbackUrls**(`url`): `string`[]

Defined in: [packages/contracts/DownloadContracts.ts:99](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/contracts/DownloadContracts.ts#L99)

#### Parameters

##### url

`string`

#### Returns

`string`[]
