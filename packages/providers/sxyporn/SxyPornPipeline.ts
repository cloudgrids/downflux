import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { SxyPornExecArgs, SxyPornOutput } from './SxyPornContracts';

export class SxyPornPipeline extends BasePipeline<SxyPornExecArgs, SxyPornOutput> {
	public override build(metadata: SxyPornOutput, request: SxyPornExecArgs): PipelineItem[] {
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

	protected override buildIdentifier(ctx: IdentifierContext<SxyPornOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'SxyPorn';
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

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata?.uploader || 'sxyporn_uploader'), mediaSegment);
	}

	protected override extract(request: SxyPornExecArgs, metadata: SxyPornOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();
		const videoId = request.entryUrl.match(/\/post\/([^.html]+)/i)?.[1];

		if (metadata?.videoUrl) {
			urls.add({
				mediaType: MediaType.VIDEOS,
				url: metadata.videoUrl,
				id: videoId
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
