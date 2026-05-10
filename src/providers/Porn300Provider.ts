import { Porn300ExecArgs, Porn300VideoOutput } from '@app/contracts';
import { InvalidUrlException } from '@app/exceptions';
import { ExtractionTarget, Porn300Methods, ProviderType } from '@app/shared';
import { Provider } from './Provider';

export class Porn300Provider extends Provider<Porn300ExecArgs> {
	private readonly provider = ProviderType.Porn300;
	private readonly HOST_REGEX = /^(?:www\.)?porn300(?:\d+)?\.(?:com|net)$/i;

	constructor(url: string) {
		super(url);
		this.validate(url);
	}

	protected override validate(url: string): void {
		try {
			new URL(url);
		} catch {
			throw new InvalidUrlException(url, this.provider);
		}
		if (!this.isSupported(this.HOST_REGEX)) throw new InvalidUrlException(url, this.provider);
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
