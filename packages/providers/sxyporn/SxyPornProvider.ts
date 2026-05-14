import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { SxyPornExecArgs, SxyPornVideoOutput } from './SxyPornContracts';
import { SxyPornMethods } from './SxyPornTypes';

/**
 * @class SxyPornProvider
 * @extends BaseProvider
 * Provider for SxyPorn video downloader.
 * This provider is still in `development` due to Cloudflare challenge
 * Provides mp4 links
 */
export class SxyPornProvider extends BaseProvider<SxyPornExecArgs> {
	protected readonly provider = ProviderType.SxyPorn;
	private VIDEO_PATH_REGEX = /^https:\/\/sxyprn\.com\/post\/([a-z-0-9A-Z]+)\.html$/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.SxyPorn,
			urlPattern: /^(?:www\.)?sxyprn\.(?:com)$/i
		});
	}

	get videoUrl(): string {
		const match = this.url.match(this.VIDEO_PATH_REGEX);
		if (!match) {
			throw new GenericException('Invalid URL for SxyPorn video', ProviderType.SxyPorn, SxyPornMethods.getVideo, {
				cause: this.url
			});
		}
		return this.url;
	}

	/**
	 * @returns `SxyPornVideoOutput` with video metadata and source URLs.
	 * Fetches video sources from the provided URL.
	 * @throws `GenericException` when the video sources cannot be extracted
	 * `true`
	 */
	public async getVideo(): Promise<SxyPornVideoOutput> {
		return await this.execute<SxyPornVideoOutput>({
			method: SxyPornMethods.getVideo,
			targets: [this.videoUrl],
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES,
			provider: this.provider
		});
	}
}
