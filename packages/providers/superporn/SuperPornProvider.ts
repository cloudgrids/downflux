import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { SuperPornExecArgs, SuperPornVideoOutput } from './SuperPornContracts';
import { SuperPornMethods } from './SuperPornTypes';

/**
 * @class SuperPornProvider
 * @extends BaseProvider
 * Provider for SuperPorn video downloader.
 * Provides direct mp4 links
 */
export class SuperPornProvider extends BaseProvider<SuperPornExecArgs> {
	protected readonly provider = ProviderType.SuperPorn;
	private readonly VIDEO_PATH_REGEX = /^https:\/\/(?:www\.)?superporn\.(?:com)\/video\/([a-zA-Z0-9-]+)$/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.SuperPorn,
			urlPattern: /^(?:www\.)?superporn\.(?:com)$/i,
			metadata: {
				hls: false,
				mp4: true,
				kvs: false,
				geoRestriction: false,
				needsBrowser: false
			}
		});
	}

	get videoUrl(): string {
		const match = this.url.match(this.VIDEO_PATH_REGEX);
		if (!match) throw new GenericException('Invalid SuperPorn video url', ProviderType.SuperPorn, 'SuperPornProvider');
		return this.url;
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
