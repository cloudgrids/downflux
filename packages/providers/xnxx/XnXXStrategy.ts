import { BaseStrategy } from '@base';

export class XnXXStrategy extends BaseStrategy {
	private SUB_DOMAINS = ['xnxx.com', 'xnxx.health', 'xnxx.tv'];

	public override getHostFallbackUrls(url: string): string[] {
		return super.getHostFallbackUrls(url, this.SUB_DOMAINS);
	}
}
