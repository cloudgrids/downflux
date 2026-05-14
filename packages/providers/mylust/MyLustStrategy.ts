import { BaseStrategy } from '@base';

export class MyLustStrategy extends BaseStrategy {
	private SUB_DOMAINS = ['mylust.com', 'ru.mylust.com', 'de.mylust.com'];

	public override getHostFallbackUrls(url: string): string[] {
		return super.getHostFallbackUrls(url, this.SUB_DOMAINS);
	}
}
