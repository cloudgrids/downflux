import { InvalidUrlException } from '../exceptions';
import { ServiceType, UrlType } from '../util';
import { BaseService } from './BaseService';

/**
 * Default service.
 * Supports generic URL extraction.
 */
export class DefaultService extends BaseService<any> {
	private readonly service = ServiceType.Default;

	constructor(url: string) {
		super(url);
		this.validate(url);
	}

	protected override validate(url: string): void {
		try {
			new URL(url);
		} catch {
			throw new InvalidUrlException(url, this.service);
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
