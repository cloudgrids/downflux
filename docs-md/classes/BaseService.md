[**downflux**](../README.md)

***

[downflux](../README.md) / BaseService

# Abstract Class: BaseService\<TExec\>

Defined in: [services/BaseService.ts:22](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L22)

Base service API.
Shared fluent configuration and execution helpers.

## Extended by

- [`CoomerService`](CoomerService.md)
- [`DefaultService`](DefaultService.md)
- [`OkPornService`](OkPornService.md)
- [`WallHavenService`](WallHavenService.md)

## Type Parameters

### TExec

`TExec` *extends* [`ExecutionArgs`](../interfaces/ExecutionArgs.md)

## Constructors

### Constructor

> **new BaseService**\<`TExec`\>(`url`): `BaseService`\<`TExec`\>

Defined in: [services/BaseService.ts:32](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L32)

Creates a service instance.

#### Parameters

##### url

`string`

Source URL

#### Returns

`BaseService`\<`TExec`\>

## Properties

### jobOptions

> `protected` **jobOptions**: [`JobOptions`](../interfaces/JobOptions.md) = `{}`

Defined in: [services/BaseService.ts:23](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L23)

***

### httpOptions

> `protected` **httpOptions**: [`HttpFetchOptions`](../interfaces/HttpFetchOptions.md) = `{}`

Defined in: [services/BaseService.ts:24](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L24)

***

### deps

> `protected` `readonly` **deps**: [`ServiceDependencies`](../interfaces/ServiceDependencies.md)

Defined in: [services/BaseService.ts:25](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L25)

***

### url

> `readonly` **url**: `string`

Defined in: [services/BaseService.ts:32](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L32)

Source URL

## Methods

### validateUrl()

> `abstract` `protected` **validateUrl**(`url`): `void`

Defined in: [services/BaseService.ts:26](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L26)

#### Parameters

##### url

`string`

#### Returns

`void`

***

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

***

### buildRequest()

> `protected` **buildRequest**(`overrides?`): `TExec`

Defined in: [services/BaseService.ts:145](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L145)

#### Parameters

##### overrides?

`Partial`\<`TExec`\>

#### Returns

`TExec`

***

### execute()

> `protected` **execute**\<`TRes`\>(`overrides?`): `Promise`\<`TRes`[]\>

Defined in: [services/BaseService.ts:158](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/services/BaseService.ts#L158)

#### Type Parameters

##### TRes

`TRes`

#### Parameters

##### overrides?

`Partial`\<`TExec`\>

#### Returns

`Promise`\<`TRes`[]\>

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
