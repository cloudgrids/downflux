import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { ShamelessExecArgs, ShamelessOutput } from './ShamelessContracts';

export class ShamelessPipeline extends BasePipeline<ShamelessExecArgs, ShamelessOutput> {
	public override build(metadata: ShamelessOutput, request: ShamelessExecArgs): PipelineItem[] {
		return this.sliceByMaxDownloads(
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
		);
	}

	protected override buildIdentifier(ctx: IdentifierContext<ShamelessOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'Shameless';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;

			case MediaType.VIDEO_POSTER:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${mediaType}`;
				break;

			case MediaType.VIDEO_PREVIEWS:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${mediaType}`;
				break;

			case MediaType.VIDEO_TIMELINES:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${mediaType}`;
				break;

			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.uploader), mediaSegment);
	}

	protected override extract(request: ShamelessExecArgs, metadata: ShamelessOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();

		if (metadata?.videos?.length) {
			this.filterByQuality(metadata.videos, {
				allowedQuality: request.allowedVideoQuality,
				getQuality: (item) => item.quality
			}).forEach((video) => {
				urls.add({
					url: video.url,
					mediaType: MediaType.VIDEOS,
					id: metadata.id
				});
			});
		}

		if (metadata?.timelineScreens?.length) {
			metadata?.timelineScreens.forEach((screenUrl) => {
				urls.add({
					mediaType: MediaType.VIDEO_TIMELINES,
					url: screenUrl,
					id: metadata.id
				});
			});
		}

		if (metadata?.poster) {
			urls.add({
				url: metadata.poster,
				mediaType: MediaType.VIDEO_POSTER,
				id: metadata.id
			});
		}

		if (metadata?.previews?.length) {
			metadata?.previews.forEach((previewUrl) => {
				urls.add({
					mediaType: MediaType.VIDEO_PREVIEWS,
					url: previewUrl,
					id: metadata.id
				});
			});
		}

		return Array.from(urls);
	}
}
