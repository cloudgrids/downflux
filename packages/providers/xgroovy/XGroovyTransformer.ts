import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { XGroovyExecArgs, XGroovyOutput, XGroovyVideoOutput } from './XGroovyContracts';
import { XGroovyMethods } from './XGroovyTypes';

export class XGroovyTransformer extends BaseTransformer<XGroovyExecArgs, DefaultExecutionResult | XGroovyVideoOutput> {
	public async transform(url: string, request?: XGroovyExecArgs): Promise<DefaultExecutionResult | XGroovyVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<XGroovyOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case XGroovyMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<XGroovyOutput>>): XGroovyVideoOutput {
		const xGroovyFields = metadata.customFields as XGroovyOutput;

		return {
			description: metadata.description,
			pageUrl: xGroovyFields.pageUrl,
			uploaderId: metadata?.anchors?.find((url) => !!url.match(/members\/(\d+)/))?.match(/members\/(\d+)/)?.[1] ?? 'xgroovy_uploader',
			title: metadata.title,
			poster: xGroovyFields.poster,
			videos: xGroovyFields.videos
		};
	}
}
