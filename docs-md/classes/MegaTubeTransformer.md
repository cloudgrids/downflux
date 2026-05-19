[**downflux**](../README.md)

***

[downflux](../README.md) / MegaTubeTransformer

# Class: MegaTubeTransformer

Defined in: [packages/providers/megatube/MegaTubeTransformer.ts:12](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/megatube/MegaTubeTransformer.ts#L12)

Normalizes parsed MegaTube metadata into the public output shape.

## Remarks

Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.

## Extends

- [`BaseTransformer`](BaseTransformer.md)\<[`MegaTubeExecArgs`](../interfaces/MegaTubeExecArgs.md), [`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md) \| [`MegaTubeVideoOutput`](../interfaces/MegaTubeVideoOutput.md)\>

## Constructors

### Constructor

> **new MegaTubeTransformer**(`httpClient`, `progressManager`): `MegaTubeTransformer`

Defined in: [packages/base/BaseTransformer.ts:26](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseTransformer.ts#L26)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`MegaTubeTransformer`

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`constructor`](BaseTransformer.md#constructor)

## Properties

### httpClient

> `protected` `readonly` **httpClient**: [`HttpClient`](HttpClient.md)

Defined in: [packages/base/BaseTransformer.ts:27](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseTransformer.ts#L27)

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`httpClient`](BaseTransformer.md#httpclient)

***

### progressManager

> `protected` `readonly` **progressManager**: [`ProgressManager`](ProgressManager.md)

Defined in: [packages/base/BaseTransformer.ts:28](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseTransformer.ts#L28)

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`progressManager`](BaseTransformer.md#progressmanager)

## Methods

### requestData()

> **requestData**(`url`, `opts`): `Promise`\<`any`\>

Defined in: [packages/base/BaseTransformer.ts:61](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseTransformer.ts#L61)

Fetches JSON data for providers that expose API-backed metadata.

#### Parameters

##### url

`string`

API endpoint to request.

##### opts

[`DownloadOptions`](../interfaces/DownloadOptions.md)

HTTP and provider options.

#### Returns

`Promise`\<`any`\>

Parsed JSON response.

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`requestData`](BaseTransformer.md#requestdata)

***

### uniqueVideos()

> `protected` **uniqueVideos**\<`T`\>(`videos`, `options`): [`VideoSourceOutput`](../interfaces/VideoSourceOutput.md)[]

Defined in: [packages/base/BaseTransformer.ts:72](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseTransformer.ts#L72)

Removes duplicate video URLs while preserving quality information.

#### Type Parameters

##### T

`T`

#### Parameters

##### videos

`T`[]

Provider-specific video source records.

##### options

[`UniqueVideosProps`](../interfaces/UniqueVideosProps.md)\<`T`\>

URL and quality selectors.

#### Returns

[`VideoSourceOutput`](../interfaces/VideoSourceOutput.md)[]

Unique video sources in the shared shape.

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`uniqueVideos`](BaseTransformer.md#uniquevideos)

***

### unique()

> `protected` **unique**\<`T`\>(`arr`): `T`[]

Defined in: [packages/base/BaseTransformer.ts:89](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/base/BaseTransformer.ts#L89)

#### Type Parameters

##### T

`T`

#### Parameters

##### arr

`T`[]

#### Returns

`T`[]

#### Inherited from

[`BaseTransformer`](BaseTransformer.md).[`unique`](BaseTransformer.md#unique)

***

### transform()

> **transform**(`url`, `request?`): `Promise`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\> \| [`MegaTubeVideoOutput`](../interfaces/MegaTubeVideoOutput.md)\>

Defined in: [packages/providers/megatube/MegaTubeTransformer.ts:13](https://github.com/forkts/downflux/blob/ea0716b3769041592f3a1959127c59bd812df780/packages/providers/megatube/MegaTubeTransformer.ts#L13)

Fetches HTML and merges default metadata with provider-specific metadata.

#### Parameters

##### url

`string`

Target page to fetch.

##### request?

[`MegaTubeExecArgs`](../interfaces/MegaTubeExecArgs.md)

Execution request that identifies the provider and options.

#### Returns

`Promise`\<[`DefaultExecutionResult`](../interfaces/DefaultExecutionResult.md)\<`unknown`\> \| [`MegaTubeVideoOutput`](../interfaces/MegaTubeVideoOutput.md)\>

Parsed metadata ready for provider-specific output mapping.

#### Overrides

[`BaseTransformer`](BaseTransformer.md).[`transform`](BaseTransformer.md#transform)
