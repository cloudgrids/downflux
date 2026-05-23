import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { ArtStationExecArgs, ArtStationOutput } from './ArtStationContracts';

export class ArtStationPipeline extends BasePipeline<ArtStationExecArgs, ArtStationOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<ArtStationOutput>): string {
		const { mediaType, id } = ctx;
		const prefix = 'ArtStation';
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
