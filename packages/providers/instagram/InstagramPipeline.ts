import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { InstagramExecArgs, InstagramOutput } from './InstagramContracts';

export class InstagramPipeline extends BasePipeline<InstagramExecArgs, InstagramOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<InstagramOutput>): string {
		const { mediaType, id } = ctx;
		const prefix = 'Instagram';
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
