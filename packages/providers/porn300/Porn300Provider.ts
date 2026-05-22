import { BaseProvider } from '@base';
import { ExtractionTarget, Provider } from '@types';
import { Porn300ExecArgs, Porn300VideoOutput } from './Porn300Contracts';
import { Porn300Methods } from './Porn300Types';

/**
 * @class Porn300Provider
 * @extends BaseProvider
 * Provider for Porn300 video downloader.
 * Provides mp4 links
 *
 * @remarks
 * Porn300 supports video downloading (canDownload: true).
 */
export class Porn300Provider extends BaseProvider<Porn300ExecArgs> {
	protected readonly provider = Provider.Porn300;

	constructor(url: string) {
		super(url, {
			provider: Provider.Porn300,
			urlPattern: /^(?:www\.)?porn300(?:\d+)?\.(?:com|net)$/i,
			metadata: {
				hasHls: false,
				type: 'adult',
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
