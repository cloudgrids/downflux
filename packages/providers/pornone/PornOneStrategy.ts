import { BaseStrategy } from '@base';

export class PornOneStrategy extends BaseStrategy {
	private readonly SUB_DOMAINS = ['pornone.com'];

	public getHostFallbackUrls(url: string): string[] {
		return super.getHostFallbackUrls(url, this.SUB_DOMAINS);
	}
}
