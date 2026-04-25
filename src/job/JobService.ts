import { DownloaderService } from '../downloader/DownloaderService';
import { ExtractorService } from '../extractor/ExtractorService';
import { FileService } from '../file/FileService';
import { DownloadResult, ExtractorResult, ImportExecutionOptions, OutputType, UrlType } from '../types';
import { ImportExecutionRequest } from '../types/ImportExecutionRequest';
import { ImportExecutionResult } from '../types/ImportExecutionResult';

export class JobService {
	constructor(
		private readonly extractorService: ExtractorService,
		private readonly downloaderService: DownloaderService,
		private readonly fileService: FileService
	) {}

	public async execute(request: ImportExecutionRequest): Promise<ImportExecutionResult> {
		const { outputType, urls, urlType, callbacks, ...options } = request;

		const downloads: DownloadResult[] = [];
		const errors: Error[] = [];
		const metadataList: ExtractorResult[] = [];

		let finalUrls: string[] = [];

		for (const url of urls) {
			if (options?.signal?.aborted) break;

			try {
				const metadata = await this.extractorService.extractFromUrl(url);
				metadataList.push(metadata);

				const selected = this.extractorService.selectUrlsByQuality(metadata, urlType ?? metadata.urlType ?? UrlType.IMAGES);

				finalUrls.push(...selected);
			} catch (err) {
				errors.push(err instanceof Error ? err : new Error(String(err)));
			}
		}

		finalUrls = this.applyFilters(finalUrls, options);

		const result: ImportExecutionResult = {
			outputType,
			metadataList,
			urls: finalUrls,
			downloads,
			downloaded: 0,
			failed: 0,
			errors
		};

		switch (outputType) {
			case OutputType.JSON: {
				result.jsonPath = this.fileService.saveJson(result, options?.json?.path as string);
				return result;
			}

			case OutputType.BUFFER:
			case OutputType.DEVICE: {
				const target = outputType;

				if (target === OutputType.DEVICE && !options?.device?.path) {
					throw new Error('device.path is required');
				}

				for (const fileUrl of finalUrls) {
					if (options?.signal?.aborted) break;

					try {
						const download = await this.downloaderService.downloadFile(fileUrl, {
							...options,
							outputType: target
						});

						downloads.push(download);
					} catch (err) {
						errors.push(err instanceof Error ? err : new Error(String(err)));
					}
				}

				break;
			}

			case OutputType.LOG: {
				console.log(
					metadataList.map((m) => ({
						url: m.finalUrl,
						title: m.title,
						images: m.images.length
					}))
				);
				break;
			}

			default:
				throw new Error('Invalid output type');
		}

		result.downloaded = downloads.length;
		result.failed = errors.length;

		return result;
	}

	private applyFilters(urls: string[], options: ImportExecutionOptions): string[] {
		let result = urls;

		if (options?.allowedExtensions?.length) {
			result = this.downloaderService.filterUrlsByExtension(result, options.allowedExtensions);
		}

		if (typeof options?.maxDownloads === 'number') {
			result = result.slice(0, options.maxDownloads);
		}

		return result;
	}
}
