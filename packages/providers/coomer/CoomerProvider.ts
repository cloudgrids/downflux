import { BaseProvider } from '@base';
import { ExtractionTarget, ProviderType } from '@types';

/**
 * Coomer provider.
 * Supports Coomer and Kemono URLs.
 */
export class CoomerProvider extends BaseProvider<any> {
	protected readonly provider = ProviderType.Coomer;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.Coomer,
			urlPattern: /^(?:www\.)?(?:coomer\.(?:st|party)|kemono\.(?:su|party))$/i,
			metadata: {
				hasHls: false,
				hasMp4: true,
				hasKvs: false,
				underGeoRestriction: false,
				requiresBrowser: false,
				canDownload: true,
				underDevelopment: true,
				cloudflareChallenge: false,
				sniSpoofing: 'untested'
			}
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
