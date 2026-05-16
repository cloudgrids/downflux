import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { XCafeExecArgs, XCafeVideoOutput } from './XCafeContracts';
import { XCafeMethods } from './XCafeTypes';

export class XCafeProvider extends BaseProvider<XCafeExecArgs> {
	protected readonly provider = ProviderType.XCafe;
	private readonly VIDEO_URL_REGEX = /^https:\/\/(?:www\.)?xcafe\.(?:com)\/\d+\/(?:\?.*)?/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.XCafe,
			urlPattern: /^(?:www\.)?xcafe\.(?:com)$/i,
			metadata: {
				hasHls: false,
				hasMp4: true,
				hlsIntegrated: false,
				mp4Integrated: true,
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

	get videoUrl(): string {
		if (this.VIDEO_URL_REGEX.test(this.url)) return this.url;
		throw new GenericException('Invalid XCafe video URL', this.provider, XCafeMethods.getVideo);
	}

	public async getVideo(): Promise<XCafeVideoOutput> {
		return await this.execute<XCafeVideoOutput>({
			method: XCafeMethods.getVideo,
			targets: [this.videoUrl],
			provider: this.provider,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
