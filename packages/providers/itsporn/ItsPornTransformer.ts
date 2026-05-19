import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { ItsPornExecArgs, ItsPornOutput, ItsPornVideoOutput } from './ItsPornContracts';
import { ItsPornMethods } from './ItsPornTypes';

type ItsPornTransformedOutput = DefaultExecutionResult<Partial<ItsPornOutput>>;

export class ItsPornTransformer extends BaseTransformer<ItsPornExecArgs, DefaultExecutionResult | ItsPornVideoOutput> {
	public async transform(url: string, request?: ItsPornExecArgs): Promise<DefaultExecutionResult | ItsPornVideoOutput> {
		const metadata = (await super.transform(url, request)) as ItsPornTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case ItsPornMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: ItsPornTransformedOutput): ItsPornVideoOutput {
		const itsPornMetadata = metadata.customFields as ItsPornOutput;

		return {
			tags: metadata?.keywords,
			title: metadata?.title,
			description: metadata?.description,
			pageUrl: itsPornMetadata?.pageUrl,
			poster: itsPornMetadata?.poster,
			videos: itsPornMetadata?.videos,
			videoId: itsPornMetadata?.videoId,
			previews: itsPornMetadata?.previews,
			timelineScreenCount: itsPornMetadata?.timelineScreenCount,
			timelineScreens: itsPornMetadata?.timelineScreens,
			uploader: itsPornMetadata?.uploader,
			starred: itsPornMetadata?.starred
		};
	}
}
