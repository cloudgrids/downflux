import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { BlackPornExecArgs, BlackPornOutput } from './BlackPornContracts';
import { BlackPornMethods } from './BlackPornTypes';

type BlackPornTransformedOutput = DefaultExecutionResult<Partial<BlackPornOutput>>;

/**
 * Transforms BlackPorn metadata into standardized video output format.
 * Handles conversion of extracted metadata to the final video output structure.
 *
 * @remarks
 * Transformers handle the conversion of raw extracted data into the standardized
 * output format used by the application. This includes quality mapping and field normalization.
 */
export class BlackPornTransformer extends BaseTransformer<BlackPornExecArgs, DefaultExecutionResult> {
	public async transform(url: string, request?: BlackPornExecArgs): Promise<DefaultExecutionResult> {
		const metadata = (await super.transform(url, request)) as BlackPornTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case BlackPornMethods.getVideo:
				return this.defaultVideoOutput(metadata, {
					extraFields: {
						videoId: metadata.customFields?.videoId,
						uploader: metadata.customFields?.uploader,
						poster: metadata.customFields?.poster
					}
				});
			default:
				return metadata;
		}
	}
}
