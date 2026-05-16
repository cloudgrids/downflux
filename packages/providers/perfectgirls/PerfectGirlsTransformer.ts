import { BaseTransformer } from '@base';
import { DefaultExecutionResult, TagKeys } from '@contracts';
import { TagsOutput } from '@provider/okporn';
import { ExtractionTarget } from '@types';
import {
	PerfectGirlsAlbumOutput,
	PerfectGirlsChannelOutput,
	PerfectGirlsExecArgs,
	PerfectGirlsModelOutput,
	PerfectGirlsModelVideoIdsOutput,
	PerfectGirlsOutput,
	PerfectGirlsTagOutput,
	PerfectGirlsVideoOutput
} from './PerfectGirlsContracts';
import { PerfectGirlsMethods } from './PerfectGirlsTypes';

export class PerfectGirlsTransformer extends BaseTransformer<
	PerfectGirlsExecArgs,
	| PerfectGirlsAlbumOutput
	| PerfectGirlsVideoOutput
	| PerfectGirlsModelOutput
	| PerfectGirlsTagOutput
	| PerfectGirlsChannelOutput
	| PerfectGirlsModelVideoIdsOutput
	| DefaultExecutionResult
> {
	public override async transform(
		url: string,
		request: PerfectGirlsExecArgs
	): Promise<
		| PerfectGirlsAlbumOutput
		| PerfectGirlsVideoOutput
		| PerfectGirlsModelOutput
		| PerfectGirlsTagOutput
		| PerfectGirlsChannelOutput
		| PerfectGirlsModelVideoIdsOutput
		| DefaultExecutionResult
	> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<PerfectGirlsOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case PerfectGirlsMethods.getAlbum:
			case PerfectGirlsMethods.getAlbums:
				return this.toAlbumOutput(metadata);

			case PerfectGirlsMethods.getVideo:
			case PerfectGirlsMethods.getVideos: {
				const album = await this.getVideoAlbum(metadata, request);
				return this.toVideoOutput(request, metadata, album);
			}

			case PerfectGirlsMethods.getModels:
				return this.toModelOutput(request, metadata);

			case PerfectGirlsMethods.getTags:
				return this.toTagOutput(request, metadata);

			case PerfectGirlsMethods.getChannels:
				return this.toChannelOutput(request, metadata);

			case PerfectGirlsMethods.getModelVideoIds:
				return this.toModelVideoIdsOutput(request, metadata);

			default:
				return metadata;
		}
	}

	private async getVideoAlbum(
		metadata: DefaultExecutionResult<Partial<PerfectGirlsOutput>>,
		request: PerfectGirlsExecArgs
	): Promise<PerfectGirlsAlbumOutput> {
		const videoAlbumId = metadata.customFields?.videoAlbumId;

		const origin = new URL(request.entryUrl).origin;

		const albumUrl = `${origin}/albums/${videoAlbumId}/`;
		const albumRequest = {
			...request,
			entryUrl: albumUrl,
			referer: albumUrl,
			method: PerfectGirlsMethods.getAlbum,
			extractionTarget: ExtractionTarget.IMAGES
		};

		const albumMetadata = (await super.transform(albumUrl, albumRequest)) as DefaultExecutionResult<Partial<PerfectGirlsOutput>>;

		return this.toAlbumOutput(albumMetadata);
	}

	private toModelVideoIdsOutput(
		request: PerfectGirlsExecArgs,
		metadata: DefaultExecutionResult<Partial<PerfectGirlsOutput>>
	): PerfectGirlsModelVideoIdsOutput {
		const videoCards = metadata.customFields?.videoCards ?? [];
		return {
			modelName: request.targets[0].split('/').filter(Boolean)[3] ?? '',
			pageTitle: metadata.title,
			videoCount: videoCards?.length ?? 0,
			videoCards
		};
	}

	private toAlbumOutput(metadata: DefaultExecutionResult<Partial<PerfectGirlsOutput>>): PerfectGirlsAlbumOutput {
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
		request: PerfectGirlsExecArgs,
		metadata: DefaultExecutionResult<Partial<PerfectGirlsOutput>>,
		videoAlbum?: PerfectGirlsAlbumOutput
	): PerfectGirlsVideoOutput {
		const customFields = metadata.customFields as PerfectGirlsOutput;

		return {
			title: metadata.title,
			pageUrl: metadata.sourceUrl,
			tags: metadata.keywords,
			description: metadata.description,
			videoId: metadata.sourceUrl.split('/').filter(Boolean).pop() ?? '',
			poster: customFields?.poster,
			videos: customFields?.videos,
			videoScreenshot: customFields?.poster ?? '',
			videoAlbumId: customFields?.videoAlbumId,
			videoCreatedAt: customFields?.videoCreatedAt,
			videoAlbum: !videoAlbum?.albumImageCount ? undefined : videoAlbum,
			author: customFields?.author,
			starredBy: customFields?.starredBy ?? customFields.starredModels
		};
	}

	private toModelOutput(
		request: PerfectGirlsExecArgs,
		metadata: DefaultExecutionResult<Partial<PerfectGirlsOutput>>
	): PerfectGirlsModelOutput {
		let modelUrls = metadata.anchors.filter((a) => a.match(/https:\/\/ok\.porn\/models\/([a-z-]{2,})\/$/)).filter(Boolean);

		if (request.modelArgs === 'path') modelUrls = modelUrls.map((url) => url.split('/').filter(Boolean).pop() ?? '');

		return {
			pageTitle: metadata.title,
			pageUrl: metadata.sourceUrl,
			modelCount: modelUrls.length,
			modelUrls
		};
	}

	private toTagOutput(
		request: PerfectGirlsExecArgs,
		metadata: DefaultExecutionResult<Partial<PerfectGirlsOutput>>
	): PerfectGirlsTagOutput {
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

	private toChannelOutput(
		request: PerfectGirlsExecArgs,
		metadata: DefaultExecutionResult<Partial<PerfectGirlsOutput>>
	): PerfectGirlsChannelOutput {
		let channelUrls = metadata.anchors?.filter((a) => a.match(/^https:\/\/ok\.porn\/sites\/([a-z-0-9]{2,})\/$/)).filter(Boolean);
		if (request.channelArgs === 'path') channelUrls = channelUrls.map((url) => url.split('/').filter(Boolean).pop() ?? '');

		return {
			channelUrls,
			channelCount: channelUrls?.length
		};
	}
}
