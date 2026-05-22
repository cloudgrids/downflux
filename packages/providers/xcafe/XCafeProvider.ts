import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, Provider } from '@types';
import { XCafeExecArgs, XCafeVideoOutput } from './XCafeContracts';
import { XCafeMethods } from './XCafeTypes';

/**
 * Public XCafe provider entry point.
 *
 * @remarks
 * The provider owns URL validation, fluent execution options, and provider metadata.
 * Supports integrated MP4 downloads. Marked under development so callers should expect provider-specific changes.
 * XCafe supports video downloading (canDownload: true).
 */
export class XCafeProvider extends BaseProvider<XCafeExecArgs> {
	protected readonly provider = Provider.XCafe;
	private readonly VIDEO_URL_REGEX = /^https:\/\/(?:www\.)?xcafe\.(?:com)\/\d+\/(?:\?.*)?/i;

	constructor(url: string) {
		super(url, {
			provider: Provider.XCafe,
			urlPattern: /^(?:www\.)?xcafe\.(?:com)$/i,
			metadata: {
				hasHls: false,
				type: 'adult',
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

	private get videoUrl(): string {
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
