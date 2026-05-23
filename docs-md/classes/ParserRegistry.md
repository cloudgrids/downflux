[**downflux**](../README.md)

***

[downflux](../README.md) / ParserRegistry

# Class: ParserRegistry

Defined in: [packages/core/registries/ParserRegistry.ts:98](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/core/registries/ParserRegistry.ts#L98)

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

Defined in: [packages/core/registries/ParserRegistry.ts:121](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/core/registries/ParserRegistry.ts#L121)

Creates a parser instance for the requested provider.

#### Parameters

##### provider

[`Provider`](../enumerations/Provider.md)

Provider whose parser should be loaded.

#### Returns

`Promise`\<[`BaseParser`](BaseParser.md)\>

Parser instance for the provider, or the default parser fallback.
