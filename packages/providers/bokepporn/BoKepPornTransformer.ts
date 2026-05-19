import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { BoKepPornExecArgs, BoKepPornOutput, BoKepPornVideoOutput } from './BoKepPornContracts';
import { BoKepPornMethods } from './BoKepPornTypes';

type BoKepPornTransformedOutput = DefaultExecutionResult<Partial<BoKepPornOutput>>;

/**
 * Normalizes parsed BoKepPorn metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class BoKepPornTransformer extends BaseTransformer<BoKepPornExecArgs, DefaultExecutionResult | BoKepPornVideoOutput> {
	public async transform(url: string, request?: BoKepPornExecArgs): Promise<DefaultExecutionResult | BoKepPornVideoOutput> {
		const metadata = (await super.transform(url, request)) as BoKepPornTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case BoKepPornMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: BoKepPornTransformedOutput): BoKepPornVideoOutput {
		const boKepPornMetadata = metadata.customFields as BoKepPornOutput;

		return {
			tags: metadata?.keywords,
			title: metadata?.title,
			description: metadata?.description,
			pageUrl: boKepPornMetadata?.pageUrl,
			poster: boKepPornMetadata?.poster,
			videos: boKepPornMetadata?.videos,
			videoId: boKepPornMetadata?.videoId,
			previews: boKepPornMetadata?.previews,
			timelineScreenCount: boKepPornMetadata?.timelineScreenCount,
			timelineScreens: boKepPornMetadata?.timelineScreens,
			uploader: boKepPornMetadata?.uploader,
			starred: boKepPornMetadata?.starred
		};
	}
}
