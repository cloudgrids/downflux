import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { MomVidsExecArgs, MomVidsOutput, MomVidsVideoOutput } from './MomVidsContracts';
import { MomVidsMethods } from './MomVidsTypes';

type MomVidsTransformedOutput = DefaultExecutionResult<Partial<MomVidsOutput>>;

/**
 * Normalizes parsed MomVids metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class MomVidsTransformer extends BaseTransformer<MomVidsExecArgs, DefaultExecutionResult | MomVidsVideoOutput> {
	public async transform(url: string, request?: MomVidsExecArgs): Promise<DefaultExecutionResult | MomVidsVideoOutput> {
		const metadata = (await super.transform(url, request)) as MomVidsTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case MomVidsMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: MomVidsTransformedOutput): MomVidsVideoOutput {
		const momVidsMetadata = metadata.customFields as MomVidsOutput;

		return {
			tags: metadata?.keywords,
			title: metadata?.title,
			description: metadata?.description,
			pageUrl: momVidsMetadata?.pageUrl,
			poster: momVidsMetadata?.poster,
			videos: momVidsMetadata?.videos,
			videoId: momVidsMetadata?.videoId,
			previews: momVidsMetadata?.previews,
			timelineScreenCount: momVidsMetadata?.timelineScreenCount,
			timelineScreens: momVidsMetadata?.timelineScreens,
			uploader: momVidsMetadata?.uploader,
			starred: momVidsMetadata?.starred
		};
	}
}
