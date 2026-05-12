import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { XGroovyExecArgs, XGroovyVideoOutput } from './XGroovyContracts';
import { XGroovyMethods } from './XGroovyTypes';

export class XGroovyProvider extends BaseProvider<XGroovyExecArgs> {
	protected readonly provider = ProviderType.XGroovy;
	private readonly PROVIDER_REGEX = /^https:\/\/(?:(?:www|rt|pt|de|es|pl|it|cn|jp|ko|nl)?\.)?xgroovy(?:-fr)?\.(?:com)\/.*/i;
	private readonly VIDEO_PATH_REGEX =
		/^https:\/\/(?:(?:www|rt|pt|de|es|pl|it|cn|jp|ko|nl)?\.)?xgroovy(?:-fr)?\.(?:com)\/videos\/(\d+)\/([-a-zA-z0-9]+)\/$/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.XGroovy,
			urlPattern: /^(?:(?:www|rt|pt|de|es|pl|it|cn|jp|ko|nl)?\.)?xgroovy(?:-fr)?\.(?:com)$/i
		});
	}

	private get videoUrl() {
		const match = this.url.match(this.VIDEO_PATH_REGEX);

		if (!match) throw new GenericException('Invalid xgroovy url', this.provider);

		return this.url;
	}

	public async getVideo(): Promise<XGroovyVideoOutput> {
		return await this.execute<XGroovyVideoOutput>({
			targets: [this.videoUrl],
			executionShape: 'single',
			provider: this.provider,
			method: XGroovyMethods.getVideo,
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
