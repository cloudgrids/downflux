import { BaseStrategy } from '@base';

export class PerfectGirlsStrategy extends BaseStrategy {
	private readonly SUB_DOMAINS = ['perfectdamen.co', 'perfectgirls.xxx'];

	public override getHostFallbackUrls(url: string) {
		return super.getHostFallbackUrls(url, this.SUB_DOMAINS);
	}
}
