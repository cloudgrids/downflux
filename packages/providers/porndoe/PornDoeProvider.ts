import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { PornDoeExecArgs, PornDoeVideoOutput } from './PornDoeContracts';
import { PornDoeMethods } from './PornDoeTypes';

/**
 * Public PornDoe provider entry point.
 *
 * @remarks
 * The provider owns URL validation, fluent execution options, and provider metadata.
 * Supports integrated MP4 downloads. Requires an external API. Marked under development so callers should expect provider-specific changes.
 */
export class PornDoeProvider extends BaseProvider<PornDoeExecArgs> {
	protected readonly provider = ProviderType.PornDoe;
	private readonly VIDEO_PATH_REGEX = /^https:\/\/(?:(?:www|de|en|fs|pt|es|fr|it)\.)?porndoe\.com\/watch\/([A-Za-z0-9]+)$/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.PornDoe,
			urlPattern: /^(?:(?:www|de|en|fs|pt|es|fr|it)\.)?porndoe\.(?:com)$/i,
			metadata: {
				hasHls: false,
				hlsIntegrated: false,
				mp4Integrated: true,
				needsExternalAPI: true,
				requiresLogin: false,
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
		if (this.VIDEO_PATH_REGEX.test(this.url)) return this.url;

		throw new GenericException('Invalid video url', this.provider);
	}

	public async getVideo(): Promise<PornDoeVideoOutput> {
		return await this.execute<PornDoeVideoOutput>({
			targets: [this.videoUrl],
			provider: this.provider,
			method: PornDoeMethods.getVideo,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
