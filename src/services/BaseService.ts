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

/**
 * Base service API.
 * Shared fluent configuration and execution helpers.
 */
export abstract class BaseService<TExec extends ExecutionArgs> {
	protected jobOptions: JobOptions = {};
	protected httpOptions: HttpFetchOptions = {};
	protected readonly deps: ServiceDependencies;
	protected abstract validateUrl(url: string): void;

	/**
	 * Creates a service instance.
	 * @param url Source URL
	 */
	constructor(public readonly url: string) {
		this.deps = createDefaultDependencies();
		this.jobOptions = {
			outputType: OutputType.JSON,
			executionType: ExecutionType.SEQUENTIAL
		};
		this.httpOptions = { referer: url };
	}

	/**
	 * Sets custom HTTP headers.
	 * @param headers Request header map
	 */
	public setHeaders(headers: Record<string, string>): this {
		this.httpOptions.headers = headers;
		return this;
	}

	/**
	 * Sets HTTP timeout.
	 * @param timeoutMs Timeout in milliseconds
	 */
	public setTimeout(timeoutMs: number): this {
		this.httpOptions.timeoutMs = timeoutMs;
		return this;
	}

	/**
	 * Sets fetch retry count.
	 * @param retries Retry attempt count
	 */
	public setRetries(retries: number): this {
		this.httpOptions.retries = retries;
		return this;
	}

	/**
	 * Transform output to service-specific result type.
	 * @param transform Default is true, which applies the default transformation. Set to false to return raw extracted data.
	 */
	public setTransformOutput(transform: boolean = true): this {
		this.jobOptions.transformOutput = transform;
		return this;
	}

	/**
	 * Sets HTTP fetch options.
	 * @param opts HTTP options to merge
	 */
	public setHttpOptions(opts: HttpFetchOptions): this {
		this.httpOptions = { ...this.httpOptions, ...opts };
		return this;
	}

	/**
	 * Sets job options.
	 * @param opts Job options to merge
	 */
	public setJobOptions(opts: JobOptions): this {
		this.jobOptions = { ...this.jobOptions, ...opts };
		return this;
	}

	/**
	 * Sets maximum downloads.
	 * @param maxDownloads Download limit
	 */
	public setMaxDownloads(maxDownloads: number): this {
		this.jobOptions.maxDownloads = maxDownloads;
		return this;
	}

	/**
	 * Sets allowed file extensions.
	 * @param extensions File extensions such as `jpg` or `png`
	 */
	public setAllowedExtensions(...extensions: AllowedExtension[]): this {
		this.jobOptions.allowedExtensions = extensions.map((ext) => ext.toLowerCase()) as AllowedExtension[];
		return this;
	}

	/**
	 * Sets progress handler.
	 * @param handler Progress event callback
	 */
	public onProgress(handler: (event: JobProgressEvent) => void): this {
		this.jobOptions.onProgress = handler;
		return this;
	}

	/**
	 * Enables console progress logging.
	 * @param enabled Console logging flag
	 * @defaultValue true
	 */
	public setProgressLogging(enabled = true): this {
		this.jobOptions.logProgress = enabled;
		return this;
	}

	/**
	 * Sets output type.
	 * @param type Job output mode
	 * @param config Directory output configuration
	 * @defaultValue OutputType.JSON
	 */
	public setOutput(type: OutputType, config: DirectoryOutputOptions = {}): this {
		this.jobOptions.outputType = type;
		this.jobOptions.dirConfig = config;
		return this;
	}

	/**
	 * Sets execution strategy.
	 * @param type Execution mode
	 * @defaultValue ExecutionType.SEQUENTIAL
	 */
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

	protected makeTargets(sourceUrl: string, range: Range, service: ServiceType, method: string, addTrailingSlash: boolean = true) {
		const isIndexRange = 'start' in range;

		if (isIndexRange) {
			const { start, end } = range;
			if (start < 0 || end < 0 || start > end) throw new InvalidRangeException(start, end, service, method);
			return {
				targets: Array.from({ length: end + 1 - start }, (_, i) => `${sourceUrl}${start + i}${addTrailingSlash ? '/' : ''}`),
				service,
				method
			};
		} else {
			const { page, limit } = range;
			if (page < 1 || limit < 1) throw new InvalidRangeException(page, page + limit, service, method);
			return {
				targets: Array.from({ length: limit }, (_, i) => `${sourceUrl}${page + i}${addTrailingSlash ? '/' : ''}`),
				service,
				method
			};
		}
	}
}
