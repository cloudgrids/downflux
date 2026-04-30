import { InvalidUrlException } from '../exceptions';
import { ServiceType, UrlType } from '../util';
import { BaseService } from './BaseService';

export class CoomerService extends BaseService {
	constructor(url: string) {
		super(url);
		this.validateUrl(url);
	}

	protected override validateUrl(url: string): void {
		let hostname: string;

		try {
			hostname = new URL(url).hostname;
		} catch {
			throw new InvalidUrlException(url, ServiceType.COOMER);
		}

		const isSupportedHost = /^(?:www\.)?(?:coomer\.(?:st|party)|kemono\.(?:su|party))$/i.test(hostname);

		if (!isSupportedHost) throw new InvalidUrlException(url, ServiceType.COOMER);
	}

	public getPosts() {
		return this.execute({ urlType: UrlType.ANCHORS });
	}

	public getAttachments() {
		return this.execute({ urlType: UrlType.ALL_URLS });
	}
}
