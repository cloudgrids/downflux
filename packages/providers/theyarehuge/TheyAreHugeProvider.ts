import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { TheyAreHugeExecArgs, TheyAreHugeVideoOutput } from './TheyAreHugeContracts';
import { TheyAreHugeMethods } from './TheyAreHugeTypes';

/**
 * @class TheyAreHugeProvider
 * TheyAreHugeProvider is responsible for handling all interactions with the TheyAreHuge service.
 * Available video qualities are `240p` and `480p`. The provider will attempt to fetch both, but availability may vary based on the video.
 * @todo Currently, it can't fetch the video qualities over 720p due to login requirement, but it can fetch 240p and 480p qualities without login.
 * Under development.
 */
export class TheyAreHugeProvider extends BaseProvider<TheyAreHugeExecArgs> {
	protected readonly provider = ProviderType.TheyAreHuge;
	private VIDEO_REGEX_PATH = /^https:\/\/(?:www\.)?theyarehuge\.(?:com)\/v\/([a-zA-Z-0-9.]+)(?:\?.*)?/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.TheyAreHuge,
			urlPattern: /^(?:www\.)?theyarehuge\.(?:com)$/i
		});
	}

	get videoUrl(): string {
		const match = this.url.match(this.VIDEO_REGEX_PATH);

		if (!match) throw new GenericException('Invalid video url', this.provider);

		return this.url;
	}

	/**
	 * @returns `TheyAreHugeVideoOutput` with video metadata and source URLs.
	 * Fetches video sources from the provided URL.
	 * @throws `GenericException` when the video sources cannot be extracted
	 * `true`
	 * remarks Available video qualities are `240p` and `480p`.
	 */
	public async getVideo(): Promise<TheyAreHugeVideoOutput> {
		return await this.execute<TheyAreHugeVideoOutput>({
			targets: [this.videoUrl],
			provider: this.provider,
			method: TheyAreHugeMethods.getVideo,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
