import { DefaultExtractorResult, PornOneExecArgs, PornOneOutput, PornOneVideoOutput } from '@app/contracts';
import { PornOneMethods } from '@app/shared';
import { DefaultTransformer } from './DefaultTransformer';

export class PornOneTransformer extends DefaultTransformer<PornOneExecArgs, DefaultExtractorResult | PornOneVideoOutput> {
	public async transform(url: string, request?: PornOneExecArgs): Promise<DefaultExtractorResult | PornOneVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExtractorResult<Partial<PornOneOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case PornOneMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExtractorResult<Partial<PornOneOutput>>): PornOneVideoOutput {
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
			videoUrl: metadata.sources.filter((url) => url.includes('pornone'))?.[0]
		};
	}
}
