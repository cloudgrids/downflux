import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { PinterestExecArgs, PinterestOutput } from './PinterestContracts';

export class PinterestPipeline extends BasePipeline<PinterestExecArgs, PinterestOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<PinterestOutput>): string {
		const { mediaType, id } = ctx;
		const prefix = 'Pinterest';
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

	// override mapping method if needed
}
