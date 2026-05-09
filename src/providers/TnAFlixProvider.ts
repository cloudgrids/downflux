import { TnAFlixExecArgs } from '@app/contracts';
import { InvalidUrlException } from '@app/exceptions';
import { ProviderType } from '@app/shared';
import { Provider } from './Provider';

export class TnAFlixProvider extends Provider<TnAFlixExecArgs> {
	private readonly provider = ProviderType.TnAFlix;

	constructor(url: string) {
		super(url);
		this.validate(url);
	}

	protected override validate(url: string): void {
		try {
			new URL(url);
		} catch {
			throw new InvalidUrlException(url, this.provider);
		}
		if (!url.startsWith('https://...')) throw new InvalidUrlException(url, this.provider);
	}
}
