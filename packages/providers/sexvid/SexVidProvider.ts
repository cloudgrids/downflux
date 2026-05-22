import { BaseProvider } from '@base';
import { ExtractionTarget, Provider } from '@types';
import { SexVidExecArgs, SexVidVideoOutput } from './SexVidContracts';
import { SexVidMethods } from './SexVidTypes';

/**
 * @class SexVidProvider
 * @extends BaseProvider
 * Provider for SexVid video downloader.
 * Provides mp4 links
 *
 * @remarks
 * SexVid supports video downloading (canDownload: true).
 */
export class SexVidProvider extends BaseProvider<SexVidExecArgs> {
	protected readonly provider = Provider.SexVid;

	constructor(url: string) {
		super(url, {
			provider: Provider.SexVid,
			urlPattern: /^(?:www\.)?sexvid(?:\d+)?\.(?:xxx|com)$/i,
			metadata: {
				hasHls: false,
				type: 'adult',
				hlsIntegrated: false,
				mp4Integrated: true,
				requiresLogin: false,
				hasMp4: true,
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
