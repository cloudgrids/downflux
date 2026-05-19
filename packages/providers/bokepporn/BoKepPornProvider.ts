import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { BoKepPornExecArgs, BoKepPornVideoOutput } from './BoKepPornContracts';
import { BoKepPornMethods } from './BoKepPornTypes';

export class BoKepPornProvider extends BaseProvider<BoKepPornExecArgs> {
	protected readonly provider = ProviderType.BoKepPorn;
	private readonly VIDEO_PATH_REGEX = /^https:\/\/(?:www\.)?bokep\.(?:porn)\/videos\/\d+\/(?:\?.*)?/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.BoKepPorn,
			urlPattern: /(?:www\.)?bokep\.(?:porn)$/i,
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

	public async getVideo(): Promise<BoKepPornVideoOutput> {
		return await this.execute<BoKepPornVideoOutput>({
			method: BoKepPornMethods.getVideo,
			extractionTarget: ExtractionTarget.SOURCES,
			provider: this.provider,
			targets: [this.videoUrl],
			executionShape: 'single'
		});
	}
}
