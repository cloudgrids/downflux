import { BaseProvider } from '@base';
import { ExtractionTarget, ProviderType } from '@types';
import { EPornerExecArgs, EPornerVideoOutput } from './EPornerContracts';
import { EPornerMethods } from './EPornerTypes';

export class EPornerProvider extends BaseProvider<EPornerExecArgs> {
	protected readonly provider = ProviderType.EPorner;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.EPorner,
			urlPattern: /(?:(?:www|pl|en|fr|es|pt|it|de|nl|ph|jp)\.)?eporner\.(?:com)$/i,
			metadata: {
				hasHls: true,
				hasMp4: true,
				hasKvs: false,
				underGeoRestriction: true,
				requiresBrowser: false,
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
