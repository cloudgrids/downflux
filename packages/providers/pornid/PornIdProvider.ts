import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, Provider } from '@types';
import { PornIdExecArgs, PornIdVideoOutput } from './PornIdContracts';
import { PornIdMethods } from './PornIdTypes';

/**
 * Public PornId provider entry point.
 *
 * @remarks
 * The provider owns URL validation, fluent execution options, and provider metadata.
 * Supports integrated MP4 downloads, KVS video fields. Marked under development so callers should expect provider-specific changes.
 */
export class PornIdProvider extends BaseProvider<PornIdExecArgs> {
	protected readonly provider = Provider.PornId;
	private readonly VIDEO_URL_REGEX = /^https:\/\/(?:www\.)?pornid\.(?:xxx|name)\/.*\.html(?:\?.*)?$/i;

	constructor(url: string) {
		super(url, {
			provider: Provider.PornId,
			urlPattern: /(?:www\.)?pornid\.(?:xxx|name)$/i,
			metadata: {
				hasHls: false,
				type: 'adult',
				hlsIntegrated: false,
				mp4Integrated: true,
				hasMp4: true,
				hasKvs: true,
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

		throw new GenericException('Invalid video URL', this.provider);
	}

	public async getVideo(): Promise<PornIdVideoOutput> {
		return await this.execute<PornIdVideoOutput>({
			targets: [this.videoUrl],
			provider: this.provider,
			method: PornIdMethods.getVideo,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
