import { DownloaderService } from '../downloaders/DownloaderService';
import { OutputType, UrlType } from '../enums';
import { ExtractorService } from '../extractors/ExtractorService';
import { FileService } from '../file/FileService';
import { filterUrlsByExtension } from '../helpers/FilterUrls';
import { DownloadResult, ExtractorResult } from '../types';
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

		const downloads: DownloadResult<TDownloadMetadata>[] = [];
		const errors: Error[] = [];
		const extracted: ExtractorResult<TExtractedMetadata>[] = [];
		let targetUrls: string[] = [];

		// Generate metadata and select URLs based on quality
		for (const url of targets) {
			if (options?.signal?.aborted) break;

			try {
				const metadata = await extractor.extractFromUrl<TExtractedMetadata>(url, request);
				extracted.push(metadata);

				const selected = extractor.selectUrlsByQuality(metadata, urlType ?? metadata.urlType ?? UrlType.IMAGES);

				targetUrls.push(...selected);
			} catch (err) {
				errors.push(err instanceof Error ? err : new Error(String(err)));
			}
		}

		targetUrls = this.applyFilters(targetUrls, options);

		const result: ExecutionResult<TExtractedMetadata, TDownloadMetadata> = {
			service: request.service,
			method: request.method,
			entryUrl: request.entryUrl,
			targets: request.targets,
			executionType: request.executionType,
			urlType: request.urlType,
			outputType,
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

				for (const fileUrl of targetUrls) {
					if (options?.signal?.aborted) break;

					try {
						const download = await downloader.downloadFile<TDownloadMetadata>(fileUrl, {
							...options,
							outputType: target,
							service
						});

						downloads.push(download);
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

	private applyFilters(urls: string[], options: JobOptions): string[] {
		let result = urls;

		if (options?.allowedExtensions?.length) {
			result = filterUrlsByExtension(result, options.allowedExtensions);
		}

		if (typeof options?.maxDownloads === 'number') {
			result = result.slice(0, options.maxDownloads);
		}

		return result;
	}
}
