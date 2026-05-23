import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { NewgroundsExecArgs, NewgroundsOutput } from './NewgroundsContracts';

export class NewgroundsPipeline extends BasePipeline<NewgroundsExecArgs, NewgroundsOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<NewgroundsOutput>): string {
		const { mediaType, id } = ctx;
		const prefix = 'Newgrounds';
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
