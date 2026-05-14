import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { TubeVSexExecArgs, TubeVSexVideoOutput } from './TubeVSexContracts';
import { TubeVSexMethods } from './TubeVSexTypes';

export class TubeVSexProvider extends BaseProvider<TubeVSexExecArgs> {
	protected readonly provider = ProviderType.TubeVSex;
	private readonly VIDEO_URL_REGEX = /^https:\/\/(?:www\.)?tubev\.(?:sex)\/video-archive\/[\d]+\/[^/]+$/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.TubeVSex,
			urlPattern: /^(?:www\.)?tubev\.(?:sex)$/i
		});
	}

	get videoUrl(): string {
		const match = this.url.match(this.VIDEO_URL_REGEX);

		if (!match) throw new GenericException('Invalid TubeVSex video URL', this.provider);

		return this.url;
	}

	public async getVideo(): Promise<TubeVSexVideoOutput> {
		return await this.execute<TubeVSexVideoOutput>({
			targets: [this.videoUrl],
			method: TubeVSexMethods.getVideo,
			provider: this.provider,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
