import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { RegistryCoordinator } from '../../src/contracts';

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

// Create per-service files from templates
for (const svc of registry.services) {
	const name = svc.name;
	const nameLower = name.toLowerCase();
	const execArgsName = `${name}ExecArgs`;
	const outputName = `${name}Output`;
	const methodName = `${name}Methods`;

	// Interface: ExecArgs
	const execPath = `src/contracts/providers/${nameLower}/${execArgsName}.ts`;
	if (!existsSync(join(root, execPath))) {
		write(execPath, render(loadTemplate('ProviderExecArgs.hbs'), { ArgsName: execArgsName }));
	}

	// Interface: Output
	const outPath = `src/contracts/providers/${nameLower}/${outputName}.ts`;
	if (!existsSync(join(root, outPath))) {
		write(outPath, render(loadTemplate('ProviderOutput.hbs'), { OutputName: outputName }));
	}

	// Enum: Method
	if (svc.method) {
		const methodPath = `src/shared/providers/${nameLower}/${methodName}.ts`;
		if (!existsSync(join(root, methodPath))) {
			write(methodPath, render(loadTemplate('ProviderMethods.hbs'), { MethodName: methodName }));
		}
	}

	// Parser
	if (svc.parser) {
		const parserPath = `src/parsers/${name}Parser.ts`;
		if (!existsSync(join(root, parserPath))) {
			write(parserPath, render(loadTemplate('Parser.hbs'), { ProviderName: name }));
		}
	}

	// Provider
	const servicePath = `src/providers/${name}Provider.ts`;
	if (!existsSync(join(root, servicePath))) {
		write(servicePath, render(loadTemplate('Provider.hbs'), { ProviderName: name, ArgsName: execArgsName }));
	}

	// Pipeline
	if (svc.pipeline) {
		const pipelinePath = `src/pipelines/${name}Pipeline.ts`;
		if (!existsSync(join(root, pipelinePath))) {
			write(
				pipelinePath,
				render(loadTemplate('Pipeline.hbs'), { ProviderName: name, ArgsName: execArgsName, OutputName: outputName })
			);
		}
	}

	// Transformer
	if (svc.transformer) {
		const transformerPath = `src/transformers/${name}Transformer.ts`;
		if (!existsSync(join(root, transformerPath))) {
			write(
				transformerPath,
				render(loadTemplate('Transformer.hbs'), {
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
		const strategyPath = `src/strategies/${name}Strategy.ts`;
		if (!existsSync(join(root, strategyPath))) {
			write(strategyPath, render(loadTemplate('Strategy.hbs'), { ProviderName: name }));
		}
	}
}

// Generate ProviderType enum
const members = registry.services
	.map((s) => `\t${s.name} = '${s.name}Provider',`)
	.sort()
	.join('\n');
write('src/shared/enums/ProviderType.ts', render(loadTemplate('ProviderType.hbs'), { members }));

// Generate StrategyRegistry registry (Strategies)
const strategyServices = registry.services.filter((s) => s.strategy);
const sImports = strategyServices
	.map((s) => `import { ${s.name}Strategy } from './${s.name}Strategy';`)
	.sort()
	.join('\n');
const sEntries = registry.services
	.map((s) => `\t\t[ProviderType.${s.name}]: ${s.strategy ? `${s.name}Strategy` : 'DefaultStrategy'}`)
	.sort()
	.join(',\n');
write('src/strategies/StrategyRegistry.ts', render(loadTemplate('StrategyRegistry.hbs'), { imports: sImports, entries: sEntries }));

// Generate ParserRegistry
const parserServices = registry.services.filter((s) => s.parser);
const imports = parserServices
	.map((s) => `import { ${s.name}Parser } from './${s.name}Parser';`)
	.sort()
	.join('\n');
const entries = registry.services
	.map((s) => `\t\t[ProviderType.${s.name}]: ${s.parser ? `new ${s.name}Parser()` : 'new DefaultParser()'}`)
	.sort()
	.join(',\n');
write('src/parsers/ParserRegistry.ts', render(loadTemplate('ParserRegistry.hbs'), { imports, entries }));

// Generate PipelineRegistry
const pipelineServices = registry.services.filter((s) => s.pipeline);
const pImports = pipelineServices
	.map((s) => `import { ${s.name}Pipeline } from './${s.name}Pipeline';`)
	.sort()
	.join('\n');
const pEntries = registry.services
	.map((s) => `\t\t[ProviderType.${s.name}, ${s.pipeline ? `${s.name}Pipeline` : 'DefaultPipeline'}]`)
	.sort()
	.join(',\n');
write('src/pipelines/PipelineRegistry.ts', render(loadTemplate('PipelineRegistry.hbs'), { imports: pImports, entries: pEntries }));

// Append transformer in TransformerRegistry
const transformers = registry.services.filter((s) => s.transformer);
const tImports = transformers
	.map((s) => `import { ${s.name}Transformer } from './${s.name}Transformer';`)
	.sort()
	.join('\n');
const tEntries = registry.services
	.map((s) => `\t\t[ProviderType.${s.name}]: ${s.transformer ? `${s.name}Transformer` : 'DefaultTransformer'}`)
	.sort()
	.join(',\n');
write('src/transformers/TransformerRegistry.ts', render(loadTemplate('TransformerRegistry.hbs'), { imports: tImports, entries: tEntries }));

console.log('\nCodegen finished. Next steps:');
console.log('- If your editor shows ESLint/TS errors, reload the window.');
console.log("- Run 'pnpm run make:index' then 'pnpm run format' to update barrels and format.");
