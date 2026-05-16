import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { ZzzTubeExecArgs, ZzzTubeVideoOutput } from './ZzzTubeContracts';
import { ZzzTubeMethods } from './ZzzTubeTypes';

export class ZzzTubeProvider extends BaseProvider<ZzzTubeExecArgs> {
	protected readonly provider = ProviderType.ZzzTube;
	private readonly VIDEO_URL_REGEX = /^https:\/\/(?:www\.)?zzztube\.(?:com)\/\d+(?:(?:\?|#).*)?$/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.ZzzTube,
			urlPattern: /^(?:www\.)?zzztube\.(?:com)$/i,
			metadata: {
				hasHls: false,
				hasMp4: true,
				hlsIntegrated: false,
				mp4Integrated: true,
				hasKvs: false,
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
		throw new GenericException('Invalid ZzzTube video URL', this.provider, ZzzTubeMethods.getVideo);
	}

	public async getVideo(): Promise<ZzzTubeVideoOutput> {
		return await this.execute<ZzzTubeVideoOutput>({
			targets: [this.videoUrl],
			provider: this.provider,
			method: ZzzTubeMethods.getVideo,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
