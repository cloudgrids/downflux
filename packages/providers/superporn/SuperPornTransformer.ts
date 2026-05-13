import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { SuperPornExecArgs, SuperPornOutput, SuperPornVideoOutput } from './SuperPornContracts';
import { SuperPornMethods } from './SuperPornTypes';

export class SuperPornTransformer extends BaseTransformer<SuperPornExecArgs, DefaultExecutionResult | SuperPornVideoOutput> {
	public async transform(url: string, request?: SuperPornExecArgs): Promise<DefaultExecutionResult | SuperPornVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<SuperPornOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case SuperPornMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<SuperPornOutput>>): SuperPornVideoOutput {
		const superPornFields = metadata.customFields as SuperPornOutput;
		return {
			pageUrl: superPornFields.pageUrl,
			tags: superPornFields?.tags,
			uploader: superPornFields?.uploader,
			videoUrl: metadata.sources?.find((src) => /^https:\/\/cdnst(?:\d+)\.superporn\.com\/.*/i.test(src)) as string,
			poster: superPornFields?.poster,
			title: metadata.title,
			description: metadata.description
		};
	}
}
