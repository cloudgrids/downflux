import { BaseService } from './BaseService';
import { TnAFlixExecArgs, ServiceType } from '../util';
import { InvalidUrlException } from '../exceptions';

export class TnAFlixService extends BaseService<TnAFlixExecArgs> {
	constructor(url: string) {
		super(url);
		this.validateUrl(url);
	}

	protected override validateUrl(url: string): void {
		try {
			new URL(url);
		} catch {
			throw new InvalidUrlException(url, ServiceType.TnAFlix);
		}
		if (!url.startsWith('https://...')) throw new InvalidUrlException(url, ServiceType.TnAFlix);
	}
}
