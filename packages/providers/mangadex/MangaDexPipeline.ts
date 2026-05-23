import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { MangaDexExecArgs, MangaDexOutput } from './MangaDexContracts';

export class MangaDexPipeline extends BasePipeline<MangaDexExecArgs, MangaDexOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<MangaDexOutput>): string {
		const { mediaType, id } = ctx;
		const prefix = 'MangaDex';
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
