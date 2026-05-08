import { DefaultExtractorResult, XHamsterExecArgs, XHamsterMethods, XHamsterOutput, XHamsterVideoOutput } from '../util';
import { BaseTransformer } from './BaseTransformer';

export class XHamsterTransformer extends BaseTransformer<XHamsterExecArgs, DefaultExtractorResult | XHamsterVideoOutput> {
	private readonly DIRECT_MP4_REGEX = /^https:\/\/video5\.xhpingcdn\.com\/.*\.mp4$/;

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
			masterPlaylistUrl: xHamsterFields.masterPlaylistUrl,
			defaultVideoUrl: metadata.videos?.find((video) => this.DIRECT_MP4_REGEX.test(video)) ?? metadata.videos?.[0]
		};
	}
}
