import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { TubeVSexExecArgs, TubeVSexVideoOutput } from './TubeVSexContracts';
import { TubeVSexMethods } from './TubeVSexTypes';

export class TubeVSexProvider extends BaseProvider<TubeVSexExecArgs> {
	protected readonly provider = ProviderType.TubeVSex;
	private readonly VIDEO_URL_REGEX = /^https:\/\/(?:www\.)?tubev\.(?:sex)\/(?:video-archive|video)\/[\d]+\/[^/]+$/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.TubeVSex,
			urlPattern: /^(?:www\.)?tubev\.(?:sex)$/i,
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

	get videoUrl(): string {
		if (this.VIDEO_URL_REGEX.test(this.url)) return this.url;
		throw new GenericException('Invalid TubeVSex video URL', this.provider, TubeVSexMethods.getVideo);
	}

	public async getVideo(): Promise<TubeVSexVideoOutput> {
		return await this.execute<TubeVSexVideoOutput>({
			targets: [this.videoUrl],
			method: TubeVSexMethods.getVideo,
			provider: this.provider,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
