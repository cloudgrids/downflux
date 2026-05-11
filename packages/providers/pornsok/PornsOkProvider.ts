import { BaseProvider } from '@base';
import { ExtractionTarget, ProviderType, VideoQuality } from '@types';
import { PornsOkExecArgs, PornsOkVideoOutput } from './PornsOkContracts';
import { PornsOkMethods } from './PornsOkTypes';

/**
 * @class PornsOkProvider
 * Provides video operations for PornsOk.
 * @remarks The provider validates URLs to ensure they belong to the PornsOk domain and supports fetching video sources based on specified quality.
 */
export class PornsOkProvider extends BaseProvider<PornsOkExecArgs> {
	protected readonly provider = ProviderType.PornsOk;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.PornsOk,
			urlPattern: /^(?:www\.)?pornsok\.(?:com)$/i
		});
	}

	/**
	 * Gets video sources based on the specified quality.
	 * @param param Video quality to filter sources (e.g., 720p, 1080p). If not specified, all available sources will be returned.
	 * @remarks The method will extract video sources from the provided URL and filter them based on the specified quality, returning the relevant metadata and source URLs.
	 * @canDownload true
	 * @returns `PornsOkVideoOutput` containing video metadata and source URLs.
	 * @notes If the specified quality is not available, the method will return all available sources without filtering.
	 */
	public async getVideo(quality?: VideoQuality): Promise<PornsOkVideoOutput> {
		return await this.execute<PornsOkVideoOutput>({
			targets: [this.url],
			provider: this.provider,
			allowedVideoQuality: quality,
			executionShape: 'single',
			method: PornsOkMethods.getVideo,
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
