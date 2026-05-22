import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, Provider } from '@types';
import { EpicGfsExecArgs, EpicGfsVideoOutput } from './EpicGfsContracts';
import { EpicGfsMethods } from './EpicGfsTypes';

/**
 * Public EpicGfs provider entry point.
 *
 * @remarks
 * The provider owns URL validation, fluent execution options, and provider metadata.
 * Supports integrated MP4 downloads, KVS video fields. Marked under development so callers should expect provider-specific changes.
 */
export class EpicGfsProvider extends BaseProvider<EpicGfsExecArgs> {
	protected readonly provider = Provider.EpicGfs;
	private readonly VIDEO_PATH_REGEX = /^https:\/\/(?:www\.)?epicgfs\.(?:com)\/videos\/\d+\/[a-zA-Z0-9_-]+\/(?:\?.*)?/i;

	constructor(url: string) {
		super(url, {
			provider: Provider.EpicGfs,
			urlPattern: /(?:www\.)?epicgfs\.(?:com)$/i,
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

	public async getVideo(): Promise<EpicGfsVideoOutput> {
		return await this.execute<EpicGfsVideoOutput>({
			method: EpicGfsMethods.getVideo,
			extractionTarget: ExtractionTarget.SOURCES,
			provider: this.provider,
			targets: [this.videoUrl],
			executionShape: 'single'
		});
	}
}
