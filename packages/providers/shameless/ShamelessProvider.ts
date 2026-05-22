import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, Provider } from '@types';
import { ShamelessExecArgs, ShamelessVideoOutput } from './ShamelessContracts';
import { ShamelessMethods } from './ShamelessTypes';

/**
 * Public Shameless provider entry point.
 *
 * @remarks
 * The provider owns URL validation, fluent execution options, and provider metadata.
 * Supports integrated MP4 downloads, KVS video fields. Marked under development so callers should expect provider-specific changes.
 */
export class ShamelessProvider extends BaseProvider<ShamelessExecArgs> {
	protected readonly provider = Provider.Shameless;
	private readonly VIDEO_URL_REGEX = /^https:\/\/(?:www\.)?shameless\.(?:com)\/videos\/[^/]+\/$/;

	constructor(url: string) {
		super(url, {
			provider: Provider.Shameless,
			urlPattern: /^(?:www\.)?shameless\.(?:com)$/i,
			metadata: {
				hasHls: false,
				type: 'adult',
				hasMp4: true,
				hlsIntegrated: false,
				mp4Integrated: true,
				requiresLogin: false,
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

	private get videoUrl(): string {
		if (this.VIDEO_URL_REGEX.test(this.url)) return this.url;

		throw new GenericException('Invalid video URL', this.provider);
	}

	public async getVideo(): Promise<ShamelessVideoOutput> {
		return await this.execute<ShamelessVideoOutput>({
			targets: [this.videoUrl],
			provider: this.provider,
			method: ShamelessMethods.getVideo,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
