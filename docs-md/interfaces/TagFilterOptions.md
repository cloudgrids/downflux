[**downflux**](../README.md)

***

[downflux](../README.md) / TagFilterOptions

# Interface: TagFilterOptions

Defined in: [packages/base/BaseContracts.ts:8](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseContracts.ts#L8)

Options for filtering tag output.
Used by tag-based service operations.

## Properties

### allowedKeys?

> `optional` **allowedKeys?**: [`TagKeys`](../type-aliases/TagKeys.md)[]

Defined in: [packages/base/BaseContracts.ts:10](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseContracts.ts#L10)

Allowed tag keys

***

### format?

> `optional` **format?**: `"url"` \| `"path"`

Defined in: [packages/base/BaseContracts.ts:16](https://github.com/forkts/downflux/blob/5efca2ef75dcde54077f697ac650839042e172a5/packages/base/BaseContracts.ts#L16)

Output format for tag values

#### Default Value

```ts
'path'
```
