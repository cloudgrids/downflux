import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { VideoQuality } from '@types';
import { SuperPornExecArgs, SuperPornOutput, SuperPornVideoOutput } from './SuperPornContracts';
import { SuperPornMethods } from './SuperPornTypes';

/**
 * Normalizes parsed SuperPorn metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class SuperPornTransformer extends BaseTransformer<SuperPornExecArgs, DefaultExecutionResult | SuperPornVideoOutput> {
	public async transform(url: string, request?: SuperPornExecArgs): Promise<DefaultExecutionResult | SuperPornVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<SuperPornOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case SuperPornMethods.getVideo:
				return this.defaultVideoOutput(metadata, {
					filter: (src) => /^https:\/\/cdnst(?:\d+)?\.superporn\.com\/.*/i.test(src),
					quality: metadata?.customFields?.quality as VideoQuality,
					extraFields: this.toVideoOutput(metadata)
				});
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
			poster: superPornFields?.poster,
			title: superPornFields?.title || metadata.title,
			description: superPornFields?.description || metadata.description
		};
	}
}
