import {
	DefaultExtractorResult,
	OkPornAlbumOutput,
	OkPornChannelOutput,
	OkPornExecArgs,
	OkPornMethods,
	OkPornModelOutput,
	OkPornTagOutput,
	OkPornVideoOutput,
	TagKeys,
	TagsOutput,
	UrlType,
	VideoQuality
} from '../util';
import { BaseTransformer } from './BaseTransformer';

export class OkPornTransformer extends BaseTransformer<
	OkPornExecArgs,
	OkPornAlbumOutput | OkPornVideoOutput | OkPornModelOutput | OkPornTagOutput | OkPornChannelOutput | DefaultExtractorResult
> {
	private readonly ALBUMS_URL = 'https://ok.porn/albums/';

	public override async transform(
		url: string,
		request?: OkPornExecArgs
	): Promise<OkPornAlbumOutput | OkPornVideoOutput | OkPornModelOutput | OkPornTagOutput | OkPornChannelOutput | DefaultExtractorResult> {
		const metadata = (await super.transform(url, request)) as DefaultExtractorResult;

		switch (request?.method) {
			case OkPornMethods.getAlbum:
			case OkPornMethods.getAlbums:
				return this.toAlbumOutput(metadata, request);

			case OkPornMethods.getVideo:
			case OkPornMethods.getVideos: {
				const album = await this.getVideoAlbum(metadata, request);
				return this.toVideoOutput(request, metadata, album);
			}

			case OkPornMethods.getModels:
				return this.toModelOutput(request, metadata);

			case OkPornMethods.getTags:
				return this.toTagOutput(request, metadata);

			case OkPornMethods.getChannels:
				return this.toChannelOutput(request, metadata);
			default:
				return metadata;
		}
	}

	private async getVideoAlbum(metadata: DefaultExtractorResult, request: OkPornExecArgs): Promise<OkPornAlbumOutput | undefined> {
		const videoAlbumId = metadata.customFields?.videoAlbumId;

		if (!videoAlbumId) return undefined;

		const albumMetadata = (await super.transform(`${this.ALBUMS_URL}${videoAlbumId}/`, {
			...request,
			method: OkPornMethods.getAlbum,
			urlType: UrlType.IMAGES
		})) as DefaultExtractorResult;

		return this.toAlbumOutput(albumMetadata, request);
	}

	private toAlbumOutput(metadata: DefaultExtractorResult, request: OkPornExecArgs): OkPornAlbumOutput {
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

	private toVideoOutput(request: OkPornExecArgs, metadata: DefaultExtractorResult, videoAlbum?: OkPornAlbumOutput): OkPornVideoOutput {
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

	private toModelOutput(request: OkPornExecArgs, metadata: DefaultExtractorResult): OkPornModelOutput {
		let modelUrls = metadata.anchors.filter((a) => a.match(/https:\/\/ok\.porn\/models\/([a-z-]{2,})\/$/)).filter(Boolean);

		if (request.modelArgs === 'path') modelUrls = modelUrls.map((url) => url.split('/').filter(Boolean).pop() ?? '');

		return {
			pageTitle: metadata.title,
			pageUrl: metadata.baseUrl,
			baseUrl: metadata.baseUrl,
			modelCount: modelUrls.length,
			modelUrls
		};
	}

	private toTagOutput(request: OkPornExecArgs, metadata: DefaultExtractorResult): OkPornTagOutput {
		const baseUrl = metadata.baseUrl;
		const { format, tagKeys } = request?.tagArgs || { format: 'url', tagKeys: [] };
		const tagUrls = metadata.anchors.filter((a) => a.match(/^https:\/\/ok\.porn\/tags\/([a-zA-Z0-9-]{2,})\/$/)).filter(Boolean);

		return {
			baseUrl,
			tags: tagUrls.reduce<TagsOutput>((acc, anchor) => {
				const tag = anchor.split('/').filter(Boolean).pop() ?? '';
				const isNumeric = /^\d+$/.test(tag[0]);

				const key = isNumeric ? '#' : tag[0].toUpperCase();
				if (!acc[key]) acc[key] ??= [];

				if (!tagKeys?.length) acc[key].push(format === 'url' ? anchor : tag);
				else if (tagKeys?.includes(key as TagKeys)) acc[key].push(format === 'url' ? anchor : tag);
				return acc;
			}, {})
		};
	}

	private toChannelOutput(request: OkPornExecArgs, metadata: DefaultExtractorResult): OkPornChannelOutput {
		let channelUrls = metadata.anchors.filter((a) => a.match(/^https:\/\/ok\.porn\/sites\/([a-z-]{2,})\/$/)).filter(Boolean);
		if (request.channelArgs === 'path') channelUrls = channelUrls.map((url) => url.split('/').filter(Boolean).pop() ?? '');

		return {
			channelUrls,
			baseUrl: metadata.baseUrl,
			channelCount: metadata.anchors.length
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

	private filterByQuality(request: OkPornExecArgs, sources: string[]) {
		const extendedSources = sources.map((url) => ({ url, quality: this.detectVideoQuality(url) }));
		if (!request?.videoArgs?.length) return extendedSources;

		return extendedSources.filter((source) => request.videoArgs?.includes(source.quality));
	}
}
