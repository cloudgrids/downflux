[**downflux**](../README.md)

***

[downflux](../README.md) / WallHavenTransformer

# Class: WallHavenTransformer

Defined in: [packages/providers/wallhaven/WallHavenTransformer.ts:16](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/wallhaven/WallHavenTransformer.ts#L16)

## Extends

- [`BaseTransformer`](BaseTransformer.md)\<[`WallHavenExecArgs`](../interfaces/WallHavenExecArgs.md), [`WallHavenWallPaperOutput`](../interfaces/WallHavenWallPaperOutput.md) \| [`WallHavenUserUploadsOutput`](../interfaces/WallHavenUserUploadsOutput.md) \| [`WallHavenUserInfoOutput`](../interfaces/WallHavenUserInfoOutput.md) \| [`WallHavenUserFavoriteCollectionsOutput`](../interfaces/WallHavenUserFavoriteCollectionsOutput.md)[] \| [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\>

## Constructors

### Constructor

> **new WallHavenTransformer**(`httpClient`, `progressManager`): `WallHavenTransformer`

Defined in: [packages/base/BaseTransformer.ts:8](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseTransformer.ts#L8)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`WallHavenTransformer`

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`constructor`](BaseTransformer.md#constructor)

## Properties

### httpClient

> `protected` `readonly` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: [packages/base/BaseTransformer.ts:9](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseTransformer.ts#L9)

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`httpClient`](BaseTransformer.md#httpclient)

***

### progressManager

> `protected` `readonly` **progressManager**: [`ProgressManager`](ProgressManager.md)

Defined in: [packages/base/BaseTransformer.ts:10](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseTransformer.ts#L10)

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`progressManager`](BaseTransformer.md#progressmanager)

## Methods

### requestData()

> **requestData**(`url`, `opts`): `Promise`\<`any`\>

Defined in: [packages/base/BaseTransformer.ts:29](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseTransformer.ts#L29)

#### Parameters

##### url

`string`

##### opts

[`DownloadOptions`](../interfaces/DownloadOptions.md)

#### Returns

`Promise`\<`any`\>

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`requestData`](BaseTransformer.md#requestdata)

***

### transform()

> **transform**(`url`, `request?`): `Promise`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\> \| [`WallHavenWallPaperOutput`](../interfaces/WallHavenWallPaperOutput.md) \| [`WallHavenUserUploadsOutput`](../interfaces/WallHavenUserUploadsOutput.md) \| [`WallHavenUserInfoOutput`](../interfaces/WallHavenUserInfoOutput.md) \| [`WallHavenUserFavoriteCollectionsOutput`](../interfaces/WallHavenUserFavoriteCollectionsOutput.md)[]\>

Defined in: [packages/providers/wallhaven/WallHavenTransformer.ts:24](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/providers/wallhaven/WallHavenTransformer.ts#L24)

#### Parameters

##### url

`string`

##### request?

[`WallHavenExecArgs`](../interfaces/WallHavenExecArgs.md)

#### Returns

`Promise`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\> \| [`WallHavenWallPaperOutput`](../interfaces/WallHavenWallPaperOutput.md) \| [`WallHavenUserUploadsOutput`](../interfaces/WallHavenUserUploadsOutput.md) \| [`WallHavenUserInfoOutput`](../interfaces/WallHavenUserInfoOutput.md) \| [`WallHavenUserFavoriteCollectionsOutput`](../interfaces/WallHavenUserFavoriteCollectionsOutput.md)[]\>

#### Overrides

[`BaseTransformer`](BaseTransformer.md).[`transform`](BaseTransformer.md#transform)
