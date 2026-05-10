import { DefaultExtractorResult, XnXXExecArgs, XnXXOutput } from '@app/contracts';
import { XnXXMethods } from '@app/shared';
import { XnXXVideoOutput } from 'src/contracts/providers/xnxx/XnXXVideoOutput';
import { DefaultTransformer } from './DefaultTransformer';

export class XnXXTransformer extends DefaultTransformer<XnXXExecArgs, DefaultExtractorResult | XnXXVideoOutput> {
	public async transform(url: string, request?: XnXXExecArgs): Promise<DefaultExtractorResult | XnXXVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExtractorResult<Partial<XnXXOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case XnXXMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	public toVideoOutput(metadata: DefaultExtractorResult<Partial<XnXXOutput>>): XnXXVideoOutput {
		const xVideosFields = metadata.customFields as XnXXOutput;

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
