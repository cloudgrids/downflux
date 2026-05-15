import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { MyLustExecArgs, MyLustOutput, MyLustVideoOutput } from './MyLustContracts';
import { MyLustMethods } from './MyLustTypes';

export class MyLustTransformer extends BaseTransformer<MyLustExecArgs, DefaultExecutionResult | MyLustVideoOutput> {
	public async transform(url: string, request?: MyLustExecArgs): Promise<DefaultExecutionResult | MyLustVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<MyLustOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case MyLustMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<MyLustOutput>>): MyLustVideoOutput {
		const myLustFields = metadata.customFields as MyLustOutput;
		return {
			...myLustFields,
			description: metadata?.description,
			tags: metadata?.keywords,
			title: metadata?.title
		};
	}
}
