import { BaseProvider } from '@base';
import { ExtractionTarget, ProviderType } from '@types';
import { Porn300ExecArgs, Porn300VideoOutput } from './Porn300Contracts';
import { Porn300Methods } from './Porn300Types';

/**
 * @class Porn300Provider
 * @extends BaseProvider
 * Provider for Porn300 video downloader.
 * Provides mp4 links
 */
export class Porn300Provider extends BaseProvider<Porn300ExecArgs> {
	protected readonly provider = ProviderType.Porn300;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.Porn300,
			urlPattern: /^(?:www\.)?porn300(?:\d+)?\.(?:com|net)$/i,
			metadata: {
				hls: false,
				mp4: true,
				kvs: false,
				geoRestriction: false,
				needsBrowser: false
			}
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
