import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { InterracialExecArgs, InterracialOutput, InterracialVideoOutput } from './InterracialContracts';
import { InterracialMethods } from './InterracialTypes';

type InterracialTransformedOutput = DefaultExecutionResult<Partial<InterracialOutput>>;

/**
 * Normalizes parsed Interracial metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class InterracialTransformer extends BaseTransformer<InterracialExecArgs, DefaultExecutionResult | InterracialVideoOutput> {
	public async transform(url: string, request?: InterracialExecArgs): Promise<DefaultExecutionResult | InterracialVideoOutput> {
		const metadata = (await super.transform(url, request)) as InterracialTransformedOutput;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case InterracialMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: InterracialTransformedOutput): InterracialVideoOutput {
		const interracialMetadata = metadata.customFields as InterracialOutput;

		return {
			tags: metadata?.keywords,
			title: metadata?.title,
			description: metadata?.description,
			pageUrl: interracialMetadata?.pageUrl,
			poster: interracialMetadata?.poster,
			videos: interracialMetadata?.videos,
			videoId: interracialMetadata?.videoId,
			previews: interracialMetadata?.previews,
			timelineScreenCount: interracialMetadata?.timelineScreenCount,
			timelineScreens: interracialMetadata?.timelineScreens,
			uploader: interracialMetadata?.uploader,
			starred: interracialMetadata?.starred
		};
	}
}
