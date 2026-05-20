[**downflux**](../README.md)

***

[downflux](../README.md) / TransformerRegistry

# Class: TransformerRegistry

Defined in: [packages/core/registries/TransformerRegistry.ts:77](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/core/registries/TransformerRegistry.ts#L77)

Resolves provider transformers and runs metadata extraction.

## Remarks

The transformer registry lets coordinators ask for "the transformer for this
provider" without importing provider modules directly. This keeps startup
lighter and preserves a single place for provider-to-class mapping.

## Constructors

### Constructor

> **new TransformerRegistry**(`httpClient`, `progressManager`): `TransformerRegistry`

Defined in: [packages/core/registries/TransformerRegistry.ts:80](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/core/registries/TransformerRegistry.ts#L80)

#### Parameters

##### httpClient

[`HttpClient`](HttpClient.md)

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`TransformerRegistry`

## Methods

### transform()

> **transform**\<`TArgs`, `TResult`\>(`url`, `request`): `Promise`\<`TResult`\>

Defined in: [packages/core/registries/TransformerRegistry.ts:106](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/core/registries/TransformerRegistry.ts#L106)

Runs the matching transformer for a URL and request.

#### Type Parameters

##### TArgs

`TArgs` *extends* [`ExecutionArgs`](../interfaces/ExecutionArgs.md)\<[`ExecutionShape`](../type-aliases/ExecutionShape.md)\>

##### TResult

`TResult`

#### Parameters

##### url

`string`

Target URL to transform.

##### request

`TArgs`

Execution request containing the provider.

#### Returns

`Promise`\<`TResult`\>

Provider metadata in the requested result shape.
