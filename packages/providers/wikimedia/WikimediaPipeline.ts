import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { WikimediaExecArgs, WikimediaOutput } from './WikimediaContracts';

export class WikimediaPipeline extends BasePipeline<WikimediaExecArgs, WikimediaOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<WikimediaOutput>): string {
		const { mediaType, id } = ctx;
		const prefix = 'Wikimedia';
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
