import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { PussySpaceExecArgs, PussySpaceVideoOutput } from './PussySpaceContracts';
import { PussySpaceMethods } from './PussySpaceTypes';

export class PussySpaceProvider extends BaseProvider<PussySpaceExecArgs> {
	protected readonly provider = ProviderType.PussySpace;
	private readonly VIDEO_REGEX_PATH = /^https:\/\/(?:www\.)?pussyspace\.(?:com)\/vid-([a-z-0-9A-Z-.]+)\/(?:\?.*)?/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.PussySpace,
			urlPattern: /^(?:www\.)?pussyspace\.(?:com)$/i,
			metadata: {
				hasHls: false,
				hasMp4: true,
				hlsIntegrated: false,
				mp4Integrated: true,
				requiresLogin: false,
				needsExternalAPI: true,
				hasKvs: false,
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
		if (this.VIDEO_REGEX_PATH.test(this.url)) return this.url;

		throw new GenericException('Invalid video url', this.provider);
	}

	public async getVideo(): Promise<PussySpaceVideoOutput> {
		return await this.execute<PussySpaceVideoOutput>({
			targets: [this.videoUrl],
			provider: this.provider,
			method: PussySpaceMethods.getVideo,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
