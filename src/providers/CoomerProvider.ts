import { ExtractionTarget, ProviderType } from '@app/shared';
import { Provider } from './Provider';

/**
 * Coomer provider.
 * Supports Coomer and Kemono URLs.
 */
export class CoomerProvider extends Provider<any> {
	protected readonly provider = ProviderType.Coomer;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.Coomer,
			urlPattern: /^(?:www\.)?(?:coomer\.(?:st|party)|kemono\.(?:su|party))$/i
		});
	}

	/**
	 * Gets post links.
	 * @returns Extracted post link results
	 */
	public getPosts() {
		return this.execute({ extractionTarget: ExtractionTarget.ANCHORS });
	}

	/**
	 * Gets attachment URLs.
	 * @returns Extracted attachment URL results
	 */
	public getAttachments() {
		return this.execute({ extractionTarget: ExtractionTarget.ALL_URLS });
	}
}
