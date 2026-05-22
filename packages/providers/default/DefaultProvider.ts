import { BaseProvider, DefaultMethods } from '@base';
import { ExtractionTarget, Provider } from '@types';
import { DefaultExecArgs } from './DefaultContracts';

/**
 * Default provider.
 * Supports generic URL extraction.
 */
export class DefaultProvider extends BaseProvider<DefaultExecArgs> {
	protected readonly provider = Provider.Default;

	constructor(url: string) {
		super(url, {
			provider: Provider.Default,
			urlPattern: /\*/i,
			metadata: {
				hasHls: true,
				type: 'adult',
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
	 * Gets links.
	 * @returns Extracted anchor result array
	 */
	public async getLinks(): Promise<string[]> {
		return await this.execute<string[]>({
			provider: this.provider,
			method: DefaultMethods.getLinks,
			extractionTarget: ExtractionTarget.ANCHORS,
			executionShape: 'multiple',
			targets: [this.url]
		});
	}

	/**
	 * Gets images.
	 * @returns Extracted image result array
	 */
	public async getImages(): Promise<string[]> {
		return await this.execute<string[]>({
			provider: this.provider,
			method: DefaultMethods.getImages,
			extractionTarget: ExtractionTarget.IMAGES,
			executionShape: 'multiple',
			targets: [this.url]
		});
	}

	/**
	 * Gets videos.
	 * @returns Extracted video result array
	 */
	public async getVideos(): Promise<string[]> {
		return await this.execute<string[]>({
			provider: this.provider,
			method: DefaultMethods.getVideos,
			extractionTarget: ExtractionTarget.SOURCES,
			executionShape: 'multiple',
			targets: [this.url]
		});
	}

	/**
	 * Gets audio.
	 * @returns Extracted audio result array
	 */
	public async getAudio(): Promise<string[]> {
		return await this.execute<string[]>({
			provider: this.provider,
			method: DefaultMethods.getAudio,
			extractionTarget: ExtractionTarget.SOURCES,
			executionShape: 'multiple',
			targets: [this.url]
		});
	}
}
