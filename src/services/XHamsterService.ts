import { InvalidUrlException } from '../exceptions';
import { ServiceType, UrlType, XHamsterExecArgs, XHamsterMethods, XHamsterVideoOutput } from '../util';
import { BaseService } from './BaseService';

export class XHamsterService extends BaseService<XHamsterExecArgs> {
	private readonly service = ServiceType.XHamster;
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
			throw new InvalidUrlException(url, this.service);
		}
		const isSupportedHost = this.HOST_REGEX.test(parsed.hostname);

		if (!isSupportedHost) throw new InvalidUrlException(url, this.service);
	}

	private get VIDEO_URL() {
		return `${this.ORIGIN}/videos`;
	}

	private get isVideoPath() {
		return /^https:\/\/(?:xhamster|xhopen|xhtotal)(?:\d+)?(?:\.com|\.desi)\/videos\/[\w-]+\/?$/.test(this.url);
	}

	public async getVideo(): Promise<XHamsterVideoOutput> {
		if (!this.isVideoPath) throw new InvalidUrlException(this.url, this.service);

		return await this.execute<XHamsterVideoOutput>({
			service: this.service,
			urlType: UrlType.ANCHORS,
			method: XHamsterMethods.getVideo,
			returnType: 'object',
			targets: [this.url]
		});
	}
}
