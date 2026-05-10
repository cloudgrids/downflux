import { PornOneExecArgs, PornOneVideoOutput } from '@app/contracts';
import { Porn300Methods, ProviderType } from '@app/shared';
import { Provider } from './Provider';

export class PornOneProvider extends Provider<PornOneExecArgs> {
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
			method: Porn300Methods.getVideo,
			executionShape: 'single'
		});
	}
}
