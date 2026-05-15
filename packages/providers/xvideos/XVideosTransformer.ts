import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { XVideosExecArgs, XVideosOutput, XVideosVideoOutput } from './XVideosContracts';
import { XVideosMethods } from './XVideosTypes';

export class XVideosTransformer extends BaseTransformer<XVideosExecArgs, DefaultExecutionResult | XVideosVideoOutput> {
	public async transform(url: string, request?: XVideosExecArgs): Promise<DefaultExecutionResult | XVideosVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<XVideosOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case XVideosMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	public toVideoOutput(metadata: DefaultExecutionResult<Partial<XVideosOutput>>): XVideosVideoOutput {
		const xVideosFields = metadata.customFields as XVideosOutput;

		return {
			title: metadata.title,
			duration: xVideosFields.duration,
			description: xVideosFields.description,
			videoUrl: xVideosFields.videoUrl,
			tags: xVideosFields.tags,
			poster: xVideosFields.poster,
			uploader: xVideosFields.uploader,
			models: xVideosFields.models,
			pageUrl: xVideosFields.pageUrl
		};
	}
}
