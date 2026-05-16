import { BaseTransformer } from '@base';
import { DefaultExecutionResult, TagKeys } from '@contracts';
import { ExtractionTarget } from '@types';
import {
	OkPornAlbumOutput,
	OkPornChannelOutput,
	OkPornExecArgs,
	OkPornModelOutput,
	OkPornModelVideoIdsOutput,
	OkPornOutput,
	OkPornTagOutput,
	OkPornVideoOutput,
	TagsOutput
} from './OkPornContracts';
import { OkPornMethods } from './OkPornTypes';

export class OkPornTransformer extends BaseTransformer<
	OkPornExecArgs,
	| OkPornAlbumOutput
	| OkPornVideoOutput
	| OkPornModelOutput
	| OkPornTagOutput
	| OkPornChannelOutput
	| OkPornModelVideoIdsOutput
	| DefaultExecutionResult
> {
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
		| DefaultExecutionResult
	> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<OkPornOutput>>;

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
		metadata: DefaultExecutionResult<Partial<OkPornOutput>>,
		request: OkPornExecArgs
	): Promise<OkPornAlbumOutput> {
		const videoAlbumId = metadata.customFields?.videoAlbumId;

		const origin = new URL(request.entryUrl).origin;

		const albumUrl = `${origin}/albums/${videoAlbumId}/`;
		const albumRequest = {
			...request,
			entryUrl: albumUrl,
			referer: albumUrl,
			method: OkPornMethods.getAlbum,
			extractionTarget: ExtractionTarget.IMAGES
		};

		const albumMetadata = (await super.transform(albumUrl, albumRequest)) as DefaultExecutionResult<Partial<OkPornOutput>>;

		return this.toAlbumOutput(albumMetadata);
	}

	private toModelVideoIdsOutput(
		request: OkPornExecArgs,
		metadata: DefaultExecutionResult<Partial<OkPornOutput>>
	): OkPornModelVideoIdsOutput {
		const videoCards = metadata.customFields?.videoCards ?? [];
		return {
			modelName: request.targets[0].split('/').filter(Boolean)[3] ?? '',
			pageTitle: metadata.title,
			videoCount: videoCards?.length ?? 0,
			videoCards
		};
	}

	private toAlbumOutput(metadata: DefaultExecutionResult<Partial<OkPornOutput>>): OkPornAlbumOutput {
		const customFields = metadata.customFields;

		return {
			albumTitle: metadata.title,
			albumUrl: metadata.sourceUrl,
			albumKeywords: metadata.keywords,
			albumDescription: metadata.description,
			modelName: customFields?.modelName ?? '',
			albumId: metadata.sourceUrl.split('/').filter(Boolean).pop() ?? '',
			albumImages: this.unique(metadata.images),
			albumThumbnail: metadata.images[0],
			albumImageCount: metadata.images.length,
			starredModels: (customFields?.starredModels as string[]) ?? []
		};
	}

	private toVideoOutput(
		request: OkPornExecArgs,
		metadata: DefaultExecutionResult<Partial<OkPornOutput>>,
		videoAlbum?: OkPornAlbumOutput
	): OkPornVideoOutput {
		const customFields = metadata.customFields as OkPornOutput;

		return {
			title: metadata.title,
			pageUrl: metadata.sourceUrl,
			tags: metadata.keywords,
			description: metadata.description,
			videoId: metadata.sourceUrl.split('/').filter(Boolean).pop() ?? '',
			poster: customFields?.poster,
			videos: {
				hls: this.uniqueVideos(customFields?.videos?.hls ?? [], {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				}),
				mp4: this.uniqueVideos(customFields?.videos?.mp4 ?? [], {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				})
			},
			videoScreenshot: customFields?.poster ?? '',
			videoAlbumId: customFields?.videoAlbumId,
			videoCreatedAt: customFields?.videoCreatedAt,
			videoAlbum: !videoAlbum?.albumImageCount ? undefined : videoAlbum,
			author: customFields?.author,
			starredBy: customFields?.starredBy ?? customFields.starredModels
		};
	}

	private toModelOutput(request: OkPornExecArgs, metadata: DefaultExecutionResult<Partial<OkPornOutput>>): OkPornModelOutput {
		let modelUrls = metadata.anchors.filter((a) => a.match(/https:\/\/ok\.porn\/models\/([a-z-]{2,})\/$/)).filter(Boolean);

		if (request.modelArgs === 'path') modelUrls = modelUrls.map((url) => url.split('/').filter(Boolean).pop() ?? '');

		return {
			pageTitle: metadata.title,
			pageUrl: metadata.sourceUrl,
			modelCount: modelUrls.length,
			modelUrls: this.unique(modelUrls)
		};
	}

	private toTagOutput(request: OkPornExecArgs, metadata: DefaultExecutionResult<Partial<OkPornOutput>>): OkPornTagOutput {
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

	private toChannelOutput(request: OkPornExecArgs, metadata: DefaultExecutionResult<Partial<OkPornOutput>>): OkPornChannelOutput {
		let channelUrls = metadata.anchors?.filter((a) => a.match(/^https:\/\/ok\.porn\/sites\/([a-z-0-9]{2,})\/$/)).filter(Boolean);
		if (request.channelArgs === 'path') channelUrls = channelUrls.map((url) => url.split('/').filter(Boolean).pop() ?? '');

		return {
			channelUrls: this.unique(channelUrls),
			channelCount: channelUrls?.length
		};
	}
}
