---
name: Provider Implementation
about: Template for implementing a new provider
title: 'FEATURE: Implement [Provider Name] Provider'
labels: 'enhancement'
assignees: ''
---

**DESTINATION:** `packages/providers/[provider-name]`

**IDEA:**

Implement a complete provider integration for **[Provider Name]** following the existing provider architecture.

## Provider Details

- **Site URL:** [URL]
- **Provider Type:** Gallery/General
- **Status:** Not yet fully implemented
- **Priority:** Medium

## Implementation Checklist

- [ ] Create Provider Contract (`[ProviderName]Contracts.ts`)
- [ ] Create Provider Parser (`[ProviderName]Parser.ts`)
- [ ] Create Provider Transformer (`[ProviderName]Transformer.ts`)
- [ ] Create Provider Pipeline (`[ProviderName]Pipeline.ts`)
- [ ] Create Provider Class (`[ProviderName]Provider.ts`)
- [ ] Create Provider Types (`[ProviderName]Types.ts`)
- [ ] Create Provider Index (`index.ts`)
- [ ] Export from main providers index
- [ ] Add to README table
- [ ] Add JSDoc comments
- [ ] Test extraction
- [ ] Verify metadata fields

## Required Files Structure

```
packages/providers/[provider-name]/
├── [ProviderName]Contracts.ts   # Interface definitions
├── [ProviderName]Parser.ts      # HTML extraction logic
├── [ProviderName]Transformer.ts # Data transformation
├── [ProviderName]Pipeline.ts    # Pipeline configuration
├── [ProviderName]Provider.ts    # Main provider class
├── [ProviderName]Types.ts       # Type definitions and enums
└── index.ts                     # Barrel export
```

## Reference Pattern

Follow the pattern from similar providers like XDegu or DaNude for adult content sites, or use ArtStation/Behance pattern for gallery sites.

## Testing

- [ ] Create integration test
- [ ] Verify extraction works correctly
- [ ] Check metadata completeness
- [ ] Test error handling
