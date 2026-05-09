import { DefaultExtractorResult, TnAFlixExecArgs, TnAFlixOutput, TnAFlixVideoOutput } from '@app/contracts';
import { TnAFlixMethods } from '@app/shared';
import { DefaultTransformer } from './DefaultTransformer';

export class TnAFlixTransformer extends DefaultTransformer<TnAFlixExecArgs, TnAFlixVideoOutput | DefaultExtractorResult> {
	public override async transform(
		url: string,
		request?: TnAFlixExecArgs | undefined
	): Promise<DefaultExtractorResult | TnAFlixVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExtractorResult<Partial<TnAFlixOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request.method) {
			case TnAFlixMethods.getVideo:
				return this.toVideoOutput(request, metadata);

			default:
				return metadata;
		}
	}

	private toVideoOutput(request: TnAFlixExecArgs, metadata: DefaultExtractorResult<Partial<TnAFlixOutput>>): TnAFlixVideoOutput {
		const tnAFlixFields = metadata.customFields as TnAFlixOutput;

		return {
			disLikes: tnAFlixFields.disLikes,
			likes: tnAFlixFields.likes,
			pageUrl: tnAFlixFields.pageUrl ?? request.entryUrl,
			title: tnAFlixFields.title,
			videoPoster: tnAFlixFields.videoPoster,
			videos: tnAFlixFields.videos,
			videoTags: tnAFlixFields.videoTags,
			uploader: tnAFlixFields.uploader,
			videoId: tnAFlixFields.videoId
		};
	}
}
