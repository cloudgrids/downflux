import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

interface RegistryService {
	name: string;
	parser?: boolean;
	pipeline?: boolean;
	transformer?: boolean;
	strategy?: boolean;
}

interface Registry {
	services: RegistryService[];
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

	// Interface: ExecArgs
	const execPath = `src/util/interfaces/services/${nameLower}/${execArgsName}.ts`;
	if (!existsSync(join(root, execPath))) {
		write(execPath, render(loadTemplate('execArgs.hbs'), { ArgsName: execArgsName }));
	}

	// Interface: Output
	const outPath = `src/util/interfaces/services/${nameLower}/${outputName}.ts`;
	if (!existsSync(join(root, outPath))) {
		write(outPath, render(loadTemplate('output.hbs'), { OutputName: outputName }));
	}

	// Parser
	if (svc.parser) {
		const parserPath = `src/parsers/${name}ParserService.ts`;
		if (!existsSync(join(root, parserPath))) {
			write(parserPath, render(loadTemplate('parser.hbs'), { ServiceName: name }));
		}
	}

	// Service
	const servicePath = `src/services/${name}Service.ts`;
	if (!existsSync(join(root, servicePath))) {
		write(servicePath, render(loadTemplate('service.hbs'), { ServiceName: name, ArgsName: execArgsName }));
	}

	// Pipeline
	if (svc.pipeline) {
		const pipelinePath = `src/pipelines/${name}Pipeline.ts`;
		if (!existsSync(join(root, pipelinePath))) {
			write(
				pipelinePath,
				render(loadTemplate('pipeline.hbs'), { ServiceName: name, ArgsName: execArgsName, OutputName: outputName })
			);
		}
	}

	// Transformer
	if (svc.transformer) {
		const transformerPath = `src/transformers/${name}Transformer.ts`;
		if (!existsSync(join(root, transformerPath))) {
			write(transformerPath, render(loadTemplate('transformer.hbs'), { ServiceName: name, ArgsName: execArgsName }));
		}
	}

	// Strategy (if applicable)
	if (svc.strategy) {
		const strategyPath = `src/strategies/${name}Strategy.ts`;
		if (!existsSync(join(root, strategyPath))) {
			write(strategyPath, render(loadTemplate('strategy.hbs'), { ServiceName: name }));
		}
	}
}

// Generate ServiceType enum
const members = registry.services.map((s) => `\t${s.name} = '${s.name}Service',`).join('\n');
write('src/util/enums/common/ServiceType.ts', render(loadTemplate('enum.hbs'), { members }));

// Generate StrategyService registry (Strategies)
const strategyServices = registry.services.filter((s) => s.strategy);
const sImports = strategyServices.map((s) => `import { ${s.name}Strategy } from './${s.name}Strategy';`).join('\n');
const sEntries = registry.services
	.map((s) => `\t\t[ServiceType.${s.name}]: ${s.strategy ? `${s.name}Strategy` : 'BaseStrategy'}`)
	.join(',\n');
write('src/strategies/Strategy.ts', render(loadTemplate('strategyService.hbs'), { imports: sImports, entries: sEntries }));

// Generate HtmlParserService
const parserServices = registry.services.filter((s) => s.parser);
const imports = parserServices.map((s) => `import { ${s.name}ParserService } from './${s.name}ParserService';`).join('\n');
const entries = registry.services
	.map((s) => `\t\t[ServiceType.${s.name}]: ${s.parser ? `new ${s.name}ParserService()` : 'new BaseParserService()'}`)
	.join(',\n');
write('src/parsers/HtmlParserService.ts', render(loadTemplate('htmlParser.hbs'), { imports, entries }));

// Generate PipelineService
const pipelineServices = registry.services.filter((s) => s.pipeline);
const pImports = pipelineServices.map((s) => `import { ${s.name}Pipeline } from './${s.name}Pipeline';`).join('\n');
const pEntries = registry.services
	.map((s) => `\t\t[ServiceType.${s.name}, ${s.pipeline ? `${s.name}Pipeline` : 'BasePipeline'}]`)
	.join(',\n');
write('src/pipelines/PipelineService.ts', render(loadTemplate('pipelineService.hbs'), { imports: pImports, entries: pEntries }));

// Generate TransformerService
const transformerServices = registry.services.filter((s) => s.transformer);
const tImports = transformerServices.map((s) => `import { ${s.name}Transformer } from './${s.name}Transformer';`).join('\n');
const tEntries = registry.services
	.map((s) => `\t\t[ServiceType.${s.name}]: ${s.transformer ? `${s.name}Transformer` : 'BaseTransformer'}`)
	.join(',\n');
write('src/transformers/Transformer.ts', render(loadTemplate('transformerService.hbs'), { imports: tImports, entries: tEntries }));

console.log('\nCodegen finished. Next steps:');
console.log('- If your editor shows ESLint/TS errors, reload the window.');
console.log("- Run 'pnpm run make:index' then 'pnpm run format' to update barrels and format.");
