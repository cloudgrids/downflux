import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { RedditExecArgs, RedditOutput } from './RedditContracts';

export class RedditPipeline extends BasePipeline<RedditExecArgs, RedditOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<RedditOutput>): string {
		const { mediaType, id } = ctx;
		const prefix = 'Reddit';
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
