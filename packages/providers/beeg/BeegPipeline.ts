import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { BeegExecArgs, BeegOutput } from './BeegContracts';

export class BeegPipeline extends BasePipeline<BeegExecArgs, BeegOutput> {
	public override build(metadata: BeegOutput, request: BeegExecArgs): PipelineItem[] {
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
							id: item.id,
							secondaryId: item.secondaryId
						})
					}
				}))
			)
		);
	}

	protected override buildIdentifier(ctx: IdentifierContext<BeegOutput>): string {
		const { mediaType, id, secondaryId } = ctx;
		const prefix = 'Beeg';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${secondaryId}`;
				break;
			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, mediaSegment);
	}

	protected override extract(request: BeegExecArgs, metadata: BeegOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();

		if (metadata?.videos?.mp4?.length) {
			this.filterByQuality(metadata.videos.mp4, {
				allowedQuality: request.allowedVideoQuality,
				getQuality: (item) => item?.quality
			}).forEach((video) => {
				urls.add({
					id: metadata.videoId,
					secondaryId: video?.quality?.toString(),
					url: video?.url,
					mediaType: MediaType.VIDEOS
				});
			});
		}

		if (metadata?.videos?.hls?.length) {
			this.filterByQuality(metadata.videos.hls, {
				allowedQuality: request.allowedVideoQuality,
				getQuality: (item) => item?.quality
			}).forEach((video) => {
				urls.add({
					id: metadata.videoId,
					secondaryId: video?.quality?.toString(),
					url: video?.url,
					mediaType: MediaType.VIDEOS
				});
			});
		}

		return Array.from(urls);
	}
}
