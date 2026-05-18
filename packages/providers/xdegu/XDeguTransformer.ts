import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { XDeguExecArgs, XDeguOutput, XDeguVideoOutput } from './XDeguContracts';
import { XDeguMethods } from './XDeguTypes';

type XDeguTransformedOutput = DefaultExecutionResult<Partial<XDeguOutput>>;

export class XDeguTransformer extends BaseTransformer<XDeguExecArgs, DefaultExecutionResult | XDeguVideoOutput> {
	public async transform(url: string, request?: XDeguExecArgs): Promise<DefaultExecutionResult | XDeguVideoOutput> {
		const metadata = (await super.transform(url, request)) as XDeguTransformedOutput;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case XDeguMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: XDeguTransformedOutput): XDeguVideoOutput {
		const xDeguMetadata = metadata.customFields as XDeguOutput;

		console.log({ xDeguMetadata });
		return {
			tags: metadata?.keywords,
			title: metadata?.title,
			description: metadata?.description,
			pageUrl: xDeguMetadata?.pageUrl,
			poster: xDeguMetadata?.poster,
			videos: xDeguMetadata?.videos,
			videoId: xDeguMetadata?.videoId,
			starred: xDeguMetadata?.starred,
			previews: xDeguMetadata?.previews
		};
	}
}
