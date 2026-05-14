import { BaseProvider } from '@base';
import { ProviderType, VideoQuality } from '@types';
import { HqPornExecArgs, HqPornVideoOutput } from './HqPornContracts';
import { HqPornMethods } from './HqPornTypes';

/**
 * @class HqPornProvider
 * @extends BaseProvider
 * Provider for HqPorn video downloader.
 * Provides mp4 links
 * Does not exposes video quality or poster information due to limitations in the source HTML,
 * but these may be added in the future as the provider is further developed and refined.
 */
export class HqPornProvider extends BaseProvider<HqPornExecArgs> {
	protected readonly provider = ProviderType.HqPorn;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.HqPorn,
			urlPattern: /^(?:www\.)?hqporn\.(?:com|xxx)$/i
		});
	}

	/**
	 * Fetches video information and download URL from the provided HqPorn video page URL.
	 * @returns `HqPornVideoOutput` containing video metadata and download URL.
	 * @throws `InvalidUrlException` if the URL is not a valid HqPorn video page URL.
	 * @throws `GenericException` for any parsing or extraction errors.
	 * @param quality Optional parameter to specify desired video quality. If not provided, all available qualities will be returned.
	 * true
	 */
	public async getVideo(quality?: VideoQuality): Promise<HqPornVideoOutput> {
		return await this.execute<HqPornVideoOutput>({
			targets: [this.url],
			provider: this.provider,
			executionShape: 'single',
			method: HqPornMethods.getVideo,
			allowedVideoQuality: quality
		});
	}
}
