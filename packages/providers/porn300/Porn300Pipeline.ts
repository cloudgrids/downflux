import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { ImageExtension, MediaType } from '@types';
import { Porn300ExecArgs, Porn300Output } from './Porn300Contracts';

export class Porn300Pipeline extends BasePipeline<Porn300ExecArgs, Porn300Output> {
	public override build(metadata: Porn300Output, request: Porn300ExecArgs): PipelineItem[] {
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
						...(item.extension && { extension: item.extension }),
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

	protected override buildIdentifier(ctx: IdentifierContext<Porn300Output>): string {
		const { mediaType, id } = ctx;
		const prefix = 'Porn300';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;

			case MediaType.VIDEO_POSTER:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${MediaType.VIDEO_POSTER}`;
				break;

			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, mediaSegment);
	}

	protected override extract(request: Porn300ExecArgs, metadata: Porn300Output): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();

		if (metadata?.poster) {
			urls.add({
				url: metadata.poster,
				mediaType: MediaType.VIDEO_POSTER,
				id: request.entryUrl.split('/').filter(Boolean).pop(),
				extension: metadata.poster.split('/').pop()?.split('.').pop() as ImageExtension
			});
		}

		if (metadata?.videoUrl) {
			urls.add({
				url: metadata.videoUrl,
				mediaType: MediaType.VIDEOS,
				id: request.entryUrl.split('/').filter(Boolean).pop()
			});
		}

		return Array.from(urls);
	}
}
