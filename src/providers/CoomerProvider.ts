import { UrlType } from '../types';
import { BaseProvider } from './BaseProvider';

export class CoomerProvider extends BaseProvider {
	constructor(url: string) {
		super(url);
	}

	public getPosts() {
		this.chain.push({ method: 'getPosts', args: [], urlType: UrlType.ANCHORS });
		return this;
	}

	public getAttachments() {
		this.chain.push({ method: 'getAttachments', args: [], urlType: UrlType.ALL_URLS });
		return this;
	}
}
