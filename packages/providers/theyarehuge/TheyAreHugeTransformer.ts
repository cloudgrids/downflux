import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { TheyAreHugeExecArgs, TheyAreHugeOutput, TheyAreHugeVideoOutput } from './TheyAreHugeContracts';
import { TheyAreHugeMethods } from './TheyAreHugeTypes';

export class TheyAreHugeTransformer extends BaseTransformer<TheyAreHugeExecArgs, DefaultExecutionResult | TheyAreHugeVideoOutput> {
	public async transform(url: string, request?: TheyAreHugeExecArgs): Promise<DefaultExecutionResult | TheyAreHugeVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<TheyAreHugeOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case TheyAreHugeMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<TheyAreHugeOutput>>): TheyAreHugeVideoOutput {
		const theyAreHugeFields = metadata.customFields as TheyAreHugeOutput;
		return {
			...theyAreHugeFields,
			videos: {
				mp4: this.uniqueVideos(theyAreHugeFields.videos?.mp4 ?? [], {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				}),
				hls: this.uniqueVideos(theyAreHugeFields.videos?.hls ?? [], {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				})
			},
			description: metadata.description
		};
	}
}
