import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { EpicGfsExecArgs, EpicGfsVideoOutput } from './EpicGfsContracts';
import { EpicGfsMethods } from './EpicGfsTypes';

export class EpicGfsProvider extends BaseProvider<EpicGfsExecArgs> {
	protected readonly provider = ProviderType.EpicGfs;
	private readonly VIDEO_PATH_REGEX = /^https:\/\/(?:www\.)?epicgfs\.(?:com)\/videos\/\d+\/[a-zA-Z0-9_-]+\/(?:\?.*)?/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.EpicGfs,
			urlPattern: /(?:www\.)?epicgfs\.(?:com)$/i,
			metadata: {
				hasHls: false,
				hasMp4: true,
				hasKvs: true,
				canDownload: true,
				hlsIntegrated: false,
				mp4Integrated: true,
				underDevelopment: true,
				requiresBrowser: false,
				sniSpoofing: 'untested',
				underGeoRestriction: false
			}
		});
	}

	private get videoUrl(): string {
		if (this.VIDEO_PATH_REGEX.test(this.url)) return this.url;

		throw new GenericException('Invalid url format', this.provider);
	}

	public async getVideo(): Promise<EpicGfsVideoOutput> {
		return await this.execute<EpicGfsVideoOutput>({
			method: EpicGfsMethods.getVideo,
			extractionTarget: ExtractionTarget.SOURCES,
			provider: this.provider,
			targets: [this.videoUrl],
			executionShape: 'single'
		});
	}
}
