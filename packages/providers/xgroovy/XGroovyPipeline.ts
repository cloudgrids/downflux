import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { XGroovyExecArgs, XGroovyOutput } from './XGroovyContracts';

export class XGroovyPipeline extends BasePipeline<XGroovyExecArgs, XGroovyOutput> {
	public override build(metadata: XGroovyOutput, request: XGroovyExecArgs): PipelineItem[] {
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

	protected override buildIdentifier(ctx: IdentifierContext<XGroovyOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'XGroovy';
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

		return this.pathBuilder.join(
			prefix,
			this.pathBuilder.spaceNormalizer(metadata.uploaderId?.split('/')?.pop() || 'xgroovy_uploader'),
			mediaSegment
		);
	}

	protected override extract(request: XGroovyExecArgs, metadata: XGroovyOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();

		const videoId = this.pathBuilder.spaceNormalizer(metadata.title);

		if (metadata?.videos?.mp4?.length) {
			this.filterByQuality(metadata.videos.mp4, {
				allowedQuality: request.allowedVideoQuality,
				getQuality: (item) => item.quality
			}).forEach((video) => {
				urls.add({
					mediaType: MediaType.VIDEOS,
					url: video.url,
					id: videoId
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
					id: videoId
				});
			});
		}

		if (metadata?.poster) {
			urls.add({
				mediaType: MediaType.VIDEO_POSTER,
				url: metadata.poster,
				id: videoId
			});
		}

		return Array.from(urls);
	}
}
