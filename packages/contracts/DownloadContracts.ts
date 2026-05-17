import { OutputType, ProviderType, VideoQuality } from '@types';
import { Writable } from 'stream';
import { HttpAgentOptions } from './ExecutionContracts';
import { PipelineItem } from './PipelineContracts';
import { DirectoryOutputOptions, TranscodeOptions } from './StorageContracts';

export interface DownloadOptions extends HttpFetchOptions {
	dirConfig?: DirectoryOutputOptions;
	transcodeOptions?: TranscodeOptions;
	outputType: OutputType;
	provider: ProviderType;
	reExtract?: (item: PipelineItem) => Promise<PipelineItem | null>;
	pipelineItem?: PipelineItem;
	noDownload?: boolean;
	allowedVideoQuality?: VideoQuality;
}

/**
 * Result of a download operation.
 * Contains file metadata and the downloaded buffer.
 */
export interface DownloadResult {
	/** Requested download URL */
	url: string;

	/** Downloaded file buffer */
	buffer: Buffer;

	/** Final URL after redirects */
	finalUrl: string;

	/** Generated filename with metadata */
	extendedFilename: string;

	/** Original filename from URL or response */
	originalFilename: string;

	/** File extension */
	extension: string;

	/** MIME type */
	mimeType: string;

	/** File size in bytes */
	sizeBytes: number;

	/** Path of the downloaded file */
	path: string;

	/** Service used for the download */
	provider: ProviderType;
}

export interface FetchResult {
	html: string;
	buffer: Buffer;
	finalUrl: string;
	status: number;
	ok: boolean;
	headers: Record<string, string>;
}

export interface HLSStreamRequest {
	finalUrl: string;
	headers: Record<string, string>;
	isFmp4?: boolean;
	start: (stream: Writable, noDownload?: boolean) => Promise<void>;
}

/**
 * HTTP fetch options.
 * Controls request headers, retries, timeout, and referer.
 */
export interface HttpFetchOptions extends HttpAgentOptions {
	/** Custom request headers */
	headers?: Record<string, string>;

	/** Request timeout in milliseconds */
	timeoutMs?: number;

	/** Failed request retry count */
	retries?: number;

	/** Request referer URL */
	referer?: string;

	/** Optional FormData for POST requests */
	formData?: Record<string, string>;
}

export interface M3U8Variant {
	url: string;
	width: number;
	height: number;
	bw: number;
}

export interface ServiceStrategy {
	shouldFallback404?(url: string): boolean;
	getFallbackUrl?(url: string): string | null;
	shouldReExtract?(url: string): boolean;
	shouldResolveTextResponse?(url: string, contentType: string): boolean;
	getDirectVideoUrlFromText?(body: string, opts: DownloadOptions): string | null;
	getHostFallbackUrls?(url: string): string[];
}

export interface VideoSourceOutput {
	quality: VideoQuality;
	url: string;
}
