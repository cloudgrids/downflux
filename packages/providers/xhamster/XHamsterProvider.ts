import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { XHamsterExecArgs, XHamsterVideoOutput } from './XHamsterContracts';
import { XHamsterMethods } from './XHamsterTypes';

/**
 * @class `XHamsterProvider` for handling xHamster URLs and extracting video information.
 * The XHamster provider by default keeps video in `AV1` codec which is not widely supported by all players and devices.
 *
 * Remarks: If you face compatibility issues with the downloaded videos,
 * you can set transcode options to re-encode the video using ffmpeg which should resolve most compatibility issues.
 *
 * Also it will be CPU intensive, make sure your OS can handle it
 * Provides mp4 links
 */
export class XHamsterProvider extends BaseProvider<XHamsterExecArgs> {
	protected readonly provider = ProviderType.XHamster;
	private readonly VIDEO_URL_REGEX = /^https:\/\/(?:xhamster|xhopen|xhtotal)(?:\d+)?(?:\.com|\.desi)\/videos\/[\w-]+\/?$/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.XHamster,
			urlPattern: /^(?:xhamster|xhopen|xhtotal)(?:\d+)?(?:\.com|\.desi)$/i,
			metadata: {
				hasHls: true,
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

	private get videoUrl(): string {
		if (this.VIDEO_URL_REGEX.test(this.url)) return this.url;
		throw new GenericException('Invalid XHamster video URL', this.provider, XHamsterMethods.getVideo);
	}

	/**
	 * @returns `XHamsterVideoOutput` containing video metadata and source information.
	 * Fetches video sources from the provided xHamster URL.
	 * @throws `InvalidUrlException` if the provided URL is not a valid xHamster video URL.
	 * true
	 */
	public async getVideo(): Promise<XHamsterVideoOutput> {
		return await this.execute<XHamsterVideoOutput>({
			provider: this.provider,
			extractionTarget: ExtractionTarget.ANCHORS,
			method: XHamsterMethods.getVideo,
			executionShape: 'single',
			targets: [this.videoUrl]
		});
	}
}
