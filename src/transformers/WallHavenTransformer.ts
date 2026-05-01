import {
	DefaultExtractorResult,
	UrlType,
	WallHavenExecArgs,
	WallHavenMethods,
	WallHavenThumbnail,
	WallHavenThumbnailQuality,
	WallHavenUserUploadsOutput,
	WallHavenWallPaperOutput
} from '../util';
import { BaseTransformer } from './BaseTransformer';

export class WallHavenTransformer extends BaseTransformer<
	WallHavenExecArgs,
	WallHavenWallPaperOutput | WallHavenUserUploadsOutput | DefaultExtractorResult
> {
	public async transform(
		url: string,
		request?: WallHavenExecArgs
	): Promise<WallHavenWallPaperOutput | WallHavenUserUploadsOutput | DefaultExtractorResult> {
		const metadata = (await super.transform(url, request)) as DefaultExtractorResult;

		switch (request?.method) {
			case WallHavenMethods.getWallPaper:
			case WallHavenMethods.getWallPapers:
				return this.toWallPaperOutput(request, metadata);

			case WallHavenMethods.getUserUploads: {
				const userUploads = this.toUserUploads(request, metadata);
				if (request?.userUploadsArgs?.includeMetadata) {
					const wallPapers = await this.getWallPaper(request, userUploads.thumbnails);
					return { ...userUploads, wallPapers };
				}
				return userUploads;
			}
			default:
				return metadata;
		}
	}

	private toWallPaperOutput(request: WallHavenExecArgs, metadata: DefaultExtractorResult): WallHavenWallPaperOutput {
		const partial = metadata.customFields as unknown as WallHavenWallPaperOutput & { totalContents?: number };
		delete partial?.totalContents;

		const id = metadata.baseUrl?.split('/')?.filter(Boolean)?.pop() ?? '';
		const thumbnails = metadata.images
			?.filter((img) => img.startsWith('https://w.wallhaven.cc'))
			.map((image) => ({
				id,
				quality: WallHavenThumbnailQuality.HIGH,
				url: image,
				siteUrl: metadata.baseUrl
			})) as WallHavenThumbnail[];

		thumbnails.push({
			id,
			quality: WallHavenThumbnailQuality.LOW,
			url: `https://th.wallhaven.cc/small/${id.substring(0, 2)}/${id}.jpg`,
			siteUrl: metadata.baseUrl
		});

		return {
			...partial,
			id,
			title: metadata.title,
			uploader: partial.uploader.split(' ')[0],
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

			this.emitExtractProgress(wallPaperRequest, 'extracting', thumbnail.siteUrl);

			const wallPaper = (await super.transform(thumbnail.siteUrl, wallPaperRequest)) as DefaultExtractorResult;

			this.emitExtractProgress(wallPaperRequest, 'extracted', thumbnail.siteUrl);

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
			currentPage: Number(metadata.baseUrl.split('=').pop() ?? '1'),
			thumbnails
		};
	}
}
