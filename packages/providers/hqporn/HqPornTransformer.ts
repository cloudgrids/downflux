import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { HqPornExecArgs, HqPornOutput, HqPornVideoOutput } from './HqPornContracts';
import { HqPornMethods } from './HqPornTypes';

export class HqPornTransformer extends BaseTransformer<HqPornExecArgs, HqPornVideoOutput | DefaultExecutionResult> {
	public async transform(url: string, request?: HqPornExecArgs): Promise<DefaultExecutionResult | HqPornVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<HqPornOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case HqPornMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<HqPornOutput>>): HqPornOutput {
		const hqPornFields = metadata.customFields as HqPornOutput;
		return {
			title: hqPornFields?.title,
			poster: hqPornFields?.poster,
			pageUrl: hqPornFields?.pageUrl,
			videos: hqPornFields?.videos,
			videoTags: hqPornFields?.videoTags || [],
			uploader: hqPornFields?.title?.split(':')?.[0]?.trim() || 'Unknown'
		};
	}
}
