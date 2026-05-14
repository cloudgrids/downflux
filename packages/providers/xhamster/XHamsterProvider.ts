import { BaseProvider } from '@base';
import { InvalidUrlException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { XHamsterExecArgs, XHamsterVideoOutput } from './XHamsterContracts';
import { XHamsterMethods } from './XHamsterTypes';

/**
 * @class `XHamsterProvider` for handling xHamster URLs and extracting video information.
 * The XHamster provider by default keeps video in `AV1` codec which is not widely supported by all players and devices.
 * remarks If you face compatibility issues with the downloaded videos,
 * you can set transcode options to re-encode the video using ffmpeg which should resolve most compatibility issues,
 * also it will be CPU intensive, make sure your OS can handle it
 * Provides mp4 links
 */
export class XHamsterProvider extends BaseProvider<XHamsterExecArgs> {
	protected readonly provider = ProviderType.XHamster;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.XHamster,
			urlPattern: /^(?:xhamster|xhopen|xhtotal)(?:\d+)?(?:\.com|\.desi)$/i
		});
	}

	private get VIDEO_URL() {
		return `${this.ORIGIN}/videos`;
	}

	private get isVideoPath() {
		return /^https:\/\/(?:xhamster|xhopen|xhtotal)(?:\d+)?(?:\.com|\.desi)\/videos\/[\w-]+\/?$/.test(this.url);
	}

	/**
	 * @returns `XHamsterVideoOutput` containing video metadata and source information.
	 * Fetches video sources from the provided xHamster URL.
	 * @throws `InvalidUrlException` if the provided URL is not a valid xHamster video URL.
	 * true
	 */
	public async getVideo(): Promise<XHamsterVideoOutput> {
		if (!this.isVideoPath) throw new InvalidUrlException(this.url, this.provider);

		return await this.execute<XHamsterVideoOutput>({
			provider: this.provider,
			extractionTarget: ExtractionTarget.ANCHORS,
			method: XHamsterMethods.getVideo,
			executionShape: 'single',
			targets: [this.url]
		});
	}
}
