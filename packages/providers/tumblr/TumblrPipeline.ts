import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { TumblrExecArgs, TumblrOutput } from './TumblrContracts';

export class TumblrPipeline extends BasePipeline<TumblrExecArgs, TumblrOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<TumblrOutput>): string {
		const { mediaType, id } = ctx;
		const prefix = 'Tumblr';
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
