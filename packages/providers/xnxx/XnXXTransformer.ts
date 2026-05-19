import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { XnXXExecArgs, XnXXOutput, XnXXVideoOutput } from './XnXXContracts';
import { XnXXMethods } from './XnXXTypes';

/**
 * Normalizes parsed XnXX metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class XnXXTransformer extends BaseTransformer<XnXXExecArgs, DefaultExecutionResult | XnXXVideoOutput> {
	public async transform(url: string, request?: XnXXExecArgs): Promise<DefaultExecutionResult | XnXXVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<XnXXOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case XnXXMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<XnXXOutput>>): XnXXVideoOutput {
		const xVideosFields = metadata.customFields as XnXXOutput;

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
