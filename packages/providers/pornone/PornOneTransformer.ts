import { BaseTransformer } from '@base';
import { DefaultExecutionResult, VideoSourceOutput } from '@contracts';
import { PornOneExecArgs, PornOneOutput, PornOneVideoOutput } from './PornOneContracts';
import { PornOneMethods } from './PornOneTypes';

export class PornOneTransformer extends BaseTransformer<PornOneExecArgs, DefaultExecutionResult | PornOneVideoOutput> {
	public async transform(url: string, request?: PornOneExecArgs): Promise<DefaultExecutionResult | PornOneVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<PornOneOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case PornOneMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<PornOneOutput>>): PornOneVideoOutput {
		const pornOneFields = metadata.customFields as PornOneOutput;
		return {
			categories: pornOneFields.categories,
			description: metadata.description,
			pageUrl: pornOneFields.pageUrl,
			pornStars: pornOneFields.pornStars,
			poster: pornOneFields.poster,
			tags: metadata.keywords,
			title: metadata.title,
			uploader: pornOneFields.uploader,
			videos: metadata.sources
				.filter((url) => url.includes('pornone'))
				.map((url) => ({ url, quality: pornOneFields.quality })) as VideoSourceOutput[]
		};
	}
}
