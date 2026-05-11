import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { PornsOkExecArgs, PornsOkOutput, PornsOkVideoOutput } from './PornsOkContracts';
import { PornsOkMethods } from './PornsOkTypes';

export class PornsOkTransformer extends BaseTransformer<PornsOkExecArgs, DefaultExecutionResult | PornsOkVideoOutput> {
	public async transform(url: string, request?: PornsOkExecArgs): Promise<DefaultExecutionResult | PornsOkVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<PornsOkOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case PornsOkMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	public toVideoOutput(metadata: DefaultExecutionResult<Partial<PornsOkOutput>>): PornsOkVideoOutput {
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
