import { BaseProvider } from '@base';
import { ExtractionTarget, ProviderType } from '@types';
import { SexVidExecArgs, SexVidVideoOutput } from './SexVidContracts';
import { SexVidMethods } from './SexVidTypes';

/**
 * @class SexVidProvider
 * @extends BaseProvider
 * Provider for SexVid video downloader.
 * Provides mp4 links
 */
export class SexVidProvider extends BaseProvider<SexVidExecArgs> {
	protected readonly provider = ProviderType.SexVid;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.SexVid,
			urlPattern: /^(?:www\.)?sexvid\.(?:xxx)$/i,
			metadata: {
				hls: false,
				mp4: true,
				kvs: true,
				geoRestriction: false,
				needsBrowser: false
			}
		});
	}

	/**
	 * @returns `Promise<SexVidVideoOutput>` with video metadata and source URLs.
	 * Fetches video sources from the provided URL.
	 * @throws `GenericException` when the video sources cannot be extracted
	 * `true`
	 */
	public async getVideo(): Promise<SexVidVideoOutput> {
		return await this.execute<SexVidVideoOutput>({
			targets: [this.url],
			provider: this.provider,
			method: SexVidMethods.getVideo,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
