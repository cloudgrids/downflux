import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { MegaTubeExecArgs, MegaTubeVideoOutput } from './MegaTubeContracts';
import { MegaTubeMethods } from './MegaTubeTypes';

/**
 * @class `MegaTubeProvider`
 * Does not exposes video quality information due to limitations in the source HTML,
 * but provides all available video URLs along with posters.
 */
export class MegaTubeProvider extends BaseProvider<MegaTubeExecArgs> {
	protected readonly provider = ProviderType.MegaTube;
	private readonly VIDEO_REGEX_PATH = /^https:\/\/(?:www\.)?megatube\.(?:xxx)\/videos\/[\d]+\/[^/]+\/$/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.MegaTube,
			urlPattern: /^(?:www\.)?megatube\.(?:xxx)$/i,
			metadata: {
				hasHls: false,
				hasMp4: true,
				hlsIntegrated: false,
				mp4Integrated: true,
				hasKvs: true,
				underGeoRestriction: false,
				requiresBrowser: false,
				canDownload: true,
				underDevelopment: true,
				cloudflareChallenge: false,
				sniSpoofing: 'untested'
			}
		});
	}

	get videoUrl(): string {
		const match = this.url.match(this.VIDEO_REGEX_PATH);

		if (!match) throw new GenericException('Invalid video url', this.provider);

		return this.url;
	}

	public async getVideo(): Promise<MegaTubeVideoOutput> {
		return await this.execute<MegaTubeVideoOutput>({
			targets: [this.videoUrl],
			provider: this.provider,
			method: MegaTubeMethods.getVideo,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
