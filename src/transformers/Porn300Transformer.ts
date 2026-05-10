import { DefaultExtractorResult, Porn300ExecArgs, Porn300Output, Porn300VideoOutput } from '@app/contracts';
import { Porn300Methods } from '@app/shared';
import { DefaultTransformer } from './DefaultTransformer';

export class Porn300Transformer extends DefaultTransformer<Porn300ExecArgs, DefaultExtractorResult | Porn300VideoOutput> {
	public async transform(url: string, request?: Porn300ExecArgs): Promise<DefaultExtractorResult | Porn300VideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExtractorResult<Partial<Porn300Output>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case Porn300Methods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExtractorResult<Partial<Porn300Output>>): Porn300VideoOutput {
		const porn300Fields = metadata.customFields as Porn300VideoOutput;
		return {
			description: porn300Fields.description,
			pageUrl: porn300Fields.pageUrl,
			poster: porn300Fields.poster,
			title: metadata.title,
			videoUrl: metadata.sources?.filter((source) => source?.includes('porn300'))?.[0]
		};
	}
}
