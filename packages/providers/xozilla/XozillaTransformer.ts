import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { XozillaExecArgs, XozillaOutput, XozillaVideoOutput } from './XozillaContracts';
import { XozillaMethods } from './XozillaTypes';

type XozillaTransformedOutput = DefaultExecutionResult<Partial<XozillaOutput>>;

/**
 * Normalizes parsed Xozilla metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class XozillaTransformer extends BaseTransformer<XozillaExecArgs, DefaultExecutionResult | XozillaVideoOutput> {
	public async transform(url: string, request?: XozillaExecArgs): Promise<DefaultExecutionResult | XozillaVideoOutput> {
		const metadata = (await super.transform(url, request)) as XozillaTransformedOutput;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case XozillaMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: XozillaTransformedOutput): XozillaVideoOutput {
		const xozillaMetadata = metadata.customFields as XozillaOutput;

		return {
			tags: metadata?.keywords,
			title: metadata?.title,
			description: metadata?.description,
			pageUrl: xozillaMetadata?.pageUrl,
			poster: xozillaMetadata?.poster,
			videos: xozillaMetadata?.videos,
			videoId: xozillaMetadata?.videoId,
			previews: xozillaMetadata?.previews,
			timelineScreenCount: xozillaMetadata?.timelineScreenCount,
			timelineScreens: xozillaMetadata?.timelineScreens,
			uploader: xozillaMetadata?.uploader,
			starred: xozillaMetadata?.starred
		};
	}
}
