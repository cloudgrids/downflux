import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { Lesbian8ExecArgs, Lesbian8VideoOutput } from './Lesbian8Contracts';
import { Lesbian8Methods } from './Lesbian8Types';

export class Lesbian8Provider extends BaseProvider<Lesbian8ExecArgs> {
	protected readonly provider = ProviderType.Lesbian8;
	private VIDEO_REGEX_PATH = /^https:\/\/(?:www\.)?lesbian8\.(?:com|net)\/videos\/[\d]+\/[^/]+\/(?:\?.*?)?$/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.Lesbian8,
			urlPattern: /(?:www\.)?lesbian8\.(?:com|net)$/i,
			metadata: {
				hasHls: false,
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

	get videoUrl(): string {
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
