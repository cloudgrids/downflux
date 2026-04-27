import { DownloaderService } from '../downloaders/DownloaderService';
import { OutputType, UrlType } from '../enums';
import { ExtractorService } from '../extractors/ExtractorService';
import { FileService } from '../file/FileService';
import { filterUrlsByExtension } from '../helpers/FilterUrls';
import { DownloadResult, ExtractorResult, PipelineHook, PipelineIdentifiers, PipelineItem, PipelineResourceType } from '../types';
import { ExecutionArguments } from '../types/ExecutionArguments';
import { ExecutionResult } from '../types/ExecutionResult';
import { JobOptions } from '../types/JobOptions';

export class JobService {
	constructor(
		private readonly extractorService: ExtractorService,
		private readonly downloaderService: DownloaderService,
		private readonly fileService: FileService
	) {}

	public async execute<TExtractedMetadata = unknown, TDownloadMetadata = unknown>(
		request: ExecutionArguments
	): Promise<ExecutionResult<TExtractedMetadata, TDownloadMetadata>> {
		const { outputType = OutputType.JSON, targets, urlType, service, ...options } = request;

		const extractor = this.extractorService.getExtractor(service);
		const pipelineHooks = (options.pipelineHooks ?? []) as PipelineHook<TExtractedMetadata, TDownloadMetadata>[];

		const downloads: DownloadResult<TDownloadMetadata>[] = [];
		const errors: Error[] = [];
		const extracted: ExtractorResult<TExtractedMetadata>[] = [];
		let pipeline: PipelineItem<TExtractedMetadata, TDownloadMetadata>[] = [];

		for (const url of targets) {
			if (options?.signal?.aborted) break;

			try {
				const metadata = await extractor.extractFromUrl<TExtractedMetadata>(url, request);
				extracted.push(metadata);

				const selected = extractor.selectUrlsByQuality(metadata, urlType ?? metadata.urlType ?? UrlType.IMAGES);

				for (const selectedUrl of selected) {
					const item: PipelineItem<TExtractedMetadata, TDownloadMetadata> = {
						sourceUrl: url,
						extracted: metadata,
						selectedUrl,
						resourceType: this.detectResourceType(selectedUrl),
						identifiers: this.extractIdentifiers(metadata)
					};

					await this.runExtractHooks(item, pipelineHooks);
					pipeline.push(item);
				}
			} catch (err) {
				errors.push(err instanceof Error ? err : new Error(String(err)));
			}
		}

		pipeline = this.applyFilters(pipeline, options);
		const targetUrls = pipeline.map((item) => item.selectedUrl).filter((url): url is string => Boolean(url));

		const result: ExecutionResult<TExtractedMetadata, TDownloadMetadata> = {
			service: request.service,
			method: request.method,
			entryUrl: request.entryUrl,
			targets: request.targets,
			executionType: request.executionType,
			urlType: request.urlType,
			outputType,
			pipeline,
			extracted,
			targetUrls,
			downloads,
			downloaded: 0,
			failed: 0,
			errors
		};

		switch (outputType) {
			case OutputType.JSON: {
				result.jsonPath = this.fileService.saveJson(result, options?.dirConfig?.path as string);
				return result;
			}

			case OutputType.BUFFER:
			case OutputType.DEVICE: {
				const target = outputType;
				const downloader = this.downloaderService.getDownloader(service);

				for (const item of pipeline) {
					if (options?.signal?.aborted) break;

					try {
						const downloadedItem = await downloader.downloadFile<TExtractedMetadata, TDownloadMetadata>(item, {
							...options,
							outputType: target,
							service
						});

						await this.runDownloadHooks(downloadedItem, pipelineHooks);

						if (downloadedItem.download) {
							downloads.push(downloadedItem.download);
						}
					} catch (err) {
						errors.push(err instanceof Error ? err : new Error(String(err)));
					}
				}

				break;
			}

			case OutputType.RETURN:
				return result;

			default:
				throw new Error('Invalid output type');
		}

		result.downloaded = downloads.length;
		result.failed = errors.length;

		return result;
	}

	private applyFilters<TExtractedMetadata, TDownloadMetadata>(
		items: PipelineItem<TExtractedMetadata, TDownloadMetadata>[],
		options: JobOptions
	): PipelineItem<TExtractedMetadata, TDownloadMetadata>[] {
		let result = items;

		if (options?.allowedExtensions?.length) {
			const allowedUrls = new Set(filterUrlsByExtension(this.getSelectedUrls(result), options.allowedExtensions));
			result = result.filter((item) => item.selectedUrl && allowedUrls.has(item.selectedUrl));
		}

		result = this.dedupeBySelectedUrl(result);

		if (typeof options?.maxDownloads === 'number') {
			result = result.slice(0, options.maxDownloads);
		}

		return result;
	}

	private getSelectedUrls<TExtractedMetadata, TDownloadMetadata>(items: PipelineItem<TExtractedMetadata, TDownloadMetadata>[]): string[] {
		return items.map((item) => item.selectedUrl).filter((url): url is string => Boolean(url));
	}

	private dedupeBySelectedUrl<TExtractedMetadata, TDownloadMetadata>(
		items: PipelineItem<TExtractedMetadata, TDownloadMetadata>[]
	): PipelineItem<TExtractedMetadata, TDownloadMetadata>[] {
		const seen = new Set<string>();

		return items.filter((item) => {
			if (!item.selectedUrl) return false;
			if (seen.has(item.selectedUrl)) return false;

			seen.add(item.selectedUrl);
			return true;
		});
	}

	private detectResourceType(url: string): PipelineResourceType {
		const pathname = url.split('?')[0].toLowerCase();

		if (/\.(mp4|m3u8|webm|mov|mkv)$/.test(pathname)) return 'video';
		if (/\.(mp3|wav|aac|flac|ogg)$/.test(pathname)) return 'audio';

		return 'image';
	}

	private extractIdentifiers<TExtractedMetadata>(metadata: ExtractorResult<TExtractedMetadata>): PipelineIdentifiers {
		const customFields = metadata.customFields ?? {};
		const extra = (metadata.extra ?? {}) as Record<string, any>;

		return {
			albumId: customFields.albumId ?? extra.albumId ?? customFields.videoAlbumId ?? extra.videoAlbumId,
			videoId: customFields.videoId ?? extra.videoId,
			username: customFields.modelName ?? customFields.starredBy?.[0] ?? extra.modelName
		};
	}

	private async runExtractHooks<TExtractedMetadata, TDownloadMetadata>(
		item: PipelineItem<TExtractedMetadata, TDownloadMetadata>,
		hooks: PipelineHook<TExtractedMetadata, TDownloadMetadata>[]
	): Promise<void> {
		for (const hook of hooks) {
			await hook.onExtract?.(item);
		}
	}

	private async runDownloadHooks<TExtractedMetadata, TDownloadMetadata>(
		item: PipelineItem<TExtractedMetadata, TDownloadMetadata>,
		hooks: PipelineHook<TExtractedMetadata, TDownloadMetadata>[]
	): Promise<void> {
		for (const hook of hooks) {
			await hook.onDownload?.(item);
		}
	}
}
