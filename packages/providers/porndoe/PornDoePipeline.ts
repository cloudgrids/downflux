import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { PornDoeExecArgs, PornDoeOutput } from './PornDoeContracts';

export class PornDoePipeline extends BasePipeline<PornDoeExecArgs, PornDoeOutput> {
	public override build(metadata: PornDoeOutput, request: PornDoeExecArgs): PipelineItem[] {
		return this.uniquePipelines(
			this.sliceByMaxDownloads(
				request,
				this.filterByExt(
					request,
					this.extract(request, metadata).map((item) => ({
						downloadUrl: item.url,
						sourceUrl: request.entryUrl,
						provider: request.provider,
						identifier: {
							mediaType: item.mediaType,
							...this.fileManager.detectResourceType(item.url, request),
							key: this.buildIdentifier({
								mediaType: item.mediaType,
								metadata,
								url: item.url,
								id: item.id
							})
						}
					}))
				)
			)
		);
	}

	protected override buildIdentifier(ctx: IdentifierContext<PornDoeOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'PornDoe';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;

			case MediaType.VIDEO_POSTER:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${mediaType}`;
				break;

			case MediaType.VIDEO_PREVIEW:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${mediaType}`;
				break;

			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.uploader), mediaSegment);
	}

	protected override extract(request: PornDoeExecArgs, metadata: PornDoeOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();
		const videoId = this.pathBuilder.spaceNormalizer(request.entryUrl.split('/').filter(Boolean).pop() as string);

		if (metadata?.poster) {
			urls.add({
				url: metadata.poster,
				mediaType: MediaType.VIDEO_POSTER,
				id: videoId
			});
		}

		if (metadata?.preview) {
			urls.add({
				url: metadata.preview,
				mediaType: MediaType.VIDEO_PREVIEW,
				id: videoId
			});
		}

		if (metadata?.videos?.mp4?.length) {
			this.filterByQuality(metadata.videos.mp4, {
				allowedQuality: request.allowedVideoQuality,
				getQuality: (item) => item.quality
			}).forEach((video) =>
				urls.add({
					url: video.url,
					mediaType: MediaType.VIDEOS,
					id: videoId
				})
			);
		}

		if (metadata?.videos?.hls?.length) {
			this.filterByQuality(metadata.videos.hls, {
				allowedQuality: request.allowedVideoQuality,
				getQuality: (item) => item.quality
			}).forEach((video) =>
				urls.add({
					url: video.url,
					mediaType: MediaType.VIDEOS,
					id: videoId
				})
			);
		}

		return Array.from(urls);
	}
}
