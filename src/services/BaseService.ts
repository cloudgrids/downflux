import { InvalidRangeException } from '../exceptions';
import {
	AllowedExtension,
	DirectoryOutputOptions,
	ExecutionArgs,
	ExecutionType,
	HttpFetchOptions,
	JobOptions,
	JobProgressEvent,
	OutputType,
	Range,
	ServiceDependencies,
	ServiceType,
	UrlType
} from '../util';
import { createDefaultDependencies } from './dependency';

export abstract class BaseService<TExec extends ExecutionArgs> {
	protected jobOptions: JobOptions = {};
	protected httpOptions: HttpFetchOptions = {};
	protected readonly deps: ServiceDependencies;
	protected abstract validateUrl(url: string): void;

	constructor(public readonly url: string) {
		this.deps = createDefaultDependencies();
		this.jobOptions = {
			outputType: OutputType.JSON,
			executionType: ExecutionType.SEQUENTIAL
		};
		this.httpOptions = { referer: url };
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
	public setAllowedExtensions(...extensions: AllowedExtension[]): this {
		this.jobOptions.allowedExtensions = extensions.map((ext) => ext.toLowerCase()) as AllowedExtension[];
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

	public setOutput(type: OutputType, config: DirectoryOutputOptions = {}): this {
		this.jobOptions.outputType = type;
		this.jobOptions.dirConfig = config;
		return this;
	}

	public setExecutionType(type: ExecutionType): this {
		this.jobOptions.executionType = type;
		return this;
	}

	protected buildRequest(overrides?: Partial<TExec>): TExec {
		return {
			service: overrides?.service as ServiceType,
			method: overrides?.method as string,
			targets: overrides?.targets as string[],
			entryUrl: this.url,
			urlType: UrlType.ANCHORS,
			executionType: ExecutionType.SEQUENTIAL,
			...this.jobOptions,
			...overrides
		} as TExec;
	}

	protected async execute<TRes>(overrides?: Partial<TExec>): Promise<TRes[]> {
		const result = await this.deps.jobService.execute<TRes, TExec>(this.buildRequest(overrides));

		return result.extracted;
	}

	protected makeTargets(baseUrl: string, range: Range, service: ServiceType, method: string, addTrailingSlash: boolean = true) {
		const isIndexRange = 'start' in range;

		if (isIndexRange) {
			const { start, end } = range;
			if (start < 0 || end < 0 || start > end) throw new InvalidRangeException(start, end, service, method);
			return {
				targets: Array.from({ length: end + 1 - start }, (_, i) => `${baseUrl}${start + i}${addTrailingSlash ? '/' : ''}`),
				service,
				method
			};
		} else {
			const { page, limit } = range;
			if (page < 1 || limit < 1) throw new InvalidRangeException(page, page + limit, service, method);
			return {
				targets: Array.from({ length: limit }, (_, i) => `${baseUrl}${page + i}${addTrailingSlash ? '/' : ''}`),
				service,
				method
			};
		}
	}
}
