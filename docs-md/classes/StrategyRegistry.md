[**downflux**](../README.md)

***

[downflux](../README.md) / StrategyRegistry

# Class: StrategyRegistry

Defined in: [packages/core/registries/StrategyRegistry.ts:75](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/core/registries/StrategyRegistry.ts#L75)

Resolves provider transport strategies for HTTP clients.

## Remarks

The strategy registry keeps HTTP engines generic. Engines ask for the current
provider strategy and then apply provider-specific fallback, redirect, or
re-extraction behavior without importing provider modules themselves.

## Constructors

### Constructor

> **new StrategyRegistry**(`progressManager`): `StrategyRegistry`

Defined in: [packages/core/registries/StrategyRegistry.ts:78](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/core/registries/StrategyRegistry.ts#L78)

#### Parameters

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`StrategyRegistry`

## Methods

### getStrategy()

> **getStrategy**(`provider`): `Promise`\<[`BaseStrategy`](BaseStrategy.md)\>

Defined in: [packages/core/registries/StrategyRegistry.ts:100](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/core/registries/StrategyRegistry.ts#L100)

Creates a strategy instance for the requested provider.

#### Parameters

##### provider

[`ProviderType`](../enumerations/ProviderType.md)

Provider whose transport strategy should be loaded.

#### Returns

`Promise`\<[`BaseStrategy`](BaseStrategy.md)\>

Provider strategy, or the default strategy fallback.
