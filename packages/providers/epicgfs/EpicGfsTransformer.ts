import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { EpicGfsExecArgs, EpicGfsOutput, EpicGfsVideoOutput } from './EpicGfsContracts';
import { EpicGfsMethods } from './EpicGfsTypes';

type EpicGfsTransformedOutput = DefaultExecutionResult<Partial<EpicGfsOutput>>;

export class EpicGfsTransformer extends BaseTransformer<EpicGfsExecArgs, DefaultExecutionResult | EpicGfsVideoOutput> {
	public async transform(url: string, request?: EpicGfsExecArgs): Promise<DefaultExecutionResult | EpicGfsVideoOutput> {
		const metadata = (await super.transform(url, request)) as EpicGfsTransformedOutput;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case EpicGfsMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: EpicGfsTransformedOutput): EpicGfsVideoOutput {
		const epicGfsMetadata = metadata.customFields as EpicGfsOutput;

		return {
			tags: metadata?.keywords,
			title: metadata?.title,
			description: metadata?.description,
			pageUrl: epicGfsMetadata?.pageUrl,
			poster: epicGfsMetadata?.poster,
			videos: epicGfsMetadata?.videos,
			videoId: epicGfsMetadata?.videoId,
			uploader: epicGfsMetadata?.uploader,
			previews: epicGfsMetadata?.previews,
			timelineScreenCount: epicGfsMetadata?.timelineScreenCount,
			timelineScreens: epicGfsMetadata?.timelineScreens
		};
	}
}
