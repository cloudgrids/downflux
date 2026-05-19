import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { ZbPornExecArgs, ZbPornOutput, ZbPornVideoOutput } from './ZbPornContracts';
import { ZbPornMethods } from './ZbPornTypes';

type ZbPornTransformedOutput = DefaultExecutionResult<Partial<ZbPornOutput>>;

export class ZbPornTransformer extends BaseTransformer<ZbPornExecArgs, DefaultExecutionResult | ZbPornVideoOutput> {
	public async transform(url: string, request?: ZbPornExecArgs): Promise<DefaultExecutionResult | ZbPornVideoOutput> {
		const metadata = (await super.transform(url, request)) as ZbPornTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case ZbPornMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: ZbPornTransformedOutput): ZbPornVideoOutput {
		const zbPornMetadata = metadata.customFields as ZbPornOutput;

		return {
			tags: metadata?.keywords,
			title: metadata?.title,
			description: metadata?.description,
			pageUrl: zbPornMetadata?.pageUrl,
			poster: zbPornMetadata?.poster,
			videos: zbPornMetadata?.videos,
			videoId: zbPornMetadata?.videoId,
			previews: zbPornMetadata?.previews,
			timelineScreenCount: zbPornMetadata?.timelineScreenCount,
			timelineScreens: zbPornMetadata?.timelineScreens,
			uploader: zbPornMetadata?.uploader,
			starred: zbPornMetadata?.starred
		};
	}
}
