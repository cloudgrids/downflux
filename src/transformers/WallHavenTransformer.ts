import {
	DefaultExtractorResult,
	UrlType,
	WallHavenExecArgs,
	WallHavenMethods,
	WallHavenOutput,
	WallHavenThumbnail,
	WallHavenThumbnailQuality,
	WallHavenUserFavoriteCollectionOutput,
	WallHavenUserFavoriteCollectionsOutput,
	WallHavenUserInfoOutput,
	WallHavenUserUploadsOutput,
	WallHavenWallPaperOutput
} from '../util';
import { BaseTransformer } from './BaseTransformer';

export class WallHavenTransformer extends BaseTransformer<
	WallHavenExecArgs,
	| WallHavenWallPaperOutput
	| WallHavenUserUploadsOutput
	| WallHavenUserInfoOutput
	| WallHavenUserFavoriteCollectionsOutput[]
	| DefaultExtractorResult
> {
	public async transform(
		url: string,
		request?: WallHavenExecArgs
	): Promise<
		| WallHavenWallPaperOutput
		| WallHavenUserUploadsOutput
		| WallHavenUserInfoOutput
		| WallHavenUserFavoriteCollectionsOutput[]
		| DefaultExtractorResult
	> {
		const metadata = (await super.transform(url, request)) as DefaultExtractorResult<Partial<WallHavenOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case WallHavenMethods.getWallPaper:
			case WallHavenMethods.getWallPapers:
				return this.toWallPaperOutput(request, metadata);

			case WallHavenMethods.getUserUploads: {
				const userUploads = this.toUserUploads(request, metadata);
				if (request?.userArgs?.includeMetadata) {
					const wallPapers = await this.getWallPaper(request, userUploads.thumbnails);
					return { ...userUploads, wallPapers };
				}
				return userUploads;
			}

			case WallHavenMethods.getUserUploadsInfo:
				return this.toUserInfo(request, metadata);

			case WallHavenMethods.getUserFavoriteCollections:
				return this.toUserFavoriteCollections(request, metadata);

			case WallHavenMethods.getUserFavoriteCollection: {
				const userFavoriteCollection = this.toUserFavoriteCollection(request, metadata);

				if (request?.collectionArgs?.includeMetadata) {
					const wallPapers = await this.getWallPaper(request, userFavoriteCollection.thumbnails);

					return { ...userFavoriteCollection, wallPapers };
				}
				return userFavoriteCollection;
			}

			default:
				return metadata;
		}
	}

	private toWallPaperOutput(
		request: WallHavenExecArgs,
		metadata: DefaultExtractorResult<Partial<WallHavenOutput>>
	): WallHavenWallPaperOutput {
		const partial = metadata.customFields as WallHavenOutput;
		delete metadata.customFields?.totalContents;

		const id = metadata.sourceUrl?.split('/')?.filter(Boolean)?.pop() ?? '';
		const thumbnails = metadata.images
			?.filter((img) => img.startsWith('https://w.wallhaven.cc'))
			.map((image) => ({
				id,
				quality: WallHavenThumbnailQuality.HIGH,
				url: image,
				siteUrl: metadata.sourceUrl
			})) as WallHavenThumbnail[];

		thumbnails.push({
			id,
			quality: WallHavenThumbnailQuality.LOW,
			url: `https://th.wallhaven.cc/small/${id.substring(0, 2)}/${id}.jpg`,
			siteUrl: metadata.sourceUrl
		});

		return {
			...partial,
			id,
			title: metadata.title,
			uploader: partial?.uploader?.split(' ')[0] ?? 'unknown',
			description: metadata.description,
			thumbnails
		};
	}

	private async getWallPaper(request: WallHavenExecArgs, thumbnails: WallHavenThumbnail[]): Promise<WallHavenWallPaperOutput[]> {
		const wallPapers: WallHavenWallPaperOutput[] = [];

		for (const thumbnail of thumbnails) {
			const wallPaperRequest = {
				...request,
				entryUrl: thumbnail.siteUrl,
				referer: thumbnail.siteUrl,
				method: WallHavenMethods.getWallPaper,
				urlType: UrlType.IMAGES
			};

			const wallPaper = (await super.transform(thumbnail.siteUrl, wallPaperRequest)) as DefaultExtractorResult<
				Partial<WallHavenOutput>
			>;

			wallPapers.push(this.toWallPaperOutput(request, wallPaper));
		}
		return wallPapers;
	}

	private toUserUploads(request: WallHavenExecArgs, metadata: DefaultExtractorResult): WallHavenUserUploadsOutput {
		const partial = metadata.customFields as unknown as WallHavenUserUploadsOutput;

		const thumbnails = metadata.images
			?.filter((img) => img.startsWith('https://th.wallhaven.cc'))
			.map((image) => {
				const id = image.split('/').pop()?.split('.')?.[0] ?? '';
				return {
					id,
					quality: WallHavenThumbnailQuality.LOW,
					url: image,
					siteUrl: `https://wallhaven.cc/w/${id}`
				};
			}) as WallHavenThumbnail[];

		return {
			uploader: partial.uploader,
			totalContents: Number(partial.totalContents ?? 0),
			totalPages: Math.ceil(Number(partial.totalContents) / 24),
			currentPage: Number(metadata.sourceUrl.split('=').pop() ?? '1'),
			thumbnails
		};
	}

	private toUserFavoriteCollection(request: WallHavenExecArgs, metadata: DefaultExtractorResult): WallHavenUserFavoriteCollectionOutput {
		const partial = metadata.customFields as unknown as WallHavenUserUploadsOutput;

		const thumbnails = metadata.images
			?.filter((img) => img.startsWith('https://th.wallhaven.cc'))
			.map((image) => {
				const id = image.split('/').pop()?.split('.')?.[0] ?? '';
				return {
					id,
					quality: WallHavenThumbnailQuality.LOW,
					url: image,
					siteUrl: `https://wallhaven.cc/w/${id}`
				};
			}) as WallHavenThumbnail[];

		return {
			collectionId: request?.collectionArgs?.collectionId as string,
			uploader: partial.uploader,
			totalContents: Number(partial.totalContents ?? 0),
			totalPages: Math.ceil(Number(partial.totalContents) / 24),
			currentPage: Number(metadata.sourceUrl.split('=').pop() ?? '1'),
			thumbnails
		};
	}

	private toUserFavoriteCollections(
		request: WallHavenExecArgs,
		metadata: DefaultExtractorResult<Partial<WallHavenOutput>>
	): WallHavenUserFavoriteCollectionsOutput[] {
		return metadata.customFields?.collections ?? [];
	}

	private toUserInfo(request: WallHavenExecArgs, metadata: DefaultExtractorResult<Partial<WallHavenOutput>>): WallHavenUserInfoOutput {
		const totalContents = Number(metadata.customFields?.totalContents ?? 0);
		return {
			uploader: request?.userArgs?.username as string,
			totalContents,
			totalPages: Math.ceil(Number(totalContents) / 24)
		};
	}
}
