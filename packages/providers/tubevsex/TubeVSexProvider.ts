import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, Provider } from '@types';
import { TubeVSexExecArgs, TubeVSexVideoOutput } from './TubeVSexContracts';
import { TubeVSexMethods } from './TubeVSexTypes';

/**
 * Public TubeVSex provider entry point.
 *
 * @remarks
 * The provider owns URL validation, fluent execution options, and provider metadata.
 * Supports integrated MP4 downloads. Marked under development so callers should expect provider-specific changes.
 */
export class TubeVSexProvider extends BaseProvider<TubeVSexExecArgs> {
	protected readonly provider = Provider.TubeVSex;
	private readonly VIDEO_URL_REGEX = /^https:\/\/(?:www\.)?tubev\.(?:sex)\/(?:video-archive|video)\/[\d]+\/[^/]+$/i;

	constructor(url: string) {
		super(url, {
			provider: Provider.TubeVSex,
			urlPattern: /^(?:www\.)?tubev\.(?:sex)$/i,
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
		throw new GenericException('Invalid TubeVSex video URL', this.provider, TubeVSexMethods.getVideo);
	}

	public async getVideo(): Promise<TubeVSexVideoOutput> {
		return await this.execute<TubeVSexVideoOutput>({
			targets: [this.videoUrl],
			method: TubeVSexMethods.getVideo,
			provider: this.provider,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
