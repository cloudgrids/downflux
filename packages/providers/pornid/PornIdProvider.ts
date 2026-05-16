import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { PornIdExecArgs, PornIdVideoOutput } from './PornIdContracts';
import { PornIdMethods } from './PornIdTypes';

export class PornIdProvider extends BaseProvider<PornIdExecArgs> {
	protected readonly provider = ProviderType.PornId;
	private readonly VIDEO_URL_REGEX = /^https:\/\/(?:www\.)?pornid\.(?:xxx|name)\/.*\.html(?:\?.*)?$/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.PornId,
			urlPattern: /(?:www\.)?pornid\.(?:xxx|name)$/i,
			metadata: {
				hasHls: false,
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

	get videoUrl(): string {
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
