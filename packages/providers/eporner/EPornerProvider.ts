import { BaseProvider } from '@base';
import { ExtractionTarget, Provider } from '@types';
import { EPornerExecArgs, EPornerVideoOutput } from './EPornerContracts';
import { EPornerMethods } from './EPornerTypes';

/**
 * Public EPorner provider entry point.
 *
 * @remarks
 * The provider owns URL validation, fluent execution options, and provider metadata.
 * Supports integrated MP4 downloads, integrated HLS downloads. Requires an external API, geo-aware access. Marked under development so callers should expect provider-specific changes. SNI spoofing status: working.
 * EPorner supports video downloading (canDownload: true).
 */
export class EPornerProvider extends BaseProvider<EPornerExecArgs> {
	protected readonly provider = Provider.EPorner;

	constructor(url: string) {
		super(url, {
			provider: Provider.EPorner,
			urlPattern: /(?:(?:www|pl|en|fr|es|pt|it|de|nl|ph|jp)\.)?eporner\.(?:com)$/i,
			metadata: {
				hasHls: true,
				type: 'adult',
				hasMp4: true,
				hlsIntegrated: true,
				mp4Integrated: true,
				needsExternalAPI: true,
				hasKvs: false,
				underGeoRestriction: true,
				requiresBrowser: false,
				canDownload: true,
				underDevelopment: true,
				cloudflareChallenge: false,
				sniSpoofing: 'working'
			}
		});
	}

	public async getVideo(): Promise<EPornerVideoOutput> {
		return await this.execute<EPornerVideoOutput>({
			targets: [this.url],
			provider: this.provider,
			method: EPornerMethods.getVideo,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
