import { BaseTransformer } from '@base';
import { DefaultExecutionResult, VideoSourceOutput } from '@contracts';
import { VideoQuality } from '@types';
import { ZzzTubeExecArgs, ZzzTubeOutput, ZzzTubeVideoOutput } from './ZzzTubeContracts';
import { ZzzTubeMethods } from './ZzzTubeTypes';

export class ZzzTubeTransformer extends BaseTransformer<ZzzTubeExecArgs, DefaultExecutionResult | ZzzTubeVideoOutput> {
	public async transform(url: string, request?: ZzzTubeExecArgs): Promise<DefaultExecutionResult | ZzzTubeVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<ZzzTubeOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case ZzzTubeMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<ZzzTubeOutput>>): ZzzTubeVideoOutput {
		const zzzTubeFields = metadata.customFields as ZzzTubeOutput;

		return {
			...zzzTubeFields,
			title: metadata?.title,
			description: metadata?.description,
			tags: metadata?.keywords || [],
			videos: metadata?.sources?.map((src) => {
				const match = src.match(/^https:\/\/(?:vcdn(?:\d+)\.)?zzztube\.(?:com)\/key.*_(\d{3,4})?\.mp4$/i);
				if (match) {
					return {
						url: src,
						quality: match?.[1] ? (`${match?.[1]}p` as VideoQuality) : VideoQuality.QUnknown
					};
				}
			}) as VideoSourceOutput[]
		};
	}
}
