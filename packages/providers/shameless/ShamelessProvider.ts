import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { ShamelessExecArgs, ShamelessVideoOutput } from './ShamelessContracts';
import { ShamelessMethods } from './ShamelessTypes';

export class ShamelessProvider extends BaseProvider<ShamelessExecArgs> {
	protected readonly provider = ProviderType.Shameless;
	private readonly VIDEO_URL_REGEX = /^https:\/\/(?:www\.)?shameless\.(?:com)\/videos\/[^/]+\/$/;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.Shameless,
			urlPattern: /^(?:www\.)?shameless\.(?:com)$/i,
			metadata: {
				hasHls: false,
				hasMp4: true,
				hlsIntegrated: false,
				mp4Integrated: true,
				requiresLogin: false,
				hasKvs: true,
				underGeoRestriction: false,
				requiresBrowser: false,
				canDownload: true,
				underDevelopment: true,
				cloudflareChallenge: false,
				sniSpoofing: 'untested'
			}
		});
	}

	private get videoUrl(): string {
		if (this.VIDEO_URL_REGEX.test(this.url)) return this.url;

		throw new GenericException('Invalid video URL', this.provider);
	}

	public async getVideo(): Promise<ShamelessVideoOutput> {
		return await this.execute<ShamelessVideoOutput>({
			targets: [this.videoUrl],
			provider: this.provider,
			method: ShamelessMethods.getVideo,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
