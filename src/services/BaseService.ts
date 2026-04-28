import { OutputType, ServiceType, UrlType } from '../enums';
import { ExecutionType } from '../enums/ExecutionType';
import { createDefaultDependencies, ImporterDependencies } from '../inject-dependency';
import { HttpFetchOptions } from '../types';
import { ExecutionArguments } from '../types/ExecutionArguments';
import { JobOptions } from '../types/JobOptions';
import { JobProgressEvent } from '../types/JobProgress';

export abstract class BaseService {
	protected jobOptions: JobOptions = {};
	protected httpOptions: HttpFetchOptions = {};
	protected readonly deps: ImporterDependencies;
	protected abstract validateUrl(url: string): void;

	constructor(public readonly url: string) {
		this.deps = createDefaultDependencies();
		this.jobOptions = {
			outputType: OutputType.JSON,
			executionType: ExecutionType.SEQUENTIAL
		};
	}

	public setHeaders(headers: Record<string, string>): this {
		this.httpOptions.headers = headers;
		return this;
	}

	public setTimeout(timeoutMs: number): this {
		this.httpOptions.timeoutMs = timeoutMs;
		return this;
	}

	public setRetries(retries: number): this {
		this.httpOptions.retries = retries;
		return this;
	}

	public setHttpOptions(opts: HttpFetchOptions): this {
		this.httpOptions = { ...this.httpOptions, ...opts };
		return this;
	}

	public setJobOptions(opts: JobOptions): this {
		this.jobOptions = { ...this.jobOptions, ...opts };
		return this;
	}

	public setMaxDownloads(maxDownloads: number): this {
		this.jobOptions.maxDownloads = maxDownloads;
		return this;
	}

	/** Sets the allowed file extensions for the job. eg ['jpg', 'png'] */
	public setAllowedExtensions(...extensions: string[]): this {
		this.jobOptions.allowedExtensions = extensions.map((ext) => ext.toLowerCase());
		return this;
	}

	public onProgress(handler: (event: JobProgressEvent) => void): this {
		this.jobOptions.onProgress = handler;
		return this;
	}

	public setProgressLogging(enabled = true): this {
		this.jobOptions.logProgress = enabled;
		return this;
	}

	public setOutput(type: OutputType, path?: string, prefix?: string): this {
		this.jobOptions.outputType = type;

		if (type === OutputType.DEVICE && path) this.jobOptions.dirConfig = { path, prefix };
		else if (type === OutputType.JSON && path) this.jobOptions.dirConfig = { path, prefix };

		return this;
	}

	public setExecutionType(type: ExecutionType): this {
		this.jobOptions.executionType = type;
		return this;
	}

	protected buildRequest(overrides?: Partial<ExecutionArguments>): ExecutionArguments {
		return {
			service: overrides?.service as ServiceType,
			method: overrides?.method as string,
			targets: overrides?.targets as string[],
			entryUrl: this.url,
			urlType: UrlType.ANCHORS,
			executionType: ExecutionType.SEQUENTIAL,
			...this.jobOptions,
			...overrides
		};
	}

	protected async execute<T>(overrides?: Partial<ExecutionArguments>): Promise<T[]> {
		const result = await this.deps.jobService.execute<T>(this.buildRequest(overrides));

		return result.extracted;
	}
}
