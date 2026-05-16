import { BaseProvider } from '@base';
import { ProviderType } from '@types';
import { PornOneExecArgs, PornOneVideoOutput } from './PornOneContracts';
import { PornOneMethods } from './PornOneTypes';

/**
 * @class PornOneProvider
 * Provider for PornOne video downloader.
 * Still under `development` due to cloudflare challenge.
 * Provides direct mp4 links
 * Currently it does not downloads
 */
export class PornOneProvider extends BaseProvider<PornOneExecArgs> {
	protected readonly provider = ProviderType.PornOne;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.PornOne,
			urlPattern: /^(?:www\.)?pornone\.(?:com|net)$/i,
			metadata: {
				hasHls: false,
				hasMp4: true,
				hlsIntegrated: false,
				mp4Integrated: true,
				hasKvs: false,
				underGeoRestriction: false,
				requiresBrowser: false,
				canDownload: false,
				underDevelopment: true,
				cloudflareChallenge: true,
				sniSpoofing: 'untested'
			}
		});
	}

	public async getVideo(): Promise<PornOneVideoOutput> {
		return await this.execute<PornOneVideoOutput>({
			targets: [this.url],
			provider: this.provider,
			method: PornOneMethods.getVideo,
			executionShape: 'single'
		});
	}
}
