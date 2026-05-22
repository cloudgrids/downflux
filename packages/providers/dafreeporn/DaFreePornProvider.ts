import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, Provider } from '@types';
import { DaFreePornExecArgs, DaFreePornVideoOutput } from './DaFreePornContracts';
import { DaFreePornMethods } from './DaFreePornTypes';

/**
 * Public DaFreePorn provider entry point.
 *
 * @remarks
 * The provider owns URL validation, fluent execution options, and provider metadata.
 * Supports integrated MP4 downloads, KVS video fields. Marked under development so callers should expect provider-specific changes.
 */
export class DaFreePornProvider extends BaseProvider<DaFreePornExecArgs> {
	protected readonly provider = Provider.DaFreePorn;
	private readonly VIDEO_PATH_REGEX = /^https:\/\/(?:www\.)?dafreeporn\.(?:com)\/videos\/\d+\/[a-zA-Z0-9_-]+\/(?:\?.*)?/i;

	constructor(url: string) {
		super(url, {
			provider: Provider.DaFreePorn,
			urlPattern: /(?:www\.)?dafreeporn\.(?:com)$/i,
			metadata: {
				hasHls: false,
				type: 'adult',
				hasMp4: true,
				hasKvs: true,
				canDownload: true,
				hlsIntegrated: false,
				mp4Integrated: true,
				underDevelopment: true,
				requiresBrowser: false,
				sniSpoofing: 'untested',
				underGeoRestriction: false
			}
		});
	}

	private get videoUrl(): string {
		if (this.VIDEO_PATH_REGEX.test(this.url)) return this.url;

		throw new GenericException('Invalid url format', this.provider);
	}

	public async getVideo(): Promise<DaFreePornVideoOutput> {
		return await this.execute<DaFreePornVideoOutput>({
			method: DaFreePornMethods.getVideo,
			extractionTarget: ExtractionTarget.SOURCES,
			provider: this.provider,
			targets: [this.videoUrl],
			executionShape: 'single'
		});
	}
}
