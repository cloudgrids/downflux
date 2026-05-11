import { BaseProvider } from '@base';
import { ExtractionTarget, ProviderType } from '@types';
import { XnXXExecArgs, XnXXVideoOutput } from './XnXXContracts';
import { XnXXMethods } from './XnXXTypes';

export class XnXXProvider extends BaseProvider<XnXXExecArgs> {
	protected readonly provider = ProviderType.XnXX;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.XnXX,
			urlPattern: /^(?:www\.)?xnxx(?:\d+)?\.(?:com|health)$/i
		});
	}

	public async getVideo(): Promise<XnXXVideoOutput> {
		return await this.execute<XnXXVideoOutput>({
			targets: [this.url],
			method: XnXXMethods.getVideo,
			executionShape: 'single',
			provider: this.provider,
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
