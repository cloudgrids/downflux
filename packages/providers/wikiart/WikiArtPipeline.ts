import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { WikiArtExecArgs, WikiArtOutput } from './WikiArtContracts';

export class WikiArtPipeline extends BasePipeline<WikiArtExecArgs, WikiArtOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<WikiArtOutput>): string {
		const { mediaType, id } = ctx;
		const prefix = 'WikiArt';
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
