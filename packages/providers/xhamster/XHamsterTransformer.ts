import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { XHamsterExecArgs, XHamsterOutput, XHamsterVideoOutput } from './XHamsterContracts';
import { XHamsterMethods } from './XHamsterTypes';

/**
 * Normalizes parsed XHamster metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class XHamsterTransformer extends BaseTransformer<XHamsterExecArgs, DefaultExecutionResult | XHamsterVideoOutput> {
	private readonly DIRECT_MP4_REGEX = /^https:\/\/video5\.xhpingcdn\.com\/.*\.mp4$/;

	public async transform(url: string, request?: XHamsterExecArgs): Promise<DefaultExecutionResult | XHamsterVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<XHamsterOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case XHamsterMethods.getVideo:
				return this.toVideoOutput(request, metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(request: XHamsterExecArgs, metadata: DefaultExecutionResult<Partial<XHamsterVideoOutput>>): XHamsterVideoOutput {
		const xHamsterFields = metadata.customFields as XHamsterOutput;

		return {
			description: metadata.description,
			title: metadata.title,
			pageUrl: xHamsterFields.pageUrl,
			thumbnailUrl: xHamsterFields.thumbnailUrl,
			username: xHamsterFields.username,
			tags: metadata.keywords || [],
			masterPlaylistUrl: xHamsterFields.masterPlaylistUrl,
			defaultVideoUrl: metadata.videoSources?.find((video) => this.DIRECT_MP4_REGEX.test(video)) ?? metadata.videoSources?.[0]
		};
	}
}
