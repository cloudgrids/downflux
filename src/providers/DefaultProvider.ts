import { ExtractionTarget, ProviderType } from '@app/shared';
import { Provider } from './Provider';

/**
 * Default provider.
 * Supports generic URL extraction.
 */
export class DefaultProvider extends Provider<any> {
	protected readonly provider = ProviderType.Default;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.Default,
			urlPattern: /\*/i
		});
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
		return this.execute({ extractionTarget: ExtractionTarget.ANCHORS });
	}
}
