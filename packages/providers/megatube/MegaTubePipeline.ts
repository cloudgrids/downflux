import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { MegaTubeExecArgs, MegaTubeOutput } from './MegaTubeContracts';

export class MegaTubePipeline extends BasePipeline<MegaTubeExecArgs, MegaTubeOutput> {
	public override build(metadata: MegaTubeOutput, request: MegaTubeExecArgs): PipelineItem[] {
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

	protected override buildIdentifier(ctx: IdentifierContext<MegaTubeOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'MegaTube';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;

			case MediaType.VIDEO_POSTER:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${mediaType}`;
				break;

			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.uploader), mediaSegment);
	}

	protected override extract(request: MegaTubeExecArgs, metadata: MegaTubeOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();

		if (metadata?.videos?.mp4?.length) {
			this.filterByQuality(metadata.videos.mp4, {
				allowedQuality: request.allowedVideoQuality,
				getQuality: (video) => video.quality
			}).forEach((video) => {
				urls.add({
					url: video.url,
					id: metadata.videoId,
					mediaType: MediaType.VIDEOS
				});
			});
		}

		if (metadata?.videos?.hls?.length) {
			this.filterByQuality(metadata.videos?.hls, {
				allowedQuality: request.allowedVideoQuality,
				getQuality: (video) => video.quality
			}).forEach((video) => {
				urls.add({
					url: video.url,
					mediaType: MediaType.VIDEOS,
					id: metadata.videoId
				});
			});
		}

		if (metadata?.poster) {
			urls.add({
				url: metadata.poster,
				id: metadata.videoId,
				mediaType: MediaType.VIDEO_POSTER
			});
		}

		return Array.from(urls);
	}
}
