import { UrlType } from '../types';
import { BaseProvider } from './BaseProvider';

export class DefaultProvider extends BaseProvider {
	constructor(url: string) {
		super(url);
	}

	public getRawHtml() {
		this.chain.push({ method: 'getRawHtml', args: [] });
		return this;
	}

	public getLinks() {
		this.chain.push({ method: 'getLinks', args: [], urlType: UrlType.ANCHORS });
		return this;
	}
}
