[**downflux**](../README.md)

***

[downflux](../README.md) / ProviderMetadata

# Interface: ProviderMetadata

Defined in: [packages/base/BaseContracts.ts:29](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseContracts.ts#L29)

Describes provider capabilities, integration status, and access restrictions.

## Remarks

Provider metadata lets the execution layer make conservative decisions without
hard-coding site behavior into registries, engines, or storage code. It also
documents which parts of a provider are verified, still experimental, or
blocked by external requirements such as login, browser automation, or geo
restrictions.

## Properties

### hasHls

> **hasHls**: `boolean`

Defined in: [packages/base/BaseContracts.ts:31](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseContracts.ts#L31)

Whether the site exposes HLS playlist sources.

***

### hlsIntegrated?

> `optional` **hlsIntegrated?**: `boolean`

Defined in: [packages/base/BaseContracts.ts:34](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseContracts.ts#L34)

Whether HLS sources are wired into the download pipeline.

***

### hasMp4

> **hasMp4**: `boolean`

Defined in: [packages/base/BaseContracts.ts:37](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseContracts.ts#L37)

Whether the site exposes direct MP4/progressive sources.

***

### mp4Integrated?

> `optional` **mp4Integrated?**: `boolean`

Defined in: [packages/base/BaseContracts.ts:40](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseContracts.ts#L40)

Whether MP4 sources are wired into the download pipeline.

***

### hasKvs

> **hasKvs**: `boolean`

Defined in: [packages/base/BaseContracts.ts:43](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseContracts.ts#L43)

Whether the site uses KVS/Kernel Video Sharing page variables.

***

### hasEmbeddableVideos?

> `optional` **hasEmbeddableVideos?**: `boolean`

Defined in: [packages/base/BaseContracts.ts:46](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseContracts.ts#L46)

Whether the site exposes embeddable video pages.

***

### underGeoRestriction

> **underGeoRestriction**: `boolean`

Defined in: [packages/base/BaseContracts.ts:49](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseContracts.ts#L49)

Whether access may vary by region.

***

### cloudflareChallenge?

> `optional` **cloudflareChallenge?**: `boolean`

Defined in: [packages/base/BaseContracts.ts:52](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseContracts.ts#L52)

Whether Cloudflare or similar anti-bot handling is expected.

***

### requiresBrowser

> **requiresBrowser**: `boolean`

Defined in: [packages/base/BaseContracts.ts:55](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseContracts.ts#L55)

Whether extraction requires browser automation instead of plain HTTP.

***

### underDevelopment

> **underDevelopment**: `boolean`

Defined in: [packages/base/BaseContracts.ts:58](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseContracts.ts#L58)

Whether the provider is still changing or only partially supported.

***

### needsExternalAPI?

> `optional` **needsExternalAPI?**: `boolean`

Defined in: [packages/base/BaseContracts.ts:61](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseContracts.ts#L61)

Whether extraction depends on an external API.

***

### canDownload?

> `optional` **canDownload?**: `boolean`

Defined in: [packages/base/BaseContracts.ts:64](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseContracts.ts#L64)

Whether downloads are expected to work for supported methods.

***

### nonFunctional?

> `optional` **nonFunctional?**: `boolean`

Defined in: [packages/base/BaseContracts.ts:67](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseContracts.ts#L67)

Whether the provider is known to be non-functional.

***

### sniSpoofingIssues?

> `optional` **sniSpoofingIssues?**: `boolean`

Defined in: [packages/base/BaseContracts.ts:70](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseContracts.ts#L70)

Whether SNI spoofing is known to cause issues for this site.

***

### requiresLogin?

> `optional` **requiresLogin?**: `boolean`

Defined in: [packages/base/BaseContracts.ts:73](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseContracts.ts#L73)

Whether content access requires an authenticated user session.

***

### sniSpoofing

> **sniSpoofing**: [`SniSpoofStatus`](../type-aliases/SniSpoofStatus.md)

Defined in: [packages/base/BaseContracts.ts:76](https://github.com/forkts/downflux/blob/59e8e150ff93e02d42e916c7aeaab450c6d72ec3/packages/base/BaseContracts.ts#L76)

Current support status for SNI spoofing on this provider.
