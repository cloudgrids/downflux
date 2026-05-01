[**downflux**](../README.md)

***

[downflux](../README.md) / DefaultService

# Class: DefaultService

Defined in: [services/DefaultService.ts:9](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/DefaultService.ts#L9)

Default service.
Supports generic URL extraction.

## Extends

- [`BaseService`](BaseService.md)\<`any`\>

## Constructors

### Constructor

> **new DefaultService**(`url`): `DefaultService`

Defined in: [services/DefaultService.ts:15](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/DefaultService.ts#L15)

Creates a default extraction service.

#### Parameters

##### url

`string`

Any valid URL

#### Returns

`DefaultService`

#### Throws

InvalidUrlException When the URL is invalid

#### Overrides

[`BaseService`](BaseService.md).[`constructor`](BaseService.md#constructor)

## Properties

### jobOptions

> `protected` **jobOptions**: [`JobOptions`](../interfaces/JobOptions.md) = `{}`

Defined in: [services/BaseService.ts:23](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L23)

#### Inherited from

[`BaseService`](BaseService.md).[`jobOptions`](BaseService.md#joboptions)

***

### httpOptions

> `protected` **httpOptions**: [`HttpFetchOptions`](../interfaces/HttpFetchOptions.md) = `{}`

Defined in: [services/BaseService.ts:24](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L24)

#### Inherited from

[`BaseService`](BaseService.md).[`httpOptions`](BaseService.md#httpoptions)

***

### deps

> `protected` `readonly` **deps**: [`ServiceDependencies`](../interfaces/ServiceDependencies.md)

Defined in: [services/BaseService.ts:25](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L25)

#### Inherited from

[`BaseService`](BaseService.md).[`deps`](BaseService.md#deps)

***

### url

> `readonly` **url**: `string`

Defined in: [services/BaseService.ts:32](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L32)

Source URL

#### Inherited from

[`BaseService`](BaseService.md).[`url`](BaseService.md#url)

## Methods

### setHeaders()

> **setHeaders**(`headers`): `this`

Defined in: [services/BaseService.ts:45](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L45)

Sets custom HTTP headers.

#### Parameters

##### headers

`Record`\<`string`, `string`\>

Request header map

#### Returns

`this`

#### Inherited from

[`BaseService`](BaseService.md).[`setHeaders`](BaseService.md#setheaders)

***

### setTimeout()

> **setTimeout**(`timeoutMs`): `this`

Defined in: [services/BaseService.ts:54](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L54)

Sets HTTP timeout.

#### Parameters

##### timeoutMs

`number`

Timeout in milliseconds

#### Returns

`this`

#### Inherited from

[`BaseService`](BaseService.md).[`setTimeout`](BaseService.md#settimeout)

***

### setRetries()

> **setRetries**(`retries`): `this`

Defined in: [services/BaseService.ts:63](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L63)

Sets fetch retry count.

#### Parameters

##### retries

`number`

Retry attempt count

#### Returns

`this`

#### Inherited from

[`BaseService`](BaseService.md).[`setRetries`](BaseService.md#setretries)

***

### setHttpOptions()

> **setHttpOptions**(`opts`): `this`

Defined in: [services/BaseService.ts:72](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L72)

Sets HTTP fetch options.

#### Parameters

##### opts

[`HttpFetchOptions`](../interfaces/HttpFetchOptions.md)

HTTP options to merge

#### Returns

`this`

#### Inherited from

[`BaseService`](BaseService.md).[`setHttpOptions`](BaseService.md#sethttpoptions)

***

### setJobOptions()

> **setJobOptions**(`opts`): `this`

Defined in: [services/BaseService.ts:81](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L81)

Sets job options.

#### Parameters

##### opts

[`JobOptions`](../interfaces/JobOptions.md)

Job options to merge

#### Returns

`this`

#### Inherited from

[`BaseService`](BaseService.md).[`setJobOptions`](BaseService.md#setjoboptions)

***

### setMaxDownloads()

> **setMaxDownloads**(`maxDownloads`): `this`

Defined in: [services/BaseService.ts:90](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L90)

Sets maximum downloads.

#### Parameters

##### maxDownloads

`number`

Download limit

#### Returns

`this`

#### Inherited from

[`BaseService`](BaseService.md).[`setMaxDownloads`](BaseService.md#setmaxdownloads)

***

### setAllowedExtensions()

> **setAllowedExtensions**(...`extensions`): `this`

Defined in: [services/BaseService.ts:99](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L99)

Sets allowed file extensions.

#### Parameters

##### extensions

...[`AllowedExtension`](../type-aliases/AllowedExtension.md)[]

File extensions such as `jpg` or `png`

#### Returns

`this`

#### Inherited from

[`BaseService`](BaseService.md).[`setAllowedExtensions`](BaseService.md#setallowedextensions)

***

### onProgress()

> **onProgress**(`handler`): `this`

Defined in: [services/BaseService.ts:108](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L108)

Sets progress handler.

#### Parameters

##### handler

(`event`) => `void`

Progress event callback

#### Returns

`this`

#### Inherited from

[`BaseService`](BaseService.md).[`onProgress`](BaseService.md#onprogress)

***

### setProgressLogging()

> **setProgressLogging**(`enabled?`): `this`

Defined in: [services/BaseService.ts:118](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L118)

Enables console progress logging.

#### Parameters

##### enabled?

`boolean` = `true`

Console logging flag

#### Returns

`this`

#### Default Value

```ts
true
```

#### Inherited from

[`BaseService`](BaseService.md).[`setProgressLogging`](BaseService.md#setprogresslogging)

***

### setOutput()

> **setOutput**(`type`, `config?`): `this`

Defined in: [services/BaseService.ts:129](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L129)

Sets output type.

#### Parameters

##### type

[`OutputType`](../enumerations/OutputType.md)

Job output mode

##### config?

[`DirectoryOutputOptions`](../interfaces/DirectoryOutputOptions.md) = `{}`

Directory output configuration

#### Returns

`this`

#### Default Value

```ts
OutputType.JSON
```

#### Inherited from

[`BaseService`](BaseService.md).[`setOutput`](BaseService.md#setoutput)

***

### setExecutionType()

> **setExecutionType**(`type`): `this`

Defined in: [services/BaseService.ts:140](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L140)

Sets execution strategy.

#### Parameters

##### type

[`ExecutionType`](../enumerations/ExecutionType.md)

Execution mode

#### Returns

`this`

#### Default Value

```ts
ExecutionType.SEQUENTIAL
```

#### Inherited from

[`BaseService`](BaseService.md).[`setExecutionType`](BaseService.md#setexecutiontype)

***

### buildRequest()

> `protected` **buildRequest**(`overrides?`): `any`

Defined in: [services/BaseService.ts:145](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L145)

#### Parameters

##### overrides?

`Partial`\<`any`\>

#### Returns

`any`

#### Inherited from

[`BaseService`](BaseService.md).[`buildRequest`](BaseService.md#buildrequest)

***

### execute()

> `protected` **execute**\<`TRes`\>(`overrides?`): `Promise`\<`TRes`[]\>

Defined in: [services/BaseService.ts:158](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L158)

#### Type Parameters

##### TRes

`TRes`

#### Parameters

##### overrides?

`Partial`\<`any`\>

#### Returns

`Promise`\<`TRes`[]\>

#### Inherited from

[`BaseService`](BaseService.md).[`execute`](BaseService.md#execute)

***

### makeTargets()

> `protected` **makeTargets**(`baseUrl`, `range`, `service`, `method`, `addTrailingSlash?`): `object`

Defined in: [services/BaseService.ts:164](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L164)

#### Parameters

##### baseUrl

`string`

##### range

[`Range`](../type-aliases/Range.md)

##### service

[`ServiceType`](../enumerations/ServiceType.md)

##### method

`string`

##### addTrailingSlash?

`boolean` = `true`

#### Returns

`object`

##### targets

> **targets**: `string`[]

##### service

> **service**: [`ServiceType`](../enumerations/ServiceType.md)

##### method

> **method**: `string`

#### Inherited from

[`BaseService`](BaseService.md).[`makeTargets`](BaseService.md#maketargets)

***

### validateUrl()

> `protected` **validateUrl**(`url`): `void`

Defined in: [services/DefaultService.ts:20](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/DefaultService.ts#L20)

#### Parameters

##### url

`string`

#### Returns

`void`

#### Overrides

[`BaseService`](BaseService.md).[`validateUrl`](BaseService.md#validateurl)

***

### getRawHtml()

> **getRawHtml**(): `Promise`\<`unknown`[]\>

Defined in: [services/DefaultService.ts:32](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/DefaultService.ts#L32)

Gets raw default metadata.

#### Returns

`Promise`\<`unknown`[]\>

Extracted default result array

***

### getLinks()

> **getLinks**(): `Promise`\<`unknown`[]\>

Defined in: [services/DefaultService.ts:40](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/DefaultService.ts#L40)

Gets links.

#### Returns

`Promise`\<`unknown`[]\>

Extracted anchor result array
