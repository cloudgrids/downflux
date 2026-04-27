import { OkPornMethods, UrlType } from '../enums';
import { OkPornAlbumOutput } from '../services/okporn/output/OkPornAlbumOutput';
import { OkPornVideoOutput } from '../services/okporn/output/OkPornVideoOutput';
import { ExecutionArguments, ExtractorResult } from '../types';
import { BaseExtractor } from './BaseExtractor';

export class OkPornExtractor extends BaseExtractor {
	private readonly ALBUMS_URL = 'https://ok.porn/albums/';

	public override async extractFromUrl<T>(url: string, request?: ExecutionArguments): Promise<ExtractorResult<T>> {
		const metadata = await super.extractFromUrl<T>(url, request);

		if (this.isAlbumMethod(request)) {
			return {
				...metadata,
				extra: this.toAlbumOutput(metadata) as T
			};
		}

		if (this.isVideoMethod(request)) {
			const album = await this.getVideoAlbum(metadata, request);

			return {
				...metadata,
				extra: this.toVideoOutput(metadata, album) as T
			};
		}

		return metadata;
	}

	private async getVideoAlbum(metadata: ExtractorResult, request?: ExecutionArguments): Promise<OkPornAlbumOutput | undefined> {
		const videoAlbumId = metadata.customFields?.videoAlbumId;

		if (!videoAlbumId) return undefined;

		const albumMetadata = await super.extractFromUrl<OkPornAlbumOutput>(`${this.ALBUMS_URL}${videoAlbumId}/`, {
			...request,
			method: OkPornMethods.getAlbum,
			urlType: UrlType.IMAGES
		} as ExecutionArguments);

		return this.toAlbumOutput(albumMetadata);
	}

	private isAlbumMethod(request?: ExecutionArguments): boolean {
		return [OkPornMethods.getAlbum, OkPornMethods.getAlbums].includes(request?.method as OkPornMethods);
	}

	private isVideoMethod(request?: ExecutionArguments): boolean {
		return [OkPornMethods.getVideo, OkPornMethods.getVideos].includes(request?.method as OkPornMethods);
	}

	private toAlbumOutput(metadata: ExtractorResult): OkPornAlbumOutput {
		return {
			albumTitle: metadata.title,
			albumUrl: metadata.baseUrl,
			albumKeywords: metadata.keywords,
			albumDescription: metadata.description,
			modelName: metadata.customFields?.modelName,
			albumId: metadata.baseUrl.split('/').filter(Boolean).pop() ?? '',
			albumImages: metadata.images,
			albumThumbnail: metadata.images[0],
			albumImageCount: metadata.images.length
		};
	}

	private toVideoOutput(metadata: ExtractorResult, videoAlbum?: OkPornAlbumOutput): OkPornVideoOutput {
		return {
			videoTitle: metadata.title,
			videoUrl: metadata.baseUrl,
			videoKeywords: metadata.keywords,
			videoDescription: metadata.description,
			videoId: metadata.baseUrl.split('/').filter(Boolean).pop() ?? '',
			videoSources: metadata.sources,
			videoPoster: metadata.customFields?.videoPoster,
			videoScreenshot: metadata.customFields?.videoPoster,
			modelName: metadata.customFields?.starredBy?.[0],
			videoAlbumId: metadata.customFields?.videoAlbumId,
			videoAlbum,
			videoCreateDate: metadata.customFields?.videoCreateDate
		};
	}
}
