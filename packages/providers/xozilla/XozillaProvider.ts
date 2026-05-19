import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { XozillaExecArgs, XozillaVideoOutput } from './XozillaContracts';
import { XozillaMethods } from './XozillaTypes';

export class XozillaProvider extends BaseProvider<XozillaExecArgs> {
	protected readonly provider = ProviderType.Xozilla;
	private readonly VIDEO_PATH_REGEX = /^https:\/\/(?:www\.)?xozilla\.(?:com|xxx)\/videos\/\d+\/[a-zA-Z0-9_-]+\/(?:\?.*)?/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.Xozilla,
			urlPattern: /(?:www\.)?xozilla\.(?:com|xxx)$/i,
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

	public async getVideo(): Promise<XozillaVideoOutput> {
		return await this.execute<XozillaVideoOutput>({
			method: XozillaMethods.getVideo,
			extractionTarget: ExtractionTarget.SOURCES,
			provider: this.provider,
			targets: [this.videoUrl],
			executionShape: 'single'
		});
	}
}
