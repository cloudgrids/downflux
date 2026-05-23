import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { TwitterExecArgs, TwitterOutput } from './TwitterContracts';

export class TwitterPipeline extends BasePipeline<TwitterExecArgs, TwitterOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<TwitterOutput>): string {
		const { mediaType, id } = ctx;
		const prefix = 'Twitter';
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
