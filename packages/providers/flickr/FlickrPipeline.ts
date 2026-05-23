import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { FlickrExecArgs, FlickrOutput } from './FlickrContracts';

export class FlickrPipeline extends BasePipeline<FlickrExecArgs, FlickrOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<FlickrOutput>): string {
		const { mediaType, id } = ctx;
		const prefix = 'Flickr';
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
