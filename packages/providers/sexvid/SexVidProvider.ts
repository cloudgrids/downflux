import { BaseProvider } from '@base';
import { ExtractionTarget, ProviderType } from '@types';
import { SexVidExecArgs, SexVidVideoOutput } from './SexVidContracts';
import { SexVidMethods } from './SexVidTypes';

export class SexVidProvider extends BaseProvider<SexVidExecArgs> {
	protected readonly provider = ProviderType.SexVid;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.SexVid,
			urlPattern: /^(?:www\.)?sexvid\.(?:xxx)$/i
		});
	}

	public async getVideo(): Promise<SexVidVideoOutput> {
		return await this.execute<SexVidVideoOutput>({
			targets: [this.url],
			provider: this.provider,
			method: SexVidMethods.getVideo,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
