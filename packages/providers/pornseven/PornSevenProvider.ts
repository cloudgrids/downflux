import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, Provider } from '@types';
import { PornSevenExecArgs, PornSevenVideoOutput } from './PornSevenContracts';
import { PornSevenMethods } from './PornSevenTypes';

/**
 * This website uses their own custom video player which makes it difficult to extract the video sources.
 * The player is also heavily obfuscated, making it hard to reverse engineer.
 *
 * We will resolve this later.
 */
export class PornSevenProvider extends BaseProvider<PornSevenExecArgs> {
	protected readonly provider = Provider.PornSeven;
	private readonly VIDEO_PATH_REGEX = /^https:\/\/(?:www\.)?porn7\.(?:xxx)\/v\/(?:old|new)-archive\/\d+\/.*$/i;

	constructor(url: string) {
		super(url, {
			provider: Provider.PornSeven,
			urlPattern: /^(?:www\.)?porn7\.(?:xxx)$/i,
			metadata: {
				hasHls: false,
				type: 'adult',
				hasMp4: true,
				mp4Integrated: false,
				hlsIntegrated: false,
				hasKvs: false,
				requiresBrowser: false,
				sniSpoofing: 'untested',
				underGeoRestriction: false,
				underDevelopment: true,
				canDownload: false
			}
		});
	}

	private get videoUrl(): string {
		if (this.VIDEO_PATH_REGEX.test(this.url)) return this.url;

		throw new GenericException('Invalid video URL', this.provider);
	}

	public async getVideo(): Promise<PornSevenVideoOutput> {
		return await this.execute<PornSevenVideoOutput>({
			provider: this.provider,
			targets: [this.videoUrl],
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES,
			method: PornSevenMethods.getVideo
		});
	}
}
