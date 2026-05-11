import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { SexVidExecArgs, SexVidOutput } from './SexVidContracts';

export class SexVidPipeline extends BasePipeline<SexVidExecArgs, SexVidOutput> {
	public override build(metadata: SexVidOutput, request: SexVidExecArgs): PipelineItem[] {
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

	protected override buildIdentifier(ctx: IdentifierContext<SexVidOutput>): string {
		const { mediaType, id } = ctx;
		const prefix = 'SexVid';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;
			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer('// implementation needs here'), mediaSegment);
	}

	protected override extract(request: SexVidExecArgs, metadata: SexVidOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();

		return Array.from(urls);
	}
}
