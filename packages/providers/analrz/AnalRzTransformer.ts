import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { VideoQuality } from '@types';
import { AnalRzExecArgs, AnalRzOutput } from './AnalRzContracts';
import { AnalRzMethods } from './AnalRzTypes';

type AnalRzTransformedOutput = DefaultExecutionResult<Partial<AnalRzOutput>>;

export class AnalRzTransformer extends BaseTransformer<AnalRzExecArgs, DefaultExecutionResult> {
	public async transform(url: string, request?: AnalRzExecArgs): Promise<DefaultExecutionResult> {
		const metadata = (await super.transform(url, request)) as AnalRzTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case AnalRzMethods.getVideo:
				return this.defaultVideoOutput(metadata, {
					quality: metadata?.customFields?.height ? `${metadata.customFields.height}p` : VideoQuality.QUnknown,
					extraFields: {
						videoId: metadata?.customFields?.videoId,
						actors: metadata?.customFields?.actors,
						tags: metadata?.customFields?.tags,
						description: metadata?.customFields?.description,
						uploader: metadata?.customFields?.uploader,
						width: metadata?.customFields?.width,
						height: metadata?.customFields?.height
					}
				});
			default:
				return metadata;
		}
	}
}
