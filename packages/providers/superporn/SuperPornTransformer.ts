import { BaseTransformer } from '@base';
import { DefaultExecutionResult, VideoSourceOutput } from '@contracts';
import { VideoQuality } from '@types';
import { SuperPornExecArgs, SuperPornOutput, SuperPornVideoOutput } from './SuperPornContracts';
import { SuperPornMethods } from './SuperPornTypes';

export class SuperPornTransformer extends BaseTransformer<SuperPornExecArgs, DefaultExecutionResult | SuperPornVideoOutput> {
	public async transform(url: string, request?: SuperPornExecArgs): Promise<DefaultExecutionResult | SuperPornVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<SuperPornOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case SuperPornMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<SuperPornOutput>>): SuperPornVideoOutput {
		const superPornFields = metadata.customFields as SuperPornOutput;

		return {
			...superPornFields,
			pageUrl: superPornFields.pageUrl,
			tags: superPornFields?.tags,
			uploader: superPornFields?.uploader,
			videos: metadata.sources?.map((src) => {
				const isVideoCdn = /^https:\/\/cdnst(?:\d+)?\.superporn\.com\/.*/i.test(src);
				return {
					url: src,
					quality: isVideoCdn ? superPornFields?.quality : VideoQuality.QUnknown
				};
			}) as VideoSourceOutput[],
			poster: superPornFields?.poster,
			title: superPornFields?.title || metadata.title,
			description: superPornFields?.description || metadata.description
		};
	}
}
