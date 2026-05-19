import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem } from '@contracts';
import { MediaType } from '@types';
import { EPornerExecArgs, EPornerOutput } from './EPornerContracts';

/**
 * Builds downloadable EPorner pipeline items from normalized metadata.
 *
 * @remarks
 * Pipelines decide which media URLs become work items and how those items are identified on disk.
 */
export class EPornerPipeline extends BasePipeline<EPornerExecArgs, EPornerOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<EPornerOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'EPorner';
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

	protected override extract(request: EPornerExecArgs, metadata: EPornerOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();

		if (metadata?.videos?.mp4?.length) {
			this.filterByQuality(metadata?.videos?.mp4, {
				allowedQuality: request.allowedVideoQuality,
				getQuality: (video) => video.quality
			})?.forEach((video) => {
				urls.add({
					url: video.url,
					mediaType: MediaType.VIDEOS,
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
				url: metadata.poster,
				mediaType: MediaType.VIDEO_POSTER,
				id: metadata.videoId
			});
		}

		return Array.from(urls);
	}
}
