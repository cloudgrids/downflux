import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { SxyPornExecArgs, SxyPornOutput, SxyPornVideoOutput } from './SxyPornContracts';
import { SxyPornMethods } from './SxyPornTypes';

export class SxyPornTransformer extends BaseTransformer<SxyPornExecArgs, DefaultExecutionResult | SxyPornVideoOutput> {
	public async transform(url: string, request?: SxyPornExecArgs): Promise<DefaultExecutionResult | SxyPornVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<SxyPornOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case SxyPornMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<SxyPornOutput>>): SxyPornVideoOutput {
		const sxyPornFields = metadata.customFields as SxyPornOutput;

		return {
			uploader: sxyPornFields.uploader,
			pageUrl: sxyPornFields.pageUrl,
			description: sxyPornFields.description,
			poster: sxyPornFields.poster,
			title: sxyPornFields.title,
			tags: metadata.keywords,
			videoUrl: sxyPornFields.videoUrl
		};
	}
}
