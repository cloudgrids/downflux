import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { XDeguExecArgs, XDeguVideoOutput } from './XDeguContracts';
import { XDeguMethods } from './XDeguTypes';

export class XDeguProvider extends BaseProvider<XDeguExecArgs> {
	protected readonly provider = ProviderType.XDegu;
	private readonly VIDEO_PATH_REGEX = /^https:\/\/(?:www\.)?xdegu\.(?:com)\/videos\/\d+\/[a-zA-Z0-9_-]+\/(?:\?.*)?/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.XDegu,
			urlPattern: /(?:www\.)?xdegu\.(?:com)$/i,
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

	public async getVideo(): Promise<XDeguVideoOutput> {
		return await this.execute<XDeguVideoOutput>({
			method: XDeguMethods.getVideo,
			extractionTarget: ExtractionTarget.SOURCES,
			provider: this.provider,
			targets: [this.videoUrl],
			executionShape: 'single'
		});
	}
}
