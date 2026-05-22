import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, Provider } from '@types';
import { SuperPornExecArgs, SuperPornVideoOutput } from './SuperPornContracts';
import { SuperPornMethods } from './SuperPornTypes';

/**
 * @class SuperPornProvider
 * @extends BaseProvider
 * Provider for SuperPorn video downloader.
 * Provides direct mp4 links
 */
export class SuperPornProvider extends BaseProvider<SuperPornExecArgs> {
	protected readonly provider = Provider.SuperPorn;
	private readonly VIDEO_PATH_REGEX = /^https:\/\/(?:www\.)?superporn\.(?:com)\/video\/([a-zA-Z0-9-]+)$/i;

	constructor(url: string) {
		super(url, {
			provider: Provider.SuperPorn,
			urlPattern: /^(?:www\.)?superporn\.(?:com)$/i,
			metadata: {
				hasHls: false,
				type: 'adult',
				hlsIntegrated: false,
				mp4Integrated: true,
				requiresLogin: false,
				hasMp4: true,
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
		if (this.VIDEO_PATH_REGEX.test(this.url)) return this.url;
		throw new GenericException('Invalid SuperPorn video URL', this.provider, SuperPornMethods.getVideo);
	}

	/**
	 * @returns `SuperPornVideoOutput` with video metadata and source URLs.
	 * Fetches video sources from the provided URL.
	 * @throws `GenericException` when the video sources cannot be extracted
	 * `true`
	 */
	public async getVideo(): Promise<SuperPornVideoOutput> {
		return await this.execute<SuperPornVideoOutput>({
			targets: [this.videoUrl],
			provider: this.provider,
			method: SuperPornMethods.getVideo,
			extractionTarget: ExtractionTarget.SOURCES,
			executionShape: 'single'
		});
	}
}
