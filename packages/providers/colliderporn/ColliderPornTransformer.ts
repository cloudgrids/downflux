import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { ColliderPornExecArgs, ColliderPornOutput, ColliderPornVideoOutput } from './ColliderPornContracts';
import { ColliderPornMethods } from './ColliderPornTypes';

export class ColliderPornTransformer extends BaseTransformer<ColliderPornExecArgs, DefaultExecutionResult | ColliderPornVideoOutput> {
	public async transform(url: string, request?: ColliderPornExecArgs): Promise<DefaultExecutionResult | ColliderPornVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<ColliderPornOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case ColliderPornMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<ColliderPornOutput>>): ColliderPornVideoOutput {
		const customFields = metadata.customFields as ColliderPornOutput;
		return {
			...customFields,
			description: metadata?.description,
			keywords: metadata?.keywords,
			title: metadata?.title
		};
	}
}
