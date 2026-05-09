import { InvalidUrlException } from '../exceptions';
import { ServiceType, TnAFlixExecArgs } from '../util';
import { BaseService } from './BaseService';

export class TnAFlixService extends BaseService<TnAFlixExecArgs> {
	private readonly service = ServiceType.TnAFlix;

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
		if (!url.startsWith('https://...')) throw new InvalidUrlException(url, this.service);
	}
}
