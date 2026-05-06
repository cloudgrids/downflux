import { BaseService } from './BaseService';
import { XHamsterExecArgs, ServiceType } from '../util';
import { InvalidUrlException } from '../exceptions';

export class XHamsterService extends BaseService<XHamsterExecArgs> {
	constructor(url: string) {
		super(url);
		this.validateUrl(url);
	}

	protected override validateUrl(url: string): void {
		try {
			new URL(url);
		} catch {
			throw new InvalidUrlException(url, ServiceType.XHamster);
		}
		if (!url.startsWith('https://...')) throw new InvalidUrlException(url, ServiceType.XHamster);
	}
}
