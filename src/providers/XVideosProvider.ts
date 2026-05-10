import { XVideosExecArgs, XVideosVideoOutput } from '@app/contracts';
import { InvalidUrlException } from '@app/exceptions';
import { ExtractionTarget, ProviderType, XVideosMethods } from '@app/shared';
import { Provider } from './Provider';

export class XVideosProvider extends Provider<XVideosExecArgs> {
	private readonly provider = ProviderType.XVideos;
	private readonly HOST_REGEX = /(?:www\.)?xvideos(?:\d+)?\.(?:com)$/i;

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

	public async getVideo(): Promise<XVideosVideoOutput> {
		return await this.execute<XVideosVideoOutput>({
			targets: [this.url],
			method: XVideosMethods.getVideo,
			executionShape: 'single',
			provider: this.provider,
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
