import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { ZbPornExecArgs, ZbPornVideoOutput } from './ZbPornContracts';
import { ZbPornMethods } from './ZbPornTypes';

export class ZbPornProvider extends BaseProvider<ZbPornExecArgs> {
	protected readonly provider = ProviderType.ZbPorn;
	private readonly VIDEO_PATH_REGEX = /^https:\/\/(?:www\.)?zbporn\.(?:tv|com)\/videos\/\d+\/[a-zA-Z0-9_-]+\/(?:\?.*)?/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.ZbPorn,
			urlPattern: /(?:www\.)?zbporn\.(?:tv|com)$/i,
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

	public async getVideo(): Promise<ZbPornVideoOutput> {
		return await this.execute<ZbPornVideoOutput>({
			method: ZbPornMethods.getVideo,
			extractionTarget: ExtractionTarget.SOURCES,
			provider: this.provider,
			targets: [this.videoUrl],
			executionShape: 'single'
		});
	}
}
