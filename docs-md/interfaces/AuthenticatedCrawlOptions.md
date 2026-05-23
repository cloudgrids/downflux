[**downflux**](../README.md)

***

[downflux](../README.md) / AuthenticatedCrawlOptions

# Interface: AuthenticatedCrawlOptions

Defined in: [packages/contracts/ExecutionContracts.ts:42](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L42)

Optional credentials/session material for providers that need authenticated
or API-backed crawling.

## Properties

### cookie?

> `optional` **cookie?**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:44](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L44)

Raw Cookie header value copied from an authenticated browser session.

***

### bearerToken?

> `optional` **bearerToken?**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:47](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L47)

Bearer token for API-backed providers.

***

### csrfToken?

> `optional` **csrfToken?**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:50](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L50)

CSRF token header value when the provider requires one.

***

### apiKey?

> `optional` **apiKey?**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:53](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L53)

API key for providers with public/private API access.

***

### clientId?

> `optional` **clientId?**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:56](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L56)

Provider-specific app/client identifier.

***

### userAgent?

> `optional` **userAgent?**: `string`

Defined in: [packages/contracts/ExecutionContracts.ts:59](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/contracts/ExecutionContracts.ts#L59)

User agent to pair with the authenticated session.
