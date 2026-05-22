import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, Provider } from '@types';
import { BlackPornExecArgs, BlackPornVideoOutput } from './BlackPornContracts';
import { BlackPornMethods } from './BlackPornTypes';

export class BlackPornProvider extends BaseProvider<BlackPornExecArgs> {
	protected readonly provider = Provider.BlackPorn;
	private readonly VIDEO_PATH_REGEX = /^https:\/\/(?:www\.)?blackporn\.(?:tube)\/video\/\d+\/[a-zA-Z0-9_-]+\/(?:\?.*)?$/i;

	constructor(url: string) {
		super(url, {
			provider: Provider.BlackPorn,
			urlPattern: /^(?:www\.)?blackporn\.(?:tube)$/i,
			metadata: {
				hasHls: false,
				type: 'adult',
				hasMp4: true,
				hasKvs: false,
				requiresBrowser: false,
				sniSpoofing: 'untested',
				underGeoRestriction: false,
				underDevelopment: true,
				needsExternalAPI: false,
				canDownload: false
			}
		});
	}

	private get videoUrl(): string {
		if (this.VIDEO_PATH_REGEX.test(this.url)) return this.url;

		throw new GenericException('Invalid url format', this.provider);
	}

	public async getVideo(): Promise<BlackPornVideoOutput> {
		return await this.execute<BlackPornVideoOutput>({
			method: BlackPornMethods.getVideo,
			provider: this.provider,
			targets: [this.videoUrl],
			extractionTarget: ExtractionTarget.SOURCES,
			executionShape: 'single'
		});
	}
}
