import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { XCafeExecArgs, XCafeOutput, XCafeVideoOutput } from './XCafeContracts';
import { XCafeMethods } from './XCafeTypes';

/**
 * Normalizes parsed XCafe metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class XCafeTransformer extends BaseTransformer<XCafeExecArgs, DefaultExecutionResult | XCafeVideoOutput> {
	public async transform(url: string, request?: XCafeExecArgs): Promise<DefaultExecutionResult | XCafeVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<XCafeOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case XCafeMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<XCafeOutput>>): XCafeVideoOutput {
		const xCafeFields = metadata.customFields as XCafeOutput;
		const uploaderUrl = metadata?.anchors.find((anchor) => /channels\/([^/]+)\//i.test(anchor));
		return {
			...xCafeFields,
			videos: {
				mp4: this.uniqueVideos(xCafeFields.videos?.mp4 ?? [], {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				}),
				hls: this.uniqueVideos(xCafeFields.videos?.hls ?? [], {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				})
			},
			description: metadata?.description,
			tags: metadata?.keywords,
			title: metadata?.title,
			uploader: uploaderUrl?.match(/channels\/([^/]+)\//)?.[1] ?? 'unknown'
		};
	}
}
