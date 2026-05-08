import { pathBuilder, spaceNormalizer } from '../helpers';
import { IdentifierContext, MediaType, PipelineExtractedItem, PipelineItem, VideoQuality, XHamsterExecArgs, XHamsterOutput } from '../util';
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
					service: request.service,
					identifier: {
						mediaType: item.mediaType,
						...this.fileService.detectResourceType(item.url, request),
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

		return pathBuilder(prefix, spaceNormalizer(metadata.username), mediaSegment);
	}

	protected override extract(request: XHamsterExecArgs, metadata: XHamsterOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();

		if (metadata?.thumbnailUrl) {
			urls.add({
				mediaType: MediaType.VIDEO_POSTER,
				url: metadata.thumbnailUrl,
				username: metadata.username,
				id: spaceNormalizer(metadata.title)
			});
		}

		if (metadata?.defaultVideoUrl || metadata.masterPlaylistUrl) {
			urls.add({
				mediaType: MediaType.VIDEOS,
				url: request.allowedVideoQuality === VideoQuality.Q480 ? metadata.defaultVideoUrl : metadata.masterPlaylistUrl,
				username: metadata.username,
				id: spaceNormalizer(metadata.title)
			});
		}

		return Array.from(urls);
	}
}
