import { ProviderMetadata, TagFilterOptions } from '@base';
import {
	AllowedExtension,
	ExecutionShape,
	ExecutionType,
	ExtractionTarget,
	OutputType,
	ProviderType,
	ShapeOutput,
	VideoCodec,
	VideoFormat,
	VideoQuality
} from '@types';
import { Dispatcher } from 'undici';
import { HttpFetchOptions, VideoSourceOutput } from './DownloadContracts';
import { PipelineHook, PipelineItem } from './PipelineContracts';
import { JobProgressEvent } from './ProgressContracts';
import { DirectoryOutputOptions, TranscodeOptions } from './StorageContracts';

export interface ExecutionArgs<S extends ExecutionShape = ExecutionShape> extends ExecutionOptions {
	provider: ProviderType;
	method: string;
	entryUrl: string;
	targets: string[];
	/**
	 * Internal runtime metadata describing
	 * the structural shape of extracted output.
	 *
	 * single   -> TResult
	 * multiple -> TResult[]
	 */
	executionShape: S;

	executionType: ExecutionType;
	extractionTarget: ExtractionTarget;

	/** Provider capabilities and restrictions */
	providerMetadata?: ProviderMetadata;
}

/**
 * Configuration options for a DownFlux ExecutionCoordinator.
 * Combines fetch, extraction, pipeline, and output settings.
 */
export interface ExecutionOptions extends HttpFetchOptions {
	/** Directory output configuration */
	dirConfig?: DirectoryOutputOptions;

	/** Allowed file extensions */
	allowedExtensions?: AllowedExtension[];

	/** Allowed video quality */
	allowedVideoQuality?: VideoQuality;

	/** Preferred video format (e.g. hls, mp4) */
	preferredVideoFormat?: VideoFormat;

	/** Preferred video codec (e.g. h264, av1) */
	preferredVideoCodec?: VideoCodec;

	/** Tag filtering options */
	tagFilterOptions?: TagFilterOptions;

	/** Maximum number of items to download */
	maxDownloads?: number;

	/** Transform output to service-specific result type */
	transformOutput?: boolean;

	/** Download phase concurrency */
	concurrency?: number;

	/** Iterate only-- this prop is only used for logging http-services */
	noDownload?: boolean;

	/** Extraction phase concurrency */
	extractConcurrency?: number;

	/** Transcoding options */
	transcodeOptions?: TranscodeOptions;

	/** Download retry count */
	downloadRetries?: number;

	/** Delay between download retries in milliseconds */
	retryDelayMs?: number;

	/** PipelineRegistry lifecycle hooks */
	pipelineHooks?: PipelineHook[];

	/** Progress event handler */
	onProgress?: (event: JobProgressEvent) => void;

	/** Enables console progress logging */
	logProgress?: boolean;

	/** Output format for ExecutionCoordinator results */
	outputType?: OutputType;

	/** Job execution strategy */
	executionType?: ExecutionType;

	/** Abort signal for cancelling the ExecutionCoordinator */
	signal?: AbortSignal;
}

export interface HttpAgentOptions {
	userAgent?: string;

	enableSniSpoofing?: boolean;

	proxy?: ProxyOptions;

	dispatcher?: Dispatcher;
}

export interface ProxyOptions {
	type: 'http' | 'https' | 'socks4' | 'socks5';

	host: string;

	port: number;

	username?: string;

	password?: string;
}

export interface ExecutionResult<TResult, S extends ExecutionShape> extends ExecutionArgs {
	extracted: ShapeOutput<TResult, S>;
	downloaded: number;
	failed: number;
	errors: Error[];
	pipelineItems: PipelineItem[];
}

/**
 * Default output structure for extractor operations.
 * Represents normalized metadata and extracted resources.
 */
export interface DefaultExecutionResult<TCustomFields = unknown> {
	/** Page title */
	title: string;

	/** Page description */
	description: string;

	/** SEO keywords */
	keywords: string[];

	/** HTTP status code */
	status: number;

	/** Final resolved URL */
	sourceUrl: string;

	/** Anchor links */
	anchors: string[];

	/** Image URLs */
	images: string[];

	/** Media source URLs */
	sources: string[];

	/** Video URLs */
	videos: string[];

	/** Hyper links */
	links: string[];

	/** Video poster URLs */
	videoPosters?: string[];

	/** URLs extracted from div href attributes */
	divHREFs?: string[];

	/** All discovered URLs */
	allUrls?: string[];

	/** URL category for pipeline routing */
	extractionTarget?: ExtractionTarget;

	/** Extensible service-specific fields */
	customFields?: TCustomFields;
}

export interface DefaultMetadata {
	title: string;
	tags: string[];
	description: string;
	pageUrl: string;
}

export interface VideosFormat {
	mp4?: VideoSourceOutput[];
	hls?: VideoSourceOutput[];
}

export interface DefaultVideoOutput extends DefaultMetadata {
	poster: string;
	videos: VideosFormat;
}

export type TagKeys =
	| '#'
	| 'A'
	| 'B'
	| 'C'
	| 'D'
	| 'E'
	| 'F'
	| 'G'
	| 'H'
	| 'I'
	| 'J'
	| 'K'
	| 'L'
	| 'M'
	| 'N'
	| 'O'
	| 'P'
	| 'Q'
	| 'R'
	| 'S'
	| 'T'
	| 'U'
	| 'V'
	| 'W'
	| 'X'
	| 'Y'
	| 'Z';
