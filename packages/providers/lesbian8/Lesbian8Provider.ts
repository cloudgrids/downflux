import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, Provider } from '@types';
import { Lesbian8ExecArgs, Lesbian8VideoOutput } from './Lesbian8Contracts';
import { Lesbian8Methods } from './Lesbian8Types';

/**
 * Public Lesbian8 provider entry point.
 *
 * @remarks
 * The provider owns URL validation, fluent execution options, and provider metadata.
 * Supports integrated MP4 downloads, KVS video fields. Marked under development so callers should expect provider-specific changes.
 */
export class Lesbian8Provider extends BaseProvider<Lesbian8ExecArgs> {
	protected readonly provider = Provider.Lesbian8;
	private VIDEO_REGEX_PATH = /^https:\/\/(?:www\.)?lesbian8\.(?:com|net)\/videos\/[\d]+\/[^/]+\/(?:\?.*?)?$/i;

	constructor(url: string) {
		super(url, {
			provider: Provider.Lesbian8,
			urlPattern: /(?:www\.)?lesbian8\.(?:com|net)$/i,
			metadata: {
				hasHls: false,
				type: 'adult',
				hasMp4: true,
				hasKvs: true,
				hlsIntegrated: false,
				mp4Integrated: true,
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
		const match = this.url.match(this.VIDEO_REGEX_PATH);

		if (!match) throw new GenericException('Invalid video url', this.provider);

		return this.url;
	}

	public async getVideo(): Promise<Lesbian8VideoOutput> {
		return await this.execute<Lesbian8VideoOutput>({
			targets: [this.videoUrl],
			provider: this.provider,
			method: Lesbian8Methods.getVideo,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
