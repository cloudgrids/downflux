import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { BlueskyExecArgs, BlueskyOutput } from './BlueskyContracts';

export class BlueskyPipeline extends BasePipeline<BlueskyExecArgs, BlueskyOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<BlueskyOutput>): string {
		const { mediaType, id } = ctx;
		const prefix = 'Bluesky';
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
