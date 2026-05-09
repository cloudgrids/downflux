import { InvalidUrlException } from '@app/exceptions';
import { ProviderType, UrlType } from '@app/shared';
import { Provider } from './Provider';

/**
 * Default provider.
 * Supports generic URL extraction.
 */
export class DefaultProvider extends Provider<any> {
	private readonly provider = ProviderType.Default;

	constructor(url: string) {
		super(url);
		this.validate(url);
	}

	protected override validate(url: string): void {
		try {
			new URL(url);
		} catch {
			throw new InvalidUrlException(url, this.provider);
		}
	}

	/**
	 * Gets raw default metadata.
	 * @returns Extracted default result array
	 */
	public getRawHtml() {
		return this.execute();
	}

	/**
	 * Gets links.
	 * @returns Extracted anchor result array
	 */
	public getLinks() {
		return this.execute({ urlType: UrlType.ANCHORS });
	}
}
