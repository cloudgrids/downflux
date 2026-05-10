import { DefaultStrategy } from './DefaultStrategy';

export class PornOneStrategy extends DefaultStrategy {
	private readonly SUB_DOMAINS = ['pornone.com'];

	public getHostFallbackUrls(url: string): string[] {
		return super.getHostFallbackUrls(url, this.SUB_DOMAINS);
	}
}
