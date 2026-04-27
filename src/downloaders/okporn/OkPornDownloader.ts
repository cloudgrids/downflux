import { PipelineItem } from '../../types';
import { BaseDownloader } from '../BaseDownloader';
import { DownloadOptions } from '../DownloaderService';
import { OkPornDownloadOutput } from './output/OkPornDownloadOutput';

export class OkPornDownloader extends BaseDownloader {
	public override async downloadFile<TExtractedMetadata = unknown, TDownloadMetadata = OkPornDownloadOutput>(
		item: PipelineItem<TExtractedMetadata, TDownloadMetadata>,
		opts: DownloadOptions
	): Promise<PipelineItem<TExtractedMetadata, TDownloadMetadata>> {
		const downloaded = await super.downloadFile<TExtractedMetadata, TDownloadMetadata>(item, opts);

		if (downloaded.download) {
			const metadata = {
				modelName: downloaded.identifiers?.username,
				albumId: downloaded.identifiers?.albumId,
				videoId: downloaded.identifiers?.videoId,
				sourcePageUrl: downloaded.sourceUrl
			} as TDownloadMetadata;

			downloaded.download.metadata = metadata;
			downloaded.download.extra = metadata;
		}

		return downloaded;
	}
}
