import { DefaultStrategy } from './DefaultStrategy';

export class Porn300Strategy extends DefaultStrategy {
	private SUB_DOMAINS = ['porn300.com', 'porn300.net'];

	public getHostFallbackUrls(url: string): string[] {
		return super.getHostFallbackUrls(url, this.SUB_DOMAINS);
	}
}
