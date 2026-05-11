import { BaseProvider } from '@base';
import { ExtractionTarget, ProviderType } from '@types';
import { XVideosExecArgs, XVideosVideoOutput } from './XVideosContracts';
import { XVideosMethods } from './XVideosTypes';

export class XVideosProvider extends BaseProvider<XVideosExecArgs> {
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
