import { DefaultExtractorResult, XVideosExecArgs, XVideosOutput, XVideosVideoOutput } from '@app/contracts';
import { XVideosMethods } from '@app/shared';
import { DefaultTransformer } from './DefaultTransformer';

export class XVideosTransformer extends DefaultTransformer<XVideosExecArgs, DefaultExtractorResult | XVideosVideoOutput> {
	public async transform(url: string, request?: XVideosExecArgs): Promise<DefaultExtractorResult | XVideosVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExtractorResult<Partial<XVideosOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case XVideosMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	public toVideoOutput(metadata: DefaultExtractorResult<Partial<XVideosOutput>>): XVideosVideoOutput {
		const xVideosFields = metadata.customFields as XVideosOutput;

		return {
			title: metadata.title,
			duration: xVideosFields.duration,
			description: xVideosFields.description,
			videoUrl: xVideosFields.videoUrl,
			keywords: xVideosFields.keywords,
			poster: xVideosFields.poster,
			uploader: xVideosFields.uploader,
			models: xVideosFields.models,
			pageUrl: xVideosFields.pageUrl
		};
	}
}
