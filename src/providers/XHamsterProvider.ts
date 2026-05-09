import { XHamsterExecArgs, XHamsterVideoOutput } from '@app/contracts';
import { InvalidUrlException } from '@app/exceptions';
import { ProviderType, UrlType, XHamsterMethods } from '@app/shared';
import { Provider } from './Provider';

/**
 * @class `XHamsterProvider` for handling xHamster URLs and extracting video information.
 * @notes The XHamster provider by default keeps video in `AV1` codec which is not widely supported by all players and devices.
 * @remarks If you face compatibility issues with the downloaded videos,
 * you can set transcode options to re-encode the video using ffmpeg which should resolve most compatibility issues,
 * also it will be CPU intensive, make sure your OS can handle it
 */
export class XHamsterProvider extends Provider<XHamsterExecArgs> {
	private readonly provider = ProviderType.XHamster;
	private readonly HOST_REGEX = /^(?:xhamster|xhopen|xhtotal)(?:\d+)?(?:\.com|\.desi)$/i;

	constructor(url: string) {
		super(url);
		this.validate(url);
	}

	protected override validate(url: string): void {
		let parsed: URL;

		try {
			parsed = new URL(url);
		} catch {
			throw new InvalidUrlException(url, this.provider);
		}
		const isSupportedHost = this.HOST_REGEX.test(parsed.hostname);

		if (!isSupportedHost) throw new InvalidUrlException(url, this.provider);
	}

	private get VIDEO_URL() {
		return `${this.ORIGIN}/videos`;
	}

	private get isVideoPath() {
		return /^https:\/\/(?:xhamster|xhopen|xhtotal)(?:\d+)?(?:\.com|\.desi)\/videos\/[\w-]+\/?$/.test(this.url);
	}

	public async getVideo(): Promise<XHamsterVideoOutput> {
		if (!this.isVideoPath) throw new InvalidUrlException(this.url, this.provider);

		return await this.execute<XHamsterVideoOutput>({
			provider: this.provider,
			urlType: UrlType.ANCHORS,
			method: XHamsterMethods.getVideo,
			executionShape: 'single',
			targets: [this.url]
		});
	}
}
