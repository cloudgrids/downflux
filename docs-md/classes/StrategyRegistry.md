[**downflux**](../README.md)

***

[downflux](../README.md) / StrategyRegistry

# Class: StrategyRegistry

Defined in: [packages/core/registries/StrategyRegistry.ts:53](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/core/registries/StrategyRegistry.ts#L53)

## Constructors

### Constructor

> **new StrategyRegistry**(`progressManager`): `StrategyRegistry`

Defined in: [packages/core/registries/StrategyRegistry.ts:56](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/core/registries/StrategyRegistry.ts#L56)

#### Parameters

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`StrategyRegistry`

## Methods

### getStrategy()

> **getStrategy**(`provider`): `Promise`\<[`BaseStrategy`](BaseStrategy.md)\>

Defined in: [packages/core/registries/StrategyRegistry.ts:72](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/core/registries/StrategyRegistry.ts#L72)

#### Parameters

##### provider

[`ProviderType`](../enumerations/ProviderType.md)

#### Returns

`Promise`\<[`BaseStrategy`](BaseStrategy.md)\>
