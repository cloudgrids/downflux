# DownFlux

A modular, highly scalable media downflux, scraper, and downloader tool built with Node.js, TypeScript, and `undici`.

## Features

- **Builder Pattern API:** Easy-to-use chainable methods (`new DefaultService(url).getAlbums()`).
- **Advanced HTTP Fetching:** Uses `undici` for robust connection pooling and chunk streaming.
- **Multiple Output Targets:** Easily pipe your downloads to `local` disk, a `pipeline` buffer, a `zip` file, or simply `log`.
- **Modular Architecture:** Clean dependency injection separating fetchers, parsers, extractors, and downloaders.
- **Dual module support:** Provides both CommonJS (`index.js`) and ESM (`index.mjs`) exports.

## Installation

Install using your preferred package manager:

```bash
pnpm add downflux
# or
npm install downflux
# or
yarn add downflux
```

## Quick Start / Usage

```typescript
import { downflux } from 'downflux';

async function main() {
  const url = 'https://sitename/albums/1300/';

  // 1. Initialize the specific Service via the factory
  const extractor = downflux.import(url);

  // 2. Chain exactly what you want to extract and where to output it
  const result = await extractor
 .setOutput(OutputType.DEVICE)
 .addOptions({ device: { path: 'downloads' } })
 .getAlbum('6641');

  console.log('Finished extraction! Downloaded files:', result.downloads?.length);
}

main().catch(console.error);
```

## Supported Services

Currently, the default library provides handlers for:

- `OkPornService`
- `CoomerService`
- _More incoming..._

Each Service inherits from `BaseService` and exposes methods tailored specifically to its media source patterns.

## Development

Clone the project and install dependencies:

```bash
git clone https://github.com/forkts/downflux.git
cd downflux
pnpm install
```

### Useful Scripts

- `pnpm test:run` - Runs the test executor (via `tsx`) to manually verify extraction routines.
- `pnpm build` - Compiles TypeScript to `dist/` and generates ESM wrappers.
- `pnpm format` - Auto-formats code via Prettier.
- `pnpm lint:test` - Lints the codebase using ESLint.
- `pnpm release` - Generates changelog and bumps version using `standard-version`.

## License

MIT © [forkts](https://github.com/forkts)
