import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { ImgurExecArgs, ImgurOutput } from './ImgurContracts';

export class ImgurPipeline extends BasePipeline<ImgurExecArgs, ImgurOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<ImgurOutput>): string {
		const { mediaType, id } = ctx;
		const prefix = 'Imgur';
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
