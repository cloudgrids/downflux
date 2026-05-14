[**downflux**](../README.md)

***

[downflux](../README.md) / StrategyRegistry

# Class: StrategyRegistry

Defined in: [packages/core/registries/StrategyRegistry.ts:47](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/core/registries/StrategyRegistry.ts#L47)

## Constructors

### Constructor

> **new StrategyRegistry**(`progressManager`): `StrategyRegistry`

Defined in: [packages/core/registries/StrategyRegistry.ts:50](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/core/registries/StrategyRegistry.ts#L50)

#### Parameters

##### progressManager

[`ProgressManager`](ProgressManager.md)

#### Returns

`StrategyRegistry`

## Methods

### getStrategy()

> **getStrategy**(`provider`): `Promise`\<[`BaseStrategy`](BaseStrategy.md)\>

Defined in: [packages/core/registries/StrategyRegistry.ts:66](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/core/registries/StrategyRegistry.ts#L66)

#### Parameters

##### provider

[`ProviderType`](../enumerations/ProviderType.md)

#### Returns

`Promise`\<[`BaseStrategy`](BaseStrategy.md)\>
