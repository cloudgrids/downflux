import { XVideosExecArgs, XVideosVideoOutput } from '@app/contracts';
import { ExtractionTarget, ProviderType, XVideosMethods } from '@app/shared';
import { Provider } from './Provider';

export class XVideosProvider extends Provider<XVideosExecArgs> {
	protected readonly provider = ProviderType.XVideos;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.XVideos,
			urlPattern: /(?:www\.)?xvideos(?:\d+)?\.(?:com)$/i
		});
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
