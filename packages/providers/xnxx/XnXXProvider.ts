import { BaseProvider } from '@base';
import { ExtractionTarget, Provider } from '@types';
import { XnXXExecArgs, XnXXVideoOutput } from './XnXXContracts';
import { XnXXMethods } from './XnXXTypes';

/**
 * @class XnXXProvider
 * @extends BaseProvider
 * Provider for XnXX video downloader.
 * Provides m3u8 links
 * Dependencies: ffmpeg (for m3u8 to mp4 conversion)
 *
 * @remarks
 * XnXX supports video downloading (canDownload: true).
 */
export class XnXXProvider extends BaseProvider<XnXXExecArgs> {
	protected readonly provider = Provider.XnXX;

	constructor(url: string) {
		super(url, {
			provider: Provider.XnXX,
			urlPattern: /^(?:www\.)?xnxx(?:\d+)?\.(?:com|health)$/i,
			metadata: {
				hasHls: true,
				type: 'adult',
				hasMp4: true,
				hlsIntegrated: true,
				mp4Integrated: true,
				hasKvs: false,
				underGeoRestriction: false,
				requiresBrowser: false,
				canDownload: true,
				underDevelopment: true,
				cloudflareChallenge: false,
				sniSpoofing: 'working'
			}
		});
	}

	/**
	 * @returns `XnXXVideoOutput` with video metadata and source URLs.
	 * Fetches video sources from the provided XnXX URL.
	 * @throws `GenericException` when the video sources cannot be extracted
	 * `true`
	 */
	public async getVideo(): Promise<XnXXVideoOutput> {
		return await this.execute<XnXXVideoOutput>({
			targets: [this.url],
			method: XnXXMethods.getVideo,
			executionShape: 'single',
			provider: this.provider,
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
