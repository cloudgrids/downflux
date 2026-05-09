import { DefaultExtractorResult, HqPornExecArgs, HqPornOutput, HqPornVideoOutput } from '@app/contracts';
import { HqPornMethods } from '@app/shared';
import { DefaultTransformer } from './DefaultTransformer';

export class HqPornTransformer extends DefaultTransformer<HqPornExecArgs, HqPornVideoOutput | DefaultExtractorResult> {
	public async transform(url: string, request?: HqPornExecArgs): Promise<DefaultExtractorResult | HqPornVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExtractorResult<Partial<HqPornOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case HqPornMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExtractorResult<Partial<HqPornOutput>>): HqPornOutput {
		const hqPornFields = metadata.customFields as HqPornOutput;
		return {
			title: hqPornFields.title || '',
			poster: hqPornFields.poster || '',
			pageUrl: hqPornFields.pageUrl || '',
			videoUrl: hqPornFields.videoUrl || '',
			videoTags: hqPornFields.videoTags || [],
			uploader: hqPornFields?.title?.split('-')?.[0]?.trim() || 'Unknown'
		};
	}
}
