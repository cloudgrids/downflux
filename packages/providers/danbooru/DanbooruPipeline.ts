import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { DanbooruExecArgs, DanbooruOutput } from './DanbooruContracts';

export class DanbooruPipeline extends BasePipeline<DanbooruExecArgs, DanbooruOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<DanbooruOutput>): string {
		const { mediaType, id } = ctx;
		const prefix = 'Danbooru';
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
