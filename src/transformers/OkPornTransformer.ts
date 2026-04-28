import { OkPornMethods, UrlType } from '../enums';
import { OkPornChannelOutput, OkPornModelOutput, OkPornTagOutput } from '../services';
import { OkPornAlbumOutput } from '../services/okporn/output/OkPornAlbumOutput';
import { OkPornVideoOutput } from '../services/okporn/output/OkPornVideoOutput';
import { DefaultExtractorResult, ExecutionArguments } from '../types';
import { BaseTransformer } from './BaseTransformer';

export class OkPornTransformer extends BaseTransformer<
	OkPornAlbumOutput | OkPornVideoOutput | OkPornModelOutput | OkPornTagOutput | OkPornChannelOutput | DefaultExtractorResult
> {
	private readonly ALBUMS_URL = 'https://ok.porn/albums/';

	public override async transform(
		url: string,
		request?: ExecutionArguments
	): Promise<OkPornAlbumOutput | OkPornVideoOutput | OkPornModelOutput | OkPornTagOutput | OkPornChannelOutput | DefaultExtractorResult> {
		const metadata = (await super.transform(url, request)) as DefaultExtractorResult;

		switch (request?.method) {
			case OkPornMethods.getAlbum:
			case OkPornMethods.getAlbums:
				return this.toAlbumOutput(metadata);

			case OkPornMethods.getVideo:
			case OkPornMethods.getVideos: {
				const album = await this.getVideoAlbum(metadata, request);
				return this.toVideoOutput(metadata, album);
			}

			case OkPornMethods.getModels:
				return this.toModelOutput(metadata);

			case OkPornMethods.getTags:
				return this.toTagOutput(metadata);

			case OkPornMethods.getChannels:
				return this.toChannelOutput(metadata);
			default:
				return metadata;
		}
	}

	private async getVideoAlbum(metadata: DefaultExtractorResult, request?: ExecutionArguments): Promise<OkPornAlbumOutput | undefined> {
		const videoAlbumId = metadata.customFields?.videoAlbumId;

		if (!videoAlbumId) return undefined;

		const albumMetadata = (await super.transform(`${this.ALBUMS_URL}${videoAlbumId}/`, {
			...request,
			method: OkPornMethods.getAlbum,
			urlType: UrlType.IMAGES
		} as ExecutionArguments)) as DefaultExtractorResult;

		return this.toAlbumOutput(albumMetadata);
	}

	private toAlbumOutput(metadata: DefaultExtractorResult): OkPornAlbumOutput {
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

	private toVideoOutput(metadata: DefaultExtractorResult, videoAlbum?: OkPornAlbumOutput): OkPornVideoOutput {
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

	private toModelOutput(metadata: DefaultExtractorResult): OkPornModelOutput {
		return {
			modelName: metadata.title,
			modelUrl: metadata.baseUrl,
			modelThumbnail: metadata.images[0]
		};
	}

	private toTagOutput(metadata: DefaultExtractorResult): OkPornTagOutput {
		return {
			tagName: metadata.title,
			tagUrl: metadata.baseUrl
		};
	}

	private toChannelOutput(metadata: DefaultExtractorResult): OkPornChannelOutput {
		return {
			channelName: metadata.title,
			channelUrl: metadata.baseUrl,
			channelThumbnail: metadata.images[0]
		};
	}
}
