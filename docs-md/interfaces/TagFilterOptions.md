[**downflux**](../README.md)

***

[downflux](../README.md) / TagFilterOptions

# Interface: TagFilterOptions

Defined in: [packages/base/BaseContracts.ts:7](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseContracts.ts#L7)

Options for filtering tag output.
Used by tag-based service operations.

## Properties

### allowedKeys?

> `optional` **allowedKeys?**: [`TagKeys`](../type-aliases/TagKeys.md)[]

Defined in: [packages/base/BaseContracts.ts:9](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseContracts.ts#L9)

Allowed tag keys

***

### format?

> `optional` **format?**: `"url"` \| `"path"`

Defined in: [packages/base/BaseContracts.ts:15](https://github.com/forkts/downflux/blob/006b207423ee96ab7915738c2b481e0f2c3fe609/packages/base/BaseContracts.ts#L15)

Output format for tag values

#### Default Value

```ts
'path'
```
