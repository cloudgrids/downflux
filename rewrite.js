const fs = require('fs');

// 1. Parser
let parserCode = fs.readFileSync('src/parser/html-parser.service.ts', 'utf8');
if (!parserCode.includes('export const parser = new HtmlParserService();')) {
  parserCode += '\nexport const parser = new HtmlParserService();\n';
  fs.writeFileSync('src/parser/html-parser.service.ts', parserCode);
}

let parserIndex = `export * from './html-parser.service';\n`;
fs.writeFileSync('src/parser/index.ts', parserIndex);

// 2. Fetcher
let fetcherCode = fs.readFileSync('src/fetcher/http-fetcher.ts', 'utf8');
fetcherCode = fetcherCode
  .replace(/export async function fetchHtml/g, 'public async fetchHtml')
  .replace(/export async function fetchBuffer/g, 'public async fetchBuffer')
  .replace(/function sleep/g, 'private sleep(ms: number): Promise<void> {\n  return new Promise((resolve) => setTimeout(resolve, ms));\n}')
  .replace(/const DEFAULT_HEADERS/, 'private readonly DEFAULT_HEADERS')
  .replace(/(private sleep.*?\n})/, ''); // remove old sleep if needed - wait we'll do this better manually.
