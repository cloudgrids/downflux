[**downflux**](../README.md)

***

[downflux](../README.md) / TagFilterOptions

# Interface: TagFilterOptions

Defined in: [packages/base/BaseContracts.ts:7](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseContracts.ts#L7)

Options for filtering tag output.
Used by tag-based service operations.

## Properties

### allowedKeys?

> `optional` **allowedKeys?**: [`TagKeys`](../type-aliases/TagKeys.md)[]

Defined in: [packages/base/BaseContracts.ts:9](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseContracts.ts#L9)

Allowed tag keys

***

### format?

> `optional` **format?**: `"url"` \| `"path"`

Defined in: [packages/base/BaseContracts.ts:15](https://github.com/forkts/downflux/blob/f8a54ddab8a05646f24423a746e1b208eecdecca/packages/base/BaseContracts.ts#L15)

Output format for tag values

#### Default Value

```ts
'path'
```
