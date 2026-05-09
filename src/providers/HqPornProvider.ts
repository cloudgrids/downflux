import { HqPornExecArgs, HqPornVideoOutput } from '@app/contracts';
import { InvalidUrlException } from '@app/exceptions';
import { HqPornMethods, ProviderType, VideoQuality } from '@app/shared';
import { Provider } from './Provider';

export class HqPornProvider extends Provider<HqPornExecArgs> {
	private readonly provider = ProviderType.HqPorn;
	private readonly HOST_REGEX = /^(?:www\.)?hqporn\.(?:com|xxx)$/i;

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

		const isSupportedHost = this.HOST_REGEX.test(new URL(this.url).hostname);

		if (!isSupportedHost) throw new InvalidUrlException(url, this.provider);
	}

	/**
	 * Fetches video information and download URL from the provided HqPorn video page URL.
	 * @returns `HqPornVideoOutput` containing video metadata and download URL.
	 * @throws `InvalidUrlException` if the URL is not a valid HqPorn video page URL.
	 * @throws `GenericException` for any parsing or extraction errors.
	 * @param quality Optional parameter to specify desired video quality. If not provided, all available qualities will be returned.
	 * @canDownload true
	 */
	public async getVideo(quality?: VideoQuality): Promise<HqPornVideoOutput> {
		return await this.execute<HqPornVideoOutput>({
			targets: [this.url],
			provider: this.provider,
			executionShape: 'single',
			method: HqPornMethods.getVideo,
			allowedVideoQuality: quality
		});
	}
}
