import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { PixivExecArgs, PixivOutput } from './PixivContracts';

export class PixivPipeline extends BasePipeline<PixivExecArgs, PixivOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<PixivOutput>): string {
		const { mediaType, id } = ctx;
		const prefix = 'Pixiv';
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
