import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { RegistryCoordinator } from '../../packages/contracts';

interface Registry {
	services: RegistryCoordinator[];
}

const root = process.cwd();
const registryPath = join(root, 'scripts/codegen/registry.json');
const templatesDir = join(root, 'scripts/codegen/templates');

const registry = JSON.parse(readFileSync(registryPath, 'utf-8')) as Registry;

const ensureDir = (filePath: string) => mkdirSync(dirname(filePath), { recursive: true });

const write = (rel: string, content: string) => {
	const p = join(root, rel);
	ensureDir(p);
	writeFileSync(p, content);
	console.log('Wrote', rel);
};

const loadTemplate = (name: string): string => {
	const p = join(templatesDir, name);
	return readFileSync(p, 'utf-8');
};

const render = (template: string, ctx: Record<string, string>): string => {
	return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) => ctx[key] ?? '');
};

const replaceProviderType = (members: string) => {
	const providerTypesPath = join(root, 'packages/types/ExecutionTypes.ts');
	const current = readFileSync(providerTypesPath, 'utf-8');
	const next = current.replace(/export enum ProviderType \{[\s\S]*?\n\}/, render(loadTemplate('ProviderType.hbs'), { members }));
	write('packages/types/ExecutionTypes.ts', next);
};

// Create per-service files from templates
for (const svc of registry.services) {
	const name = svc.name;
	const nameLower = name.toLowerCase();
	const execArgsName = `${name}ExecArgs`;
	const outputName = `${name}Output`;
	const methodName = `${name}Methods`;

	// Interface: ExecArgs
	const execPath = `packages/providers/${nameLower}/${name}Contracts.ts`;
	if (!existsSync(join(root, execPath))) {
		write(execPath, render(loadTemplate('ProviderExecArgs.hbs'), { ArgsName: execArgsName }));
	}

	// Interface: Output
	const outPath = `packages/providers/${nameLower}/${name}Contracts.ts`;
	if (!existsSync(join(root, outPath))) {
		write(outPath, render(loadTemplate('ProviderOutput.hbs'), { OutputName: outputName }));
	}

	// Enum: Method
	if (svc.method) {
		const methodPath = `packages/providers/${nameLower}/${name}Types.ts`;
		if (!existsSync(join(root, methodPath))) {
			write(methodPath, render(loadTemplate('ProviderMethods.hbs'), { MethodName: methodName }));
		}
	}

	// Parser
	if (svc.parser) {
		const parserPath = `packages/providers/${nameLower}/${name}Parser.ts`;
		if (!existsSync(join(root, parserPath))) {
			write(parserPath, render(loadTemplate('parser.hbs'), { ProviderName: name }));
		}
	}

	// Provider
	const servicePath = `packages/providers/${nameLower}/${name}Provider.ts`;
	if (!existsSync(join(root, servicePath))) {
		write(servicePath, render(loadTemplate('provider.hbs'), { ProviderName: name, ArgsName: execArgsName }));
	}

	// Pipeline
	if (svc.pipeline) {
		const pipelinePath = `packages/providers/${nameLower}/${name}Pipeline.ts`;
		if (!existsSync(join(root, pipelinePath))) {
			write(
				pipelinePath,
				render(loadTemplate('pipeline.hbs'), { ProviderName: name, ArgsName: execArgsName, OutputName: outputName })
			);
		}
	}

	// Transformer
	if (svc.transformer) {
		const transformerPath = `packages/providers/${nameLower}/${name}Transformer.ts`;
		if (!existsSync(join(root, transformerPath))) {
			write(
				transformerPath,
				render(loadTemplate('transformer.hbs'), {
					ProviderName: name,
					ArgsName: execArgsName,
					OutputName: outputName,
					MethodName: methodName
				})
			);
		}
	}

	// Strategy
	if (svc.strategy) {
		const strategyPath = `packages/providers/${nameLower}/${name}Strategy.ts`;
		if (!existsSync(join(root, strategyPath))) {
			write(strategyPath, render(loadTemplate('strategy.hbs'), { ProviderName: name }));
		}
	}
}

// Generate ProviderType enum
const members = registry.services
	.map((s) => `\t${s.name} = '${s.name}Provider',`)
	.sort()
	.join('\n');
replaceProviderType(members);

// Generate StrategyRegistry registry (Strategies)
const strategyServices = registry.services.filter((s) => s.strategy);
const sImports = strategyServices
	.map((s) => `import { ${s.name}Strategy } from '@app/providers';`)
	.sort()
	.join('\n');
const sEntries = registry.services
	.map((s) => `\t\t[ProviderType.${s.name}]: ${s.strategy ? `${s.name}Strategy` : 'BaseStrategy'}`)
	.sort()
	.join(',\n');
write(
	'packages/core/registries/StrategyRegistry.ts',
	render(loadTemplate('StrategyRegistry.hbs'), { imports: sImports, entries: sEntries })
);

// Generate ParserRegistry
const parserServices = registry.services.filter((s) => s.parser);
const imports = parserServices
	.map((s) => `import { ${s.name}Parser } from '@app/providers';`)
	.sort()
	.join('\n');
const entries = registry.services
	.map((s) => `\t\t[ProviderType.${s.name}]: ${s.parser ? `new ${s.name}Parser()` : 'new BaseParser()'}`)
	.sort()
	.join(',\n');
write('packages/core/registries/ParserRegistry.ts', render(loadTemplate('ParserRegistry.hbs'), { imports, entries }));

// Generate PipelineRegistry
const pipelineServices = registry.services.filter((s) => s.pipeline);
const pImports = pipelineServices
	.map((s) => `import { ${s.name}Pipeline } from '@app/providers';`)
	.sort()
	.join('\n');
const pEntries = registry.services
	.map((s) => `\t\t[ProviderType.${s.name}, ${s.pipeline ? `${s.name}Pipeline` : 'BasePipeline'}]`)
	.sort()
	.join(',\n');
write(
	'packages/core/registries/PipelineRegistry.ts',
	render(loadTemplate('PipelineRegistry.hbs'), { imports: pImports, entries: pEntries })
);

// Append transformer in TransformerRegistry
const transformers = registry.services.filter((s) => s.transformer);
const tImports = transformers
	.map((s) => `import { ${s.name}Transformer } from '@app/providers';`)
	.sort()
	.join('\n');
const tEntries = registry.services
	.map((s) => `\t\t[ProviderType.${s.name}]: ${s.transformer ? `${s.name}Transformer` : 'BaseTransformer'}`)
	.sort()
	.join(',\n');
write(
	'packages/core/registries/TransformerRegistry.ts',
	render(loadTemplate('TransformerRegistry.hbs'), { imports: tImports, entries: tEntries })
);

console.log('\nCodegen finished. Next steps:');
console.log('- If your editor shows ESLint/TS errors, reload the window.');
console.log("- Run 'pnpm run make:index' then 'pnpm run format' to update barrels and format.");
