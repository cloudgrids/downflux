import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { ItsPornExecArgs, ItsPornVideoOutput } from './ItsPornContracts';
import { ItsPornMethods } from './ItsPornTypes';

export class ItsPornProvider extends BaseProvider<ItsPornExecArgs> {
	protected readonly provider = ProviderType.ItsPorn;
	private readonly VIDEO_PATH_REGEX = /^https:\/\/(?:www\.)?its\.(?:porn)\/video\/[a-zA-Z0-9_-]+\/(?:\?.*)?/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.ItsPorn,
			urlPattern: /(?:www\.)?its\.(?:porn)$/i,
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

	public async getVideo(): Promise<ItsPornVideoOutput> {
		return await this.execute<ItsPornVideoOutput>({
			method: ItsPornMethods.getVideo,
			extractionTarget: ExtractionTarget.SOURCES,
			provider: this.provider,
			targets: [this.videoUrl],
			executionShape: 'single'
		});
	}
}
