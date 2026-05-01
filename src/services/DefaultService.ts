import { InvalidUrlException } from '../exceptions';
import { ServiceType, UrlType } from '../util';
import { BaseService } from './BaseService';

/**
 * Default service.
 * Supports generic URL extraction.
 */
export class DefaultService extends BaseService<any> {
	/**
	 * Creates a default extraction service.
	 * @param url Any valid URL
	 * @throws InvalidUrlException When the URL is invalid
	 */
	constructor(url: string) {
		super(url);
		this.validateUrl(url);
	}

	protected override validateUrl(url: string): void {
		try {
			new URL(url);
		} catch {
			throw new InvalidUrlException(url, ServiceType.DEFAULT);
		}
	}

	/**
	 * Gets raw default metadata.
	 * @returns Extracted default result array
	 */
	public getRawHtml() {
		return this.execute();
	}

	/**
	 * Gets links.
	 * @returns Extracted anchor result array
	 */
	public getLinks() {
		return this.execute({ urlType: UrlType.ANCHORS });
	}
}
