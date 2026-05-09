import { IdentifierContext, PipelineExtractedItem, PipelineItem, XHamsterExecArgs, XHamsterOutput } from '@app/contracts';
import { MediaType, VideoQuality } from '@app/shared';
import { BasePipeline } from './BasePipeline';

export class XHamsterPipeline extends BasePipeline<XHamsterExecArgs, XHamsterOutput> {
	public override build(metadata: XHamsterOutput, request: XHamsterExecArgs): PipelineItem[] {
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

	protected override buildIdentifier(ctx: IdentifierContext<XHamsterOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'xhamster';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;
			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.username), mediaSegment);
	}

	protected override extract(request: XHamsterExecArgs, metadata: XHamsterOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();

		if (metadata?.thumbnailUrl) {
			urls.add({
				mediaType: MediaType.VIDEO_POSTER,
				url: metadata.thumbnailUrl,
				username: metadata.username,
				id: this.pathBuilder.spaceNormalizer(metadata.title)
			});
		}

		if (metadata?.defaultVideoUrl || metadata.masterPlaylistUrl) {
			urls.add({
				mediaType: MediaType.VIDEOS,
				url: request.allowedVideoQuality === VideoQuality.Q480 ? metadata.defaultVideoUrl : metadata.masterPlaylistUrl,
				username: metadata.username,
				id: this.pathBuilder.spaceNormalizer(metadata.title)
			});
		}

		return Array.from(urls);
	}
}
