[**downflux**](../README.md)

***

[downflux](../README.md) / ServiceStrategy

# Interface: ServiceStrategy

Defined in: [packages/contracts/DownloadContracts.ts:98](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L98)

## Methods

### shouldFallback404()?

> `optional` **shouldFallback404**(`url`): `boolean`

Defined in: [packages/contracts/DownloadContracts.ts:99](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L99)

#### Parameters

##### url

`string`

#### Returns

`boolean`

***

### getFallbackUrl()?

> `optional` **getFallbackUrl**(`url`): `string` \| `null`

Defined in: [packages/contracts/DownloadContracts.ts:100](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L100)

#### Parameters

##### url

`string`

#### Returns

`string` \| `null`

***

### shouldReExtract()?

> `optional` **shouldReExtract**(`url`): `boolean`

Defined in: [packages/contracts/DownloadContracts.ts:101](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L101)

#### Parameters

##### url

`string`

#### Returns

`boolean`

***

### shouldResolveTextResponse()?

> `optional` **shouldResolveTextResponse**(`url`, `contentType`): `boolean`

Defined in: [packages/contracts/DownloadContracts.ts:102](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L102)

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

Defined in: [packages/contracts/DownloadContracts.ts:103](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L103)

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

Defined in: [packages/contracts/DownloadContracts.ts:104](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/DownloadContracts.ts#L104)

#### Parameters

##### url

`string`

#### Returns

`string`[]
