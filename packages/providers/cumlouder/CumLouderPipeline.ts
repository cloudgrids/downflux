import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { CumLouderExecArgs, CumLouderOutput } from './CumLouderContracts';

export class CumLouderPipeline extends BasePipeline<CumLouderExecArgs, CumLouderOutput> {
	public override build(metadata: CumLouderOutput, request: CumLouderExecArgs): PipelineItem[] {
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

	protected override buildIdentifier(ctx: IdentifierContext<CumLouderOutput>): string {
		const { mediaType, id } = ctx;
		const prefix = 'CumLouder';
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

		return this.pathBuilder.join(prefix, mediaSegment);
	}

	protected override extract(request: CumLouderExecArgs, metadata: CumLouderOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();
		const videoId = this.pathBuilder.spaceNormalizer(
			request.entryUrl.match(/porn-video\/([^./]+)/i)?.[1] || (metadata.pageUrl.split('/').filter(Boolean).pop() as string)
		);

		if (metadata?.poster) {
			urls.add({
				url: metadata.poster,
				mediaType: MediaType.VIDEO_POSTER,
				id: videoId
			});
		}

		if (metadata?.videos?.mp4?.length) {
			this.filterByQuality(metadata.videos?.mp4, {
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

		return Array.from(urls);
	}
}
