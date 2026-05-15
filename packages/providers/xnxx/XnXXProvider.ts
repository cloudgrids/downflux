import { BaseProvider } from '@base';
import { ExtractionTarget, ProviderType } from '@types';
import { XnXXExecArgs, XnXXVideoOutput } from './XnXXContracts';
import { XnXXMethods } from './XnXXTypes';

/**
 * @class XnXXProvider
 * @extends BaseProvider
 * Provider for XnXX video downloader.
 * Provides m3u8 links
 * Dependencies: ffmpeg (for m3u8 to mp4 conversion)
 */
export class XnXXProvider extends BaseProvider<XnXXExecArgs> {
	protected readonly provider = ProviderType.XnXX;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.XnXX,
			urlPattern: /^(?:www\.)?xnxx(?:\d+)?\.(?:com|health)$/i,
			metadata: {
				hasHls: true,
				hasMp4: true,
				hasKvs: false,
				underGeoRestriction: false,
				requiresBrowser: false,
				sniSpoofing: 'failed'
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
