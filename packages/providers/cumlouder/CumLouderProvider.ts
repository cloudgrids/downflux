import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { CumLouderExecArgs, CumLouderVideoOutput } from './CumLouderContracts';
import { CumLouderMethods } from './CumLouderTypes';

/**
 * @class `CumLouderProvider`
 * @throws `ECONNRESET` or similar network errors if the CumLouder website is `inaccessible` from the provider's `location`.
 * The provider is still under development and may not support all video formats or qualities available on CumLouder.
 * Default video quality is set to `QUnknown` due to limitations in the source HTML,
 * but this may be refined in the future as the provider is further developed and improved.
 */
export class CumLouderProvider extends BaseProvider<CumLouderExecArgs> {
	protected readonly provider = ProviderType.CumLouder;
	private readonly VIDEO_REGEX_PATH =
		/^https:\/\/(?:www\.)?cumlouder\.(?:com)\/(?:(?:es|it|fr|de|nl|br)\/)?(?:porn-video|videos)\/([^./]+)\/$/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.CumLouder,
			urlPattern: /^(?:www\.)?cumlouder\.(?:com)$/i,
			metadata: {
				hasHls: false,
				hasMp4: true,
				hasKvs: false,
				underGeoRestriction: false,
				requiresBrowser: false,
				canDownload: true,
				underDevelopment: true,
				cloudflareChallenge: false,
				sniSpoofing: 'failed'
			}
		});
	}

	get videoUrl(): string {
		if (this.VIDEO_REGEX_PATH.test(this.url)) return this.url;

		throw new GenericException('Invalid video url', this.provider);
	}

	public async getVideo(): Promise<CumLouderVideoOutput> {
		return await this.execute<CumLouderVideoOutput>({
			targets: [this.videoUrl],
			provider: this.provider,
			method: CumLouderMethods.getVideo,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
