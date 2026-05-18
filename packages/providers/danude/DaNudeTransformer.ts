import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { DaNudeExecArgs, DaNudeOutput, DaNudeVideoOutput } from './DaNudeContracts';
import { DaNudeMethods } from './DaNudeTypes';

type DaNudeTransformedOutput = DefaultExecutionResult<Partial<DaNudeOutput>>;

export class DaNudeTransformer extends BaseTransformer<DaNudeExecArgs, DefaultExecutionResult | DaNudeVideoOutput> {
	public async transform(url: string, request?: DaNudeExecArgs): Promise<DefaultExecutionResult | DaNudeVideoOutput> {
		const metadata = (await super.transform(url, request)) as DaNudeTransformedOutput;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case DaNudeMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DaNudeTransformedOutput): DaNudeVideoOutput {
		const daNudeMetadata = metadata.customFields as DaNudeOutput;

		return {
			tags: metadata?.keywords,
			title: metadata?.title,
			description: metadata?.description,
			pageUrl: daNudeMetadata?.pageUrl,
			poster: daNudeMetadata?.poster,
			videos: daNudeMetadata?.videos,
			videoId: daNudeMetadata?.videoId,
			previews: daNudeMetadata?.previews,
			timelineScreenCount: daNudeMetadata?.timelineScreenCount,
			timelineScreens: daNudeMetadata?.timelineScreens,
			uploader: daNudeMetadata?.uploader
		};
	}
}
