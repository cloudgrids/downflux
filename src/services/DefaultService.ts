import { InvalidUrlException } from '../exceptions';
import { ServiceType, UrlType } from '../util';
import { BaseService } from './BaseService';

export class DefaultService extends BaseService {
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

	public getRawHtml() {
		return this.execute();
	}

	public getLinks() {
		return this.execute({ urlType: UrlType.ANCHORS });
	}
}
