import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { HqPornExecArgs, HqPornOutput } from './HqPornContracts';

export class HqPornPipeline extends BasePipeline<HqPornExecArgs, HqPornOutput> {
	public override build(metadata: HqPornOutput, request: HqPornExecArgs): PipelineItem[] {
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

	protected override buildIdentifier(ctx: IdentifierContext<HqPornOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'HqPorn';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;
			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.uploader), mediaSegment);
	}

	protected override extract(request: HqPornExecArgs, metadata: HqPornOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();
		const videoId = this.pathBuilder.spaceNormalizer(metadata.title.match(/:\s([^HD]+)\s/i)?.[1] || metadata.title);

		if (metadata?.videos?.length) {
			this.filterByQuality(metadata.videos, {
				allowedQuality: request.allowedVideoQuality,
				getQuality: (video) => video.quality
			}).forEach((video) => {
				urls.add({
					url: video.url,
					mediaType: MediaType.VIDEOS,
					id: videoId
				});
			});
		}

		if (metadata?.poster) {
			urls.add({
				url: metadata.poster,
				mediaType: MediaType.VIDEO_POSTER,
				id: videoId
			});
		}

		return Array.from(urls);
	}
}
