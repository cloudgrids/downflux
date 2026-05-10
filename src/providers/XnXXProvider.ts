import { XnXXExecArgs } from '@app/contracts';
import { ExtractionTarget, ProviderType, XnXXMethods } from '@app/shared';
import { XnXXVideoOutput } from 'src/contracts/providers/xnxx/XnXXVideoOutput';
import { Provider } from './Provider';

export class XnXXProvider extends Provider<XnXXExecArgs> {
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
