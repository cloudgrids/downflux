import { BaseStrategy } from '@base';

export class Porn300Strategy extends BaseStrategy {
	private SUB_DOMAINS = ['porn300.com', 'porn300.net'];

	public getHostFallbackUrls(url: string): string[] {
		return super.getHostFallbackUrls(url, this.SUB_DOMAINS);
	}
}
