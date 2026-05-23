import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { FlickrExecArgs, FlickrOutput } from './FlickrContracts';
import { FlickrMethods } from './FlickrTypes';

type FlickrTransformedOutput = DefaultExecutionResult<Partial<FlickrOutput>>;

export class FlickrTransformer extends BaseTransformer<FlickrExecArgs, DefaultExecutionResult> {
	public async transform(url: string, request?: FlickrExecArgs): Promise<DefaultExecutionResult> {
		const metadata = (await super.transform(url, request)) as FlickrTransformedOutput;
		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case FlickrMethods.getVideo:
				return metadata;
			default:
				return metadata;
		}
	}
}
