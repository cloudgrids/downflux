import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { TnAFlixExecArgs, TnAFlixOutput } from './TnAFlixContracts';

export class TnAFlixPipeline extends BasePipeline<TnAFlixExecArgs, TnAFlixOutput> {
	public override build(metadata: TnAFlixOutput, request: TnAFlixExecArgs): PipelineItem[] {
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

	protected override buildIdentifier(ctx: IdentifierContext<TnAFlixOutput>): string {
		const { mediaType, metadata } = ctx;
		const prefix = 'tnaflix';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${metadata.videoId}`;
				break;

			case MediaType.VIDEO_POSTER:
				mediaSegment = `${MediaType.VIDEOS}/${metadata?.videoId}/${mediaType}`;
				break;

			default:
				mediaSegment = 'misc';
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.uploader), mediaSegment);
	}

	protected override extract(request: TnAFlixExecArgs, metadata: TnAFlixOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();

		if (metadata?.videos?.mp4?.length) {
			this.filterByQuality(metadata.videos.mp4, {
				allowedQuality: request.allowedVideoQuality,
				getQuality: (item) => item.quality
			}).forEach((video) => {
				urls.add({
					mediaType: MediaType.VIDEOS,
					url: video.url,
					id: metadata.videoId
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
				mediaType: MediaType.VIDEO_POSTER,
				url: metadata.poster,
				id: metadata.videoId
			});
		}

		return Array.from(urls);
	}
}
