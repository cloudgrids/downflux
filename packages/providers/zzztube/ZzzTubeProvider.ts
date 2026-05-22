import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, Provider } from '@types';
import { ZzzTubeExecArgs, ZzzTubeVideoOutput } from './ZzzTubeContracts';
import { ZzzTubeMethods } from './ZzzTubeTypes';

/**
 * Public ZzzTube provider entry point.
 *
 * @remarks
 * The provider owns URL validation, fluent execution options, and provider metadata.
 * Supports integrated MP4 downloads. Marked under development so callers should expect provider-specific changes.
 * ZzzTube supports video downloading (canDownload: true).
 */
export class ZzzTubeProvider extends BaseProvider<ZzzTubeExecArgs> {
	protected readonly provider = Provider.ZzzTube;
	private readonly VIDEO_URL_REGEX = /^https:\/\/(?:www\.)?zzztube\.(?:com)\/\d+(?:(?:\?|#).*)?$/i;

	constructor(url: string) {
		super(url, {
			provider: Provider.ZzzTube,
			urlPattern: /^(?:www\.)?zzztube\.(?:com)$/i,
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
		throw new GenericException('Invalid ZzzTube video URL', this.provider, ZzzTubeMethods.getVideo);
	}

	public async getVideo(): Promise<ZzzTubeVideoOutput> {
		return await this.execute<ZzzTubeVideoOutput>({
			targets: [this.videoUrl],
			provider: this.provider,
			method: ZzzTubeMethods.getVideo,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
