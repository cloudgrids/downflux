import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, Provider } from '@types';
import { MyLustExecArgs, MyLustVideoOutput } from './MyLustContracts';
import { MyLustMethods } from './MyLustTypes';

/**
 * Public MyLust provider entry point.
 *
 * @remarks
 * The provider owns URL validation, fluent execution options, and provider metadata.
 * Supports integrated MP4 downloads. Marked under development so callers should expect provider-specific changes.
 * MyLust supports video downloading (canDownload: true).
 */
export class MyLustProvider extends BaseProvider<MyLustExecArgs> {
	protected readonly provider = Provider.MyLust;
	private readonly VIDEO_URL_PATTERN = /^https:\/\/(?:(?:www|de|ru)\.)?mylust\.(?:com)\/videos\/\d+\/[^/]+\/(?:\?.*)/i;

	constructor(url: string) {
		super(url, {
			provider: Provider.MyLust,
			urlPattern: /^(?:(?:www|de|ru)\.)?mylust\.(?:com)$/i,
			metadata: {
				hasHls: false,
				type: 'adult',
				hlsIntegrated: false,
				mp4Integrated: true,
				hasMp4: true,
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
		if (this.VIDEO_URL_PATTERN.test(this.url)) return this.url;

		throw new GenericException('Invalid MyLust video URL', this.provider);
	}

	public async getVideo(): Promise<MyLustVideoOutput> {
		return await this.execute<MyLustVideoOutput>({
			targets: [this.videoUrl],
			provider: this.provider,
			method: MyLustMethods.getVideo,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
