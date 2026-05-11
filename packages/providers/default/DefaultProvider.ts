import { BaseProvider } from '@base';
import { ExtractionTarget, ProviderType } from '@types';
import { DefaultExecArgs } from './DefaultContracts';

/**
 * Default provider.
 * Supports generic URL extraction.
 */
export class DefaultProvider extends BaseProvider<DefaultExecArgs> {
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
