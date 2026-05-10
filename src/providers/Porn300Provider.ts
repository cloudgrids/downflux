import { Porn300ExecArgs, Porn300VideoOutput } from '@app/contracts';
import { ExtractionTarget, Porn300Methods, ProviderType } from '@app/shared';
import { Provider } from './Provider';

export class Porn300Provider extends Provider<Porn300ExecArgs> {
	protected readonly provider = ProviderType.Porn300;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.Porn300,
			urlPattern: /^(?:www\.)?porn300(?:\d+)?\.(?:com|net)$/i
		});
	}

	public async getVideo(): Promise<Porn300VideoOutput> {
		return await this.execute<Porn300VideoOutput>({
			targets: [this.url],
			method: Porn300Methods.getVideo,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES,
			provider: this.provider
		});
	}
}
