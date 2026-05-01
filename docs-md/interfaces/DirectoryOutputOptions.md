[**downflux**](../README.md)

***

[downflux](../README.md) / DirectoryOutputOptions

# Interface: DirectoryOutputOptions

Defined in: [util/interfaces/common/DirectoryOutputOptions.ts:5](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DirectoryOutputOptions.ts#L5)

Directory output options.
Controls where downloaded files are written.

## Properties

### directoryPath?

> `optional` **directoryPath?**: `string`

Defined in: [util/interfaces/common/DirectoryOutputOptions.ts:10](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DirectoryOutputOptions.ts#L10)

Directory path for written files

#### Default Value

```ts
process.cwd()
```

***

### prefix?

> `optional` **prefix?**: `string`

Defined in: [util/interfaces/common/DirectoryOutputOptions.ts:13](https://github.com/forkts/downflux/blob/e6be934e249b80ac51d3bc8b2250e75bef4b2af2/src/util/interfaces/common/DirectoryOutputOptions.ts#L13)

Filename prefix
