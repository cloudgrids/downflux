import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { RegistryCoordinator } from '../src/contracts';

const appendUniqueJsonToRegistry = <T extends Record<string, RegistryCoordinator[]>>(
	file: string,
	key: keyof T,
	value: string,
	strategy: boolean = true
) => {
	const raw = readFileSync(file, 'utf-8');

	const parsed = JSON.parse(raw) as T;

	if (!parsed[key].find((s) => s.name === value)) {
		const newService: RegistryCoordinator = {
			name: value,
			parser: true,
			pipeline: true,
			transformer: true,
			strategy,
			method: true
		};

		parsed[key].push(newService);
		console.log(`Appended ${value} in registry`);

		writeFileSync(file, JSON.stringify(parsed, null, 2));
	}
};

export const appendUniqueJsonToPaths = <T extends Record<string, string[]>>(file: string, key: keyof T, value: string) => {
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

	if (!names.length) {
		console.error('Please provide at least one file name to append in registry');
		process.exit(1);
	}

	for (const name of names) {
		appendUniqueJsonToRegistry(registryPath, 'services', name);
	}
})();

console.log('\nRegistry created and paths appended. Next steps:');
console.log('- If your editor shows ESLint/TS errors, reload the window.');
console.log("- Run 'pnpm run generate'");
