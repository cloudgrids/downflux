import { BaseProvider } from '@base';
import { ExtractionTarget, Provider, VideoQuality } from '@types';
import { TnAFlixExecArgs, TnAFlixVideoOutput } from './TnAFlixContracts';
import { TnAFlixMethods } from './TnAFlixTypes';

/**
 * @class TnAFlix provider.
 * Operations: operations related to TnAFlix.
 * Due to `Recv failure: Connection reset by peer` due to region-based restrictions,
 * this provider is currently only tested to work with VPN enabled and set to US region.
 * remarks The provider is expected to work without VPN as well, but it is not tested yet.
 * It might not work in some regions due to the mentioned restriction, but it should work in most regions.
 * Provides mp4 links
 */
export class TnAFlixProvider extends BaseProvider<TnAFlixExecArgs> {
	protected readonly provider = Provider.TnAFlix;

	constructor(url: string) {
		super(url, {
			provider: Provider.TnAFlix,
			urlPattern: /^(?:www\.)?tnaflix\.(?:com)$/i,
			metadata: {
				hasHls: false,
				type: 'adult',
				hasMp4: true,
				hlsIntegrated: false,
				mp4Integrated: true,
				hasKvs: false,
				underGeoRestriction: true,
				requiresBrowser: false,
				canDownload: true,
				underDevelopment: true,
				cloudflareChallenge: false,
				sniSpoofing: 'untested'
			}
		});
	}

	/**
	 * @returns `TnAFlixVideoOutput` containing video metadata and source information.
	 * Fetches video sources from the provided TnAFlix URL.
	 * @param quality Optional parameter to specify desired video quality. If not provided, all available qualities will be returned.
	 * @throws `GenericException` when the video sources cannot be extracted
	 * `true`
	 */
	public async getVideo(quality?: VideoQuality): Promise<TnAFlixVideoOutput> {
		return await this.execute<TnAFlixVideoOutput>({
			targets: [this.url],
			provider: this.provider,
			executionShape: 'single',
			method: TnAFlixMethods.getVideo,
			extractionTarget: ExtractionTarget.SOURCES,
			allowedVideoQuality: quality
		});
	}
}
