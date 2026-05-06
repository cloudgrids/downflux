import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { RegistryService } from '../src/util';

const appendUniqueJsonToRegistry = <T extends Record<string, RegistryService[]>>(file: string, key: keyof T, value: string) => {
	const raw = readFileSync(file, 'utf-8');

	const parsed = JSON.parse(raw) as T;

	if (!parsed[key].find((s) => s.name === value)) {
		const newService = {
			name: value,
			parser: true,
			pipeline: true,
			transformer: true,
			strategy: false
		};

		parsed[key].push(newService);
		console.log(`Appended ${value} in registry`);

		writeFileSync(file, JSON.stringify(parsed, null, 2));
	}
};

const appendUniqueJsonToPaths = <T extends Record<string, string[]>>(file: string, key: keyof T, value: string) => {
	const raw = readFileSync(file, 'utf-8');

	const parsed = JSON.parse(raw) as T;

	if (!parsed[key].includes(value)) {
		parsed[key].push(value);
		console.log(`Appended ${value} in paths`);

		parsed[key].sort();

		writeFileSync(file, JSON.stringify(parsed, null, 2));
	}
};

(async () => {
	const names = process.argv.slice(2);

	const registryPath = join(process.cwd(), 'scripts/codegen/registry.json');
	const jsonPath = join(process.cwd(), 'paths.json');

	if (!names.length) {
		console.error('Please provide at least one file name append in registry');
		process.exit(1);
	}

	for (const name of names) {
		appendUniqueJsonToRegistry(registryPath, 'services', name);
		appendUniqueJsonToPaths(jsonPath, 'paths', `src/util/interfaces/services/${name.toLowerCase()}`);
	}
})();

console.log('\nRegistry created and paths appended. Next steps:');
console.log('- If your editor shows ESLint/TS errors, reload the window.');
console.log("- Run 'pnpm run generate'");
