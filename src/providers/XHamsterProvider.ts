import { XHamsterExecArgs, XHamsterVideoOutput } from '@app/contracts';
import { InvalidUrlException } from '@app/exceptions';
import { ExtractionTarget, ProviderType, XHamsterMethods } from '@app/shared';
import { Provider } from './Provider';

/**
 * @class `XHamsterProvider` for handling xHamster URLs and extracting video information.
 * @notes The XHamster provider by default keeps video in `AV1` codec which is not widely supported by all players and devices.
 * @remarks If you face compatibility issues with the downloaded videos,
 * you can set transcode options to re-encode the video using ffmpeg which should resolve most compatibility issues,
 * also it will be CPU intensive, make sure your OS can handle it
 */
export class XHamsterProvider extends Provider<XHamsterExecArgs> {
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
	 * Fetches video information and sources from the provided xHamster URL.
	 * @param url The xHamster video URL to fetch information from.
	 * @returns `XHamsterVideoOutput` containing video metadata and source information.
	 * @throws `InvalidUrlException` if the provided URL is not a valid xHamster video URL.
	 * @notes The method expects the URL to be in the format of a video page on xHamster. If the URL does not match this format, an exception will be thrown.
	 * The method extracts video information such as title, username, thumbnail URL,
	 * and available video sources. It returns this information in a structured format defined by `XHamsterVideoOutput`.
	 * @canDownload true
	 * @remarks The XHamster provider by default keeps video in `AV1` codec which is not widely supported by all players and devices.
	 * If you face compatibility issues with the downloaded videos, you can set transcode options to re-encode the video using ffmpeg which should resolve most compatibility issues,
	 * also it will be CPU intensive, make sure your OS can handle it.
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
