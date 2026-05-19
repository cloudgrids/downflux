[**downflux**](../README.md)

***

[downflux](../README.md) / ExceptionPayload

# Interface: ExceptionPayload\<TMeta\>

Defined in: [packages/core/exceptions/BaseException.ts:3](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/core/exceptions/BaseException.ts#L3)

## Type Parameters

### TMeta

`TMeta` = `any`

## Properties

### errorCode

> **errorCode**: [`ErrorCodes`](../enumerations/ErrorCodes.md)

Defined in: [packages/core/exceptions/BaseException.ts:4](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/core/exceptions/BaseException.ts#L4)

***

### message

> **message**: `string`

Defined in: [packages/core/exceptions/BaseException.ts:5](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/core/exceptions/BaseException.ts#L5)

***

### provider

> **provider**: [`ProviderType`](../enumerations/ProviderType.md)

Defined in: [packages/core/exceptions/BaseException.ts:6](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/core/exceptions/BaseException.ts#L6)

***

### method?

> `optional` **method?**: `string`

Defined in: [packages/core/exceptions/BaseException.ts:7](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/core/exceptions/BaseException.ts#L7)

***

### context?

> `optional` **context?**: `Record`\<`string`, `any`\>

Defined in: [packages/core/exceptions/BaseException.ts:8](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/core/exceptions/BaseException.ts#L8)

***

### metadata?

> `optional` **metadata?**: `TMeta`

Defined in: [packages/core/exceptions/BaseException.ts:9](https://github.com/forkts/downflux/blob/ace180dbba52910f63b8b484be2b990bfedaa08c/packages/core/exceptions/BaseException.ts#L9)
