import { UrlType } from '../enums';
import { BaseService } from './BaseService';

export class CoomerService extends BaseService {
	constructor(url: string) {
		super(url);
	}

	public getPosts() {
		return this.execute({ urlType: UrlType.ANCHORS });
	}

	public getAttachments() {
		return this.execute({ urlType: UrlType.ALL_URLS });
	}
}
