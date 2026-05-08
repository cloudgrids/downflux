import { DefaultExtractorResult, XHamsterExecArgs, XHamsterMethods, XHamsterOutput, XHamsterVideoOutput } from '../util';
import { BaseTransformer } from './BaseTransformer';

export class XHamsterTransformer extends BaseTransformer<XHamsterExecArgs, DefaultExtractorResult | XHamsterVideoOutput> {
	public async transform(url: string, request?: XHamsterExecArgs): Promise<DefaultExtractorResult | XHamsterVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExtractorResult<Partial<XHamsterOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case XHamsterMethods.getVideo:
				return this.toVideoOutput(request, metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(request: XHamsterExecArgs, metadata: DefaultExtractorResult<Partial<XHamsterVideoOutput>>): XHamsterVideoOutput {
		const xHamsterFields = metadata.customFields as XHamsterOutput;
		return {
			description: metadata.description,
			title: metadata.title,
			pageUrl: xHamsterFields.pageUrl,
			thumbnailUrl: xHamsterFields.thumbnailUrl,
			username: xHamsterFields.username,
			videoUrl: metadata.links?.find((link) =>
				link.match(/^https:\/\/video-(?:nss|cf)\.xhpingcdn\.com\/.*\.m3u8(?:\?.*)?$/)
			) as string
		};
	}
}
