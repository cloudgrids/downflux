import { DefaultExtractorResult, PornsOkExecArgs, PornsOkOutput, PornsOkVideoOutput } from '@app/contracts';
import { PornsOkMethods } from '@app/shared';
import { DefaultTransformer } from './DefaultTransformer';

export class PornsOkTransformer extends DefaultTransformer<PornsOkExecArgs, DefaultExtractorResult | PornsOkVideoOutput> {
	public async transform(url: string, request?: PornsOkExecArgs): Promise<DefaultExtractorResult | PornsOkVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExtractorResult<Partial<PornsOkOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case PornsOkMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	public toVideoOutput(metadata: DefaultExtractorResult<Partial<PornsOkOutput>>): PornsOkVideoOutput {
		const pornsOkFields = metadata.customFields as PornsOkOutput;

		return {
			title: pornsOkFields.title,
			poster: pornsOkFields.poster,
			duration: pornsOkFields.duration,
			pageUrl: pornsOkFields.pageUrl,
			uploadedAt: pornsOkFields.uploadedAt,
			totalViews: pornsOkFields.totalViews,
			type: pornsOkFields.type,
			videoUrl: pornsOkFields.videoUrl,
			starredBy: pornsOkFields.starredBy,
			categories: pornsOkFields.categories
		};
	}
}
