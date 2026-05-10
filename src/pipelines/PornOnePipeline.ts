import { IdentifierContext, PipelineExtractedItem, PipelineItem, PornOneExecArgs, PornOneOutput } from '@app/contracts';
import { MediaType } from '@app/shared';
import { DefaultPipeline } from './DefaultPipeline';

export class PornOnePipeline extends DefaultPipeline<PornOneExecArgs, PornOneOutput> {
	public override build(metadata: PornOneOutput, request: PornOneExecArgs): PipelineItem[] {
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

	protected override buildIdentifier(ctx: IdentifierContext<PornOneOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'PornOne';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;

			case MediaType.VIDEO_POSTER:
				mediaSegment = `${MediaType.VIDEOS}/${id}${mediaType}`;
				break;

			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.uploader || 'unknown'), mediaSegment);
	}

	protected override extract(request: PornOneExecArgs, metadata: PornOneOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();
		const videoId = request.entryUrl.split('/').filter(Boolean).pop() ?? 'unknown';

		if (metadata?.poster) {
			urls.add({
				url: metadata.poster,
				mediaType: MediaType.VIDEO_POSTER,
				id: videoId
			});
		}

		if (metadata?.videoUrl) {
			urls.add({
				url: metadata.videoUrl,
				id: videoId,
				mediaType: MediaType.VIDEOS
			});
		}

		return Array.from(urls);
	}
}
