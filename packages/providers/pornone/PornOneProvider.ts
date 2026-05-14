import { BaseProvider } from '@base';
import { ProviderType } from '@types';
import { PornOneExecArgs, PornOneVideoOutput } from './PornOneContracts';
import { PornOneMethods } from './PornOneTypes';

/**
 * @class PornOneProvider
 * @extends BaseProvider
 * Provider for PornOne video downloader.
 * Still under `development` due to cloudflare challenge
 * Direct mp4 links
 */
export class PornOneProvider extends BaseProvider<PornOneExecArgs> {
	protected readonly provider = ProviderType.PornOne;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.PornOne,
			urlPattern: /^(?:www\.)?pornone\.(?:com|net)$/i
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
