import { ExecutionType } from '../enums/ExecutionType';
import { createDefaultDependencies, ImporterDependencies } from '../inject-dependency';
import { OutputType } from '../types';
import { ImportChainStep } from '../types/ImportChainStep';
import { ImportExecutionOptions } from '../types/ImportExecutionOptions';

export class BaseProvider {
	protected options: ImportExecutionOptions = {};
	protected chain: ImportChainStep[] = [];
	protected readonly deps: ImporterDependencies;

	constructor(public readonly url: string) {
		this.deps = createDefaultDependencies();
		this.options = {
			outputType: OutputType.JSON,
			executionType: ExecutionType.SEQUENTIAL,
			json: { path: 'importer_json_output', prefix: 'imported_' },
			device: { path: 'importer_device_output', prefix: 'imported_' }
		};
	}

	public addOptions(opts: ImportExecutionOptions): this {
		this.options = { ...this.options, ...opts };
		return this;
	}

	public setOutput(type: OutputType): this {
		this.options.outputType = type;
		return this;
	}

	public setExecutionType(type: ExecutionType): this {
		this.options.executionType = type;
		return this;
	}
}
