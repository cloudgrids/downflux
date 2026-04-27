import { UrlType } from '../../enums';
import { BaseService } from '../BaseService';

export class DefaultService extends BaseService {
	constructor(url: string) {
		super(url);
	}

	public getRawHtml() {
		return this.execute();
	}

	public getLinks() {
		return this.execute({ urlType: UrlType.ANCHORS });
	}
}
