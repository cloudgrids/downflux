import { BaseStrategy } from '@base';

export class PornDoeStrategy extends BaseStrategy {
	private readonly SUB_DOMAINS = [
		'porndoe.com',
		'en.porndoe.com',
		'pt.porndoe.com',
		'de.porndoe.com',
		'es.porndoe.com',
		'fr.porndoe.com',
		'it.porndoe.com'
	];

	public override getHostFallbackUrls(url: string): string[] {
		return super.getHostFallbackUrls(url, this.SUB_DOMAINS);
	}
}
