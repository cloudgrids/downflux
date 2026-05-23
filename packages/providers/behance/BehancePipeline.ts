import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { BehanceExecArgs, BehanceOutput } from './BehanceContracts';

export class BehancePipeline extends BasePipeline<BehanceExecArgs, BehanceOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<BehanceOutput>): string {
		const { mediaType, id } = ctx;
		const prefix = 'Behance';
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
