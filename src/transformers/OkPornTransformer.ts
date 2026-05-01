import { detectVideoQuality } from '../helpers';
import {
	DefaultExtractorResult,
	OkPornAlbumOutput,
	OkPornChannelOutput,
	OkPornExecArgs,
	OkPornMethods,
	OkPornModelOutput,
	OkPornModelVideoCard,
	OkPornModelVideoIdsOutput,
	OkPornTagOutput,
	OkPornVideoOutput,
	TagKeys,
	TagsOutput,
	UrlType
} from '../util';
import { BaseTransformer } from './BaseTransformer';

export class OkPornTransformer extends BaseTransformer<
	OkPornExecArgs,
	| OkPornAlbumOutput
	| OkPornVideoOutput
	| OkPornModelOutput
	| OkPornTagOutput
	| OkPornChannelOutput
	| OkPornModelVideoIdsOutput
	| DefaultExtractorResult
> {
	private readonly ALBUMS_URL = 'https://ok.porn/albums/';

	public override async transform(
		url: string,
		request?: OkPornExecArgs
	): Promise<
		| OkPornAlbumOutput
		| OkPornVideoOutput
		| OkPornModelOutput
		| OkPornTagOutput
		| OkPornChannelOutput
		| OkPornModelVideoIdsOutput
		| DefaultExtractorResult
	> {
		const metadata = (await super.transform(url, request)) as DefaultExtractorResult;

		switch (request?.method) {
			case OkPornMethods.getAlbum:
			case OkPornMethods.getAlbums:
				return this.toAlbumOutput(metadata);

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

			case OkPornMethods.getModelVideoIds:
				return this.toModelVideoIdsOutput(request, metadata);

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

		return this.toAlbumOutput(albumMetadata);
	}

	private toModelVideoIdsOutput(request: OkPornExecArgs, metadata: DefaultExtractorResult): OkPornModelVideoIdsOutput {
		const videoCards = metadata.customFields?.modelVideoCards as OkPornModelVideoCard[];
		return {
			modelName: request.targets[0].split('/').filter(Boolean)[3] ?? '',
			pageTitle: metadata.title,
			videoCount: videoCards.length,
			videoCards
		};
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

	private toVideoOutput(request: OkPornExecArgs, metadata: DefaultExtractorResult, videoAlbum?: OkPornAlbumOutput): OkPornVideoOutput {
		return {
			videoTitle: metadata.title,
			videoUrl: metadata.baseUrl,
			videoKeywords: metadata.keywords,
			videoDescription: metadata.description,
			videoId: metadata.baseUrl.split('/').filter(Boolean).pop() ?? '',
			videoSources: metadata.sources.map((url) => ({ url, quality: detectVideoQuality(url) })),
			videoPoster: metadata.customFields?.videoPoster,
			videoScreenshot: metadata.customFields?.videoPoster,
			modelName: metadata.customFields?.starredBy?.[0],
			videoAlbumId: metadata.customFields?.videoAlbumId,
			videoCreatedAt: metadata.customFields?.videoCreateDate,
			videoAlbum
		};
	}

	private toModelOutput(request: OkPornExecArgs, metadata: DefaultExtractorResult): OkPornModelOutput {
		let modelUrls = metadata.anchors.filter((a) => a.match(/https:\/\/ok\.porn\/models\/([a-z-]{2,})\/$/)).filter(Boolean);

		if (request.modelArgs === 'path') modelUrls = modelUrls.map((url) => url.split('/').filter(Boolean).pop() ?? '');

		return {
			pageTitle: metadata.title,
			pageUrl: metadata.baseUrl,
			modelCount: modelUrls.length,
			modelUrls
		};
	}

	private toTagOutput(request: OkPornExecArgs, metadata: DefaultExtractorResult): OkPornTagOutput {
		const { format, allowedKeys } = request?.tagArgs || { format: 'url', allowedKeys: [] };
		const tagUrls = metadata.anchors.filter((a) => a.match(/^https:\/\/ok\.porn\/tags\/([a-zA-Z0-9-]{2,})\/$/)).filter(Boolean);

		return {
			tags: tagUrls.reduce<TagsOutput>((acc, anchor) => {
				const tag = anchor.split('/').filter(Boolean).pop() ?? '';
				const isNumeric = /^\d+$/.test(tag[0]);

				const key = isNumeric ? '#' : tag[0].toUpperCase();
				if (!acc[key]) acc[key] ??= [];

				if (!allowedKeys?.length) acc[key].push(format === 'url' ? anchor : tag);
				else if (allowedKeys?.includes(key as TagKeys)) acc[key].push(format === 'url' ? anchor : tag);
				return acc;
			}, {})
		};
	}

	private toChannelOutput(request: OkPornExecArgs, metadata: DefaultExtractorResult): OkPornChannelOutput {
		let channelUrls = metadata.anchors.filter((a) => a.match(/^https:\/\/ok\.porn\/sites\/([a-z-]{2,})\/$/)).filter(Boolean);
		if (request.channelArgs === 'path') channelUrls = channelUrls.map((url) => url.split('/').filter(Boolean).pop() ?? '');

		return {
			channelUrls,
			channelCount: metadata.anchors.length
		};
	}
}
