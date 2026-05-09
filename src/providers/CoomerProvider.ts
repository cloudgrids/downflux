import { InvalidUrlException } from '@app/exceptions';
import { ExtractionTarget, ProviderType } from '@app/shared';
import { Provider } from './Provider';

/**
 * Coomer provider.
 * Supports Coomer and Kemono URLs.
 */
export class CoomerProvider extends Provider<any> {
	private readonly provider = ProviderType.Coomer;

	constructor(url: string) {
		super(url);
		this.validate(url);
	}

	protected override validate(url: string): void {
		let hostname: string;

		try {
			hostname = new URL(url).hostname;
		} catch {
			throw new InvalidUrlException(url, this.provider);
		}

		const isSupportedHost = /^(?:www\.)?(?:coomer\.(?:st|party)|kemono\.(?:su|party))$/i.test(hostname);

		if (!isSupportedHost) throw new InvalidUrlException(url, this.provider);
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
