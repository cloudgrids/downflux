[**downflux**](../README.md)

***

[downflux](../README.md) / ParserRegistry

# Class: ParserRegistry

Defined in: [packages/core/registries/ParserRegistry.ts:74](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/core/registries/ParserRegistry.ts#L74)

Resolves and caches parser classes by provider.

## Remarks

Registries keep provider lookup out of the execution flow. They lazy-load
provider modules, cache constructors, and fall back to default behavior when
a provider-specific implementation is absent.

## Constructors

### Constructor

> **new ParserRegistry**(): `ParserRegistry`

#### Returns

`ParserRegistry`

## Methods

### getParser()

> `static` **getParser**(`provider`): `Promise`\<[`BaseParser`](BaseParser.md)\>

Defined in: [packages/core/registries/ParserRegistry.ts:97](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/core/registries/ParserRegistry.ts#L97)

Creates a parser instance for the requested provider.

#### Parameters

##### provider

[`ProviderType`](../enumerations/ProviderType.md)

Provider whose parser should be loaded.

#### Returns

`Promise`\<[`BaseParser`](BaseParser.md)\>

Parser instance for the provider, or the default parser fallback.
