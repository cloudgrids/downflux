import { InvalidUrlException } from '../exceptions';
import { ServiceType, UrlType } from '../util';
import { BaseService } from './BaseService';

/**
 * Coomer service.
 * Supports Coomer and Kemono URLs.
 */
export class CoomerService extends BaseService<any> {
	private readonly service = ServiceType.Coomer;

	constructor(url: string) {
		super(url);
		this.validate(url);
	}

	protected override validate(url: string): void {
		let hostname: string;

		try {
			hostname = new URL(url).hostname;
		} catch {
			throw new InvalidUrlException(url, this.service);
		}

		const isSupportedHost = /^(?:www\.)?(?:coomer\.(?:st|party)|kemono\.(?:su|party))$/i.test(hostname);

		if (!isSupportedHost) throw new InvalidUrlException(url, this.service);
	}

	/**
	 * Gets post links.
	 * @returns Extracted post link results
	 */
	public getPosts() {
		return this.execute({ urlType: UrlType.ANCHORS });
	}

	/**
	 * Gets attachment URLs.
	 * @returns Extracted attachment URL results
	 */
	public getAttachments() {
		return this.execute({ urlType: UrlType.ALL_URLS });
	}
}
