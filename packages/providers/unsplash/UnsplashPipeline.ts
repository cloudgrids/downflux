import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { UnsplashExecArgs, UnsplashOutput } from './UnsplashContracts';

export class UnsplashPipeline extends BasePipeline<UnsplashExecArgs, UnsplashOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<UnsplashOutput>): string {
		const { mediaType, id } = ctx;
		const prefix = 'Unsplash';
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
