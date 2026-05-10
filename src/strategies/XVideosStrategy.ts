import { DefaultStrategy } from './DefaultStrategy';

export class XVideosStrategy extends DefaultStrategy {
	private readonly SUB_DOMAINS = ['xvideos.com', 'xvideos2.com', 'xvideos3.com', 'xvideos1.com'];

	public override getHostFallbackUrls(url: string): string[] {
		return super.getHostFallbackUrls(url, this.SUB_DOMAINS);
	}
}
