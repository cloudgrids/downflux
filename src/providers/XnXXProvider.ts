import { XnXXExecArgs } from '@app/contracts';
import { InvalidUrlException } from '@app/exceptions';
import { ExtractionTarget, ProviderType, XnXXMethods } from '@app/shared';
import { XnXXVideoOutput } from 'src/contracts/providers/xnxx/XnXXVideoOutput';
import { Provider } from './Provider';

export class XnXXProvider extends Provider<XnXXExecArgs> {
	private readonly provider = ProviderType.XnXX;
	private readonly HOST_REGEX = /^(?:www\.)?xnxx(?:\d+)?\.(?:com|health)$/i;

	constructor(url: string) {
		super(url);
		this.validate(url);
	}

	protected override validate(url: string): void {
		try {
			new URL(url);
		} catch {
			throw new InvalidUrlException(url, this.provider);
		}
		if (!this.isSupported(this.HOST_REGEX)) throw new InvalidUrlException(url, this.provider);
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
