import {
	CoordinatorDependencies,
	DirectoryOutputOptions,
	ExecutionArgs,
	ExecutionOptions,
	HttpFetchOptions,
	JobProgressEvent,
	ProviderConfig,
	TranscodeOptions
} from '@contracts';
import { createDefaultDependencies } from '@core/dependency';
import { InvalidRangeException, InvalidUrlException } from '@core/exceptions';
import {
	AllowedExtension,
	ExecutionShape,
	ExecutionType,
	ExtractionTarget,
	InferExecutionShape,
	OutputType,
	ProviderType,
	Range
} from '@types';

/**
 * Base provider API.
 * Shared fluent configuration and execution helpers.
 */
export abstract class BaseProvider<TExec extends ExecutionArgs<ExecutionShape>> {
	protected executionOptions: ExecutionOptions = {};
	protected httpOptions: HttpFetchOptions = {};
	protected readonly deps: CoordinatorDependencies;
	protected readonly provider: ProviderType;
	protected readonly urlPattern: RegExp;

	constructor(
		public readonly url: string,
		config: ProviderConfig
	) {
		this.provider = config.provider;
		this.urlPattern = config.urlPattern;

		this.validate();

		this.deps = createDefaultDependencies();
		this.executionOptions = {
			outputType: OutputType.JSON,
			executionType: ExecutionType.SEQUENTIAL
		};
		this.httpOptions = { referer: url };
	}

	protected get ORIGIN() {
		return new URL(this.url).origin;
	}

	protected get HOST_NAME() {
		return new URL(this.url).hostname;
	}

	private validate(): void {
		try {
			new URL(this.url);
		} catch {
			throw new InvalidUrlException(this.url, this.provider);
		}

		if (!this.urlPattern.test(this.HOST_NAME)) {
			throw new InvalidUrlException(this.url, this.provider);
		}
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
	 * Transform output to provider-specific result type.
	 * @param transform Default is true, which applies the default transformation. Set to false to return raw extracted data.
	 */
	public setTransformOutput(transform: boolean = true): this {
		this.executionOptions.transformOutput = transform;
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
	 * Sets no download flag.
	 * @param noDownload No download flag
	 * @defaultValue false - set to true to skip the download phase and only perform extraction (useful for debugging or when you only need metadata)
	 */
	public setNoDownload(noDownload: boolean = false): this {
		this.executionOptions.noDownload = noDownload;
		return this;
	}

	/**
	 * Sets transcode options.
	 * @param opts Transcode configuration
	 * @notes Sometimes due to nature of the OS, the video might not play after download.
	 * In such cases, you can set transcodeOptions to re-encode the video using ffmpeg which should resolve most compatibility issues.
	 */
	public setTranscodeOptions(opts: TranscodeOptions): this {
		this.executionOptions.transcodeOptions = { ...this.executionOptions.transcodeOptions, ...opts };
		return this;
	}

	/**
	 * Sets ExecutionCoordinator options.
	 * @param opts Job options to merge
	 */
	public setJobOptions(opts: ExecutionOptions): this {
		this.executionOptions = { ...this.executionOptions, ...opts };
		return this;
	}

	/**
	 * Sets maximum downloads.
	 * @param maxDownloads Download limit
	 */
	public setMaxDownloads(maxDownloads: number): this {
		this.executionOptions.maxDownloads = maxDownloads;
		return this;
	}

	/**
	 * Sets allowed file extensions.
	 * @param extensions File extensions such as `jpg` or `png`
	 */
	public setAllowedExtensions(...extensions: AllowedExtension[]): this {
		this.executionOptions.allowedExtensions = extensions.map((ext) => ext.toLowerCase()) as AllowedExtension[];
		return this;
	}

	/**
	 * Sets progress handler.
	 * @param handler Progress event callback
	 */
	public onProgress(handler: (event: JobProgressEvent) => void): this {
		this.executionOptions.onProgress = handler;
		return this;
	}

	/**
	 * Enables console progress logging.
	 * @param enabled Console logging flag
	 * @defaultValue true
	 */
	public setProgressLogging(enabled = true): this {
		this.executionOptions.logProgress = enabled;
		return this;
	}

	/**
	 * Sets output type.
	 * @param type Job output mode
	 * @param config Directory output configuration
	 * @defaultValue OutputType.JSON
	 */
	public setOutput(type: OutputType, config: DirectoryOutputOptions = {}): this {
		this.executionOptions.outputType = type;
		this.executionOptions.dirConfig = config;
		return this;
	}

	/**
	 * Sets execution strategy.
	 * @param type Execution mode
	 * @defaultValue ExecutionType.SEQUENTIAL
	 */
	public setExecutionType(type: ExecutionType): this {
		this.executionOptions.executionType = type;
		return this;
	}

	protected buildRequest(overrides?: Partial<TExec>): TExec {
		return {
			provider: overrides?.provider as ProviderType,
			method: overrides?.method as string,
			targets: overrides?.targets as string[],
			entryUrl: this.url,
			extractionTarget: ExtractionTarget.ANCHORS,
			executionType: ExecutionType.SEQUENTIAL,
			...this.executionOptions,
			...overrides
		} as TExec;
	}

	protected async execute<TResult>(overrides?: Partial<TExec & { executionShape: InferExecutionShape<TResult> }>): Promise<TResult> {
		type TItem = TResult extends Array<infer U> ? U : TResult;

		type TShape = InferExecutionShape<TResult>;

		type TRequest = TExec & { executionShape: TShape };

		const request = this.buildRequest(overrides) as TRequest;

		// without this the ProgressManager will not emit events
		this.deps.progressManager.init(request);

		const result = await this.deps.executionCoordinator.execute<TItem, TShape, TRequest>(request);

		return result.extracted as TResult;
	}

	protected makeTargets(sourceUrl: string, range: Range, provider: ProviderType, method: string, addTrailingSlash: boolean = true) {
		const isIndexRange = 'start' in range;

		if (isIndexRange) {
			const { start, end } = range;
			if (start < 0 || end < 0 || start > end) throw new InvalidRangeException(start, end, provider, method);
			return {
				targets: Array.from({ length: end + 1 - start }, (_, i) => `${sourceUrl}${start + i}${addTrailingSlash ? '/' : ''}`),
				provider,
				method
			};
		} else {
			const { page, limit } = range;
			if (page < 1 || limit < 1) throw new InvalidRangeException(page, page + limit, provider, method);
			return {
				targets: Array.from({ length: limit }, (_, i) => `${sourceUrl}${page + i}${addTrailingSlash ? '/' : ''}`),
				provider,
				method
			};
		}
	}
}
