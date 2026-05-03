import { detectVideoQuality } from '../helpers';
import {
	DefaultExtractorResult,
	OkPornAlbumOutput,
	OkPornChannelOutput,
	OkPornExecArgs,
	OkPornMethods,
	OkPornModelOutput,
	OkPornModelVideoIdsOutput,
	OkPornOutput,
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
		request: OkPornExecArgs
	): Promise<
		| OkPornAlbumOutput
		| OkPornVideoOutput
		| OkPornModelOutput
		| OkPornTagOutput
		| OkPornChannelOutput
		| OkPornModelVideoIdsOutput
		| DefaultExtractorResult
	> {
		const metadata = (await super.transform(url, request)) as DefaultExtractorResult<Partial<OkPornOutput>>;

		if (!request?.transformOutput) return metadata;

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

	private async getVideoAlbum(
		metadata: DefaultExtractorResult<Partial<OkPornOutput>>,
		request: OkPornExecArgs
	): Promise<OkPornAlbumOutput> {
		const videoAlbumId = metadata.customFields?.videoAlbumId;

		const albumUrl = `${this.ALBUMS_URL}${videoAlbumId}/`;
		const albumRequest = {
			...request,
			entryUrl: albumUrl,
			referer: albumUrl,
			method: OkPornMethods.getAlbum,
			urlType: UrlType.IMAGES
		};

		this.emitExtractProgress(albumRequest, 'extracting', albumUrl);

		const albumMetadata = (await super.transform(albumUrl, albumRequest)) as DefaultExtractorResult<Partial<OkPornOutput>>;

		this.emitExtractProgress(albumRequest, 'extracted', albumUrl);

		return this.toAlbumOutput(albumMetadata);
	}

	private toModelVideoIdsOutput(
		request: OkPornExecArgs,
		metadata: DefaultExtractorResult<Partial<OkPornOutput>>
	): OkPornModelVideoIdsOutput {
		const videoCards = metadata.customFields?.videoCards ?? [];
		return {
			modelName: request.targets[0].split('/').filter(Boolean)[3] ?? '',
			pageTitle: metadata.title,
			videoCount: videoCards?.length ?? 0,
			videoCards
		};
	}

	private toAlbumOutput(metadata: DefaultExtractorResult<Partial<OkPornOutput>>): OkPornAlbumOutput {
		const customFields = metadata.customFields;

		return {
			albumTitle: metadata.title,
			albumUrl: metadata.sourceUrl,
			albumKeywords: metadata.keywords,
			albumDescription: metadata.description,
			modelName: customFields?.modelName ?? '',
			albumId: metadata.sourceUrl.split('/').filter(Boolean).pop() ?? '',
			albumImages: metadata.images,
			albumThumbnail: metadata.images[0],
			albumImageCount: metadata.images.length,
			starredModels: (customFields?.starredModels as string[]) ?? []
		};
	}

	private toVideoOutput(
		request: OkPornExecArgs,
		metadata: DefaultExtractorResult<Partial<OkPornOutput>>,
		videoAlbum?: OkPornAlbumOutput
	): OkPornVideoOutput {
		const customFields = metadata.customFields;

		return {
			videoTitle: metadata.title,
			videoUrl: metadata.sourceUrl,
			videoKeywords: metadata.keywords,
			videoDescription: metadata.description,
			videoId: metadata.sourceUrl.split('/').filter(Boolean).pop() ?? '',
			videoSources: metadata.sources.map((url) => ({ url, quality: detectVideoQuality(url, VideoQuality.Q480) })),
			videoPoster: customFields?.videoPoster ?? '',
			videoScreenshot: customFields?.videoPoster ?? '',
			modelName: customFields?.starredBy?.[0] ?? '',
			videoAlbumId: customFields?.videoAlbumId,
			videoCreatedAt: customFields?.videoCreatedAt,
			videoAlbum,
			starredBy: customFields?.starredBy ?? []
		};
	}

	private toModelOutput(request: OkPornExecArgs, metadata: DefaultExtractorResult<Partial<OkPornOutput>>): OkPornModelOutput {
		let modelUrls = metadata.anchors.filter((a) => a.match(/https:\/\/ok\.porn\/models\/([a-z-]{2,})\/$/)).filter(Boolean);

		if (request.modelArgs === 'path') modelUrls = modelUrls.map((url) => url.split('/').filter(Boolean).pop() ?? '');

		return {
			pageTitle: metadata.title,
			pageUrl: metadata.sourceUrl,
			modelCount: modelUrls.length,
			modelUrls
		};
	}

	private toTagOutput(request: OkPornExecArgs, metadata: DefaultExtractorResult<Partial<OkPornOutput>>): OkPornTagOutput {
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

	private toChannelOutput(request: OkPornExecArgs, metadata: DefaultExtractorResult<Partial<OkPornOutput>>): OkPornChannelOutput {
		let channelUrls = metadata.anchors?.filter((a) => a.match(/^https:\/\/ok\.porn\/sites\/([a-z-0-9]{2,})\/$/)).filter(Boolean);
		if (request.channelArgs === 'path') channelUrls = channelUrls.map((url) => url.split('/').filter(Boolean).pop() ?? '');

		return {
			channelUrls,
			channelCount: channelUrls?.length
		};
	}
}
