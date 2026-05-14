import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { MegaTubeExecArgs, MegaTubeOutput, MegaTubeVideoOutput } from './MegaTubeContracts';
import { MegaTubeMethods } from './MegaTubeTypes';

export class MegaTubeTransformer extends BaseTransformer<MegaTubeExecArgs, DefaultExecutionResult | MegaTubeVideoOutput> {
	public async transform(url: string, request?: MegaTubeExecArgs): Promise<DefaultExecutionResult | MegaTubeVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<MegaTubeOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case MegaTubeMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<MegaTubeOutput>>): MegaTubeVideoOutput {
		const megaTubeFields = metadata.customFields as MegaTubeOutput;
		return {
			pageUrl: megaTubeFields.pageUrl,
			videos: megaTubeFields.videos,
			poster: megaTubeFields.poster,
			videoId: megaTubeFields.videoId,
			description: metadata.description,
			tags: metadata.keywords,
			title: metadata.title,
			uploader: megaTubeFields.uploader
		};
	}
}
