import { BaseStrategy } from '@base';

export class XGroovyStrategy extends BaseStrategy {
	private SUB_DOMAINS = [
		'xgroovy.com',
		'rt.xgroovy.com',
		'pt.xgroovy.com',
		'de.xgroovy.com',
		'es.xgroovy.com',
		'it.xgroovy.com',
		'jp.xgroovy.com',
		'ko.xgroovy.com',
		'nl.xgroovy.com',
		'pl.xgroovy.com',
		'fr.xgroovy.com',
		'xgroovy-fr.com'
	];

	public override getHostFallbackUrls(url: string): string[] {
		return super.getHostFallbackUrls(url, this.SUB_DOMAINS);
	}
}
