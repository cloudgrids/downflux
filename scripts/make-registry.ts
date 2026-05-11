import { readdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

interface RegistryCoordinator {
	name: string;
	parser: boolean;
	pipeline: boolean;
	transformer: boolean;
	strategy: boolean;
	method: boolean;
}

const rootDir = process.cwd();
const providersPath = join(rootDir, 'packages/providers');
const registryPath = join(rootDir, 'scripts/codegen/registry.json');

(async () => {
	const args = process.argv.slice(2);
	const names: string[] = [];
	const exclusions = new Set<string>();

	for (const arg of args) {
		if (arg.startsWith('--exclude-')) {
			exclusions.add(arg.replace('--exclude-', ''));
		} else if (arg.startsWith('--no-')) {
			exclusions.add(arg.replace('--no-', ''));
		} else {
			names.push(arg);
		}
	}

	const services: RegistryCoordinator[] = [];

	// 1. Scan existing providers
	if (statSync(providersPath).isDirectory()) {
		const dirs = readdirSync(providersPath).filter((f) => statSync(join(providersPath, f)).isDirectory());

		for (const dir of dirs) {
			const dirPath = join(providersPath, dir);
			const files = readdirSync(dirPath);

			const providerFile = files.find((f) => f.endsWith('Provider.ts'));
			if (providerFile) {
				const name = providerFile.replace('Provider.ts', '');
				services.push({
					name,
					parser: files.includes(`${name}Parser.ts`),
					pipeline: files.includes(`${name}Pipeline.ts`),
					transformer: files.includes(`${name}Transformer.ts`),
					strategy: files.includes(`${name}Strategy.ts`),
					method: files.includes(`${name}Types.ts`)
				});
			}
		}
	}

	// 2. Add new providers from arguments
	for (const name of names) {
		if (!services.find((s) => s.name.toLowerCase() === name.toLowerCase())) {
			services.push({
				name,
				parser: !exclusions.has('parser'),
				pipeline: !exclusions.has('pipeline'),
				transformer: !exclusions.has('transformer'),
				strategy: !exclusions.has('strategy'),
				method: !exclusions.has('method')
			});
			console.log(`Prepared to scaffold new provider: ${name}`);
		}
	}

	// 3. Write back to registry.json
	// Sort services alphabetically to keep diff clean
	services.sort((a, b) => a.name.localeCompare(b.name));

	writeFileSync(registryPath, JSON.stringify({ services }, null, 2));

	console.log(`\nRegistry rebuilt successfully at scripts/codegen/registry.json`);
	console.log((names.length ? `Added new components. ` : '') + `Total providers: ${services.length}`);
	console.log('\nNext steps:');
	console.log("- Run 'pnpm run generate' to build missing files based on this registry.");
})();
