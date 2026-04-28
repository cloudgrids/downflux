import { OkPornMethods, UrlType, VideoQuality } from '../enums';
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
				return this.toAlbumOutput(metadata, request);

			case OkPornMethods.getVideo:
			case OkPornMethods.getVideos: {
				const album = await this.getVideoAlbum(metadata, request);
				return this.toVideoOutput(metadata, request, album);
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

	private async getVideoAlbum(metadata: DefaultExtractorResult, request: ExecutionArguments): Promise<OkPornAlbumOutput | undefined> {
		const videoAlbumId = metadata.customFields?.videoAlbumId;

		if (!videoAlbumId) return undefined;

		const albumMetadata = (await super.transform(`${this.ALBUMS_URL}${videoAlbumId}/`, {
			...request,
			method: OkPornMethods.getAlbum,
			urlType: UrlType.IMAGES
		} as ExecutionArguments)) as DefaultExtractorResult;

		return this.toAlbumOutput(albumMetadata, request);
	}

	private toAlbumOutput(metadata: DefaultExtractorResult, request: ExecutionArguments): OkPornAlbumOutput {
		return {
			albumTitle: metadata.title,
			albumUrl: metadata.baseUrl,
			albumKeywords: metadata.keywords,
			albumDescription: metadata.description,
			modelName: metadata.customFields?.modelName,
			albumId: metadata.baseUrl.split('/').filter(Boolean).pop() ?? '',
			albumImages: metadata.images,
			albumThumbnail: metadata.images[0],
			albumImageCount: metadata.images.length,
			baseUrl: request?.entryUrl
		};
	}

	private toVideoOutput(
		metadata: DefaultExtractorResult,
		request: ExecutionArguments,
		videoAlbum?: OkPornAlbumOutput
	): OkPornVideoOutput {
		return {
			videoTitle: metadata.title,
			videoUrl: metadata.baseUrl,
			videoKeywords: metadata.keywords,
			videoDescription: metadata.description,
			videoId: metadata.baseUrl.split('/').filter(Boolean).pop() ?? '',
			videoSources: this.filterByQuality(request, metadata.sources),
			videoPoster: metadata.customFields?.videoPoster,
			videoScreenshot: metadata.customFields?.videoPoster,
			modelName: metadata.customFields?.starredBy?.[0],
			videoAlbumId: metadata.customFields?.videoAlbumId,
			videoCreatedAt: metadata.customFields?.videoCreateDate,
			videoAlbum,
			baseUrl: request?.entryUrl
		};
	}

	private toModelOutput(metadata: DefaultExtractorResult): OkPornModelOutput {
		return {
			modelName: metadata.title,
			modelUrl: metadata.baseUrl,
			modelThumbnail: metadata.images[0],
			baseUrl: metadata.baseUrl
		};
	}

	private toTagOutput(metadata: DefaultExtractorResult): OkPornTagOutput {
		return {
			tagName: metadata.title,
			tagUrl: metadata.baseUrl,
			baseUrl: metadata.baseUrl
		};
	}

	private toChannelOutput(metadata: DefaultExtractorResult): OkPornChannelOutput {
		return {
			channelName: metadata.title,
			channelUrl: metadata.baseUrl,
			channelThumbnail: metadata.images[0],
			baseUrl: metadata.baseUrl
		};
	}

	private detectVideoQuality(url: string): VideoQuality {
		if (url.includes('1080')) return VideoQuality.Q1080;
		if (url.includes('720')) return VideoQuality.Q720;
		if (url.includes('480')) return VideoQuality.Q480;
		if (url.includes('360')) return VideoQuality.Q360;
		if (url.includes('240')) return VideoQuality.Q240;
		if (url.includes('144')) return VideoQuality.Q144;
		return VideoQuality.Q480;
	}

	private filterByQuality(request: ExecutionArguments, sources: string[]) {
		const extendedSources = sources.map((url) => ({ url, quality: this.detectVideoQuality(url) }));
		if (!request?.videoQualities?.length) return extendedSources;

		return extendedSources.filter((source) => request.videoQualities?.includes(source.quality));
	}
}
