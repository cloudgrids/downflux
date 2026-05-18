import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { DaNudeExecArgs, DaNudeVideoOutput } from './DaNudeContracts';
import { DaNudeMethods } from './DaNudeTypes';

export class DaNudeProvider extends BaseProvider<DaNudeExecArgs> {
	protected readonly provider = ProviderType.DaNude;
	private readonly VIDEO_PATH_REGEX = /^https:\/\/(?:www\.)?danude\.(?:com)\/videos\/\d+\/[a-zA-Z0-9_-]+\/(?:\?.*)?/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.DaNude,
			urlPattern: /(?:www\.)?danude\.(?:com)$/i,
			metadata: {
				hasHls: false,
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

	public async getVideo(): Promise<DaNudeVideoOutput> {
		return await this.execute<DaNudeVideoOutput>({
			method: DaNudeMethods.getVideo,
			extractionTarget: ExtractionTarget.SOURCES,
			provider: this.provider,
			targets: [this.videoUrl],
			executionShape: 'single'
		});
	}
}
