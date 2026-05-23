import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { MastodonExecArgs, MastodonOutput } from './MastodonContracts';

export class MastodonPipeline extends BasePipeline<MastodonExecArgs, MastodonOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<MastodonOutput>): string {
		const { mediaType, id } = ctx;
		const prefix = 'Mastodon';
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
