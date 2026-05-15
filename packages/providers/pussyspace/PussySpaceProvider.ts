import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { PussySpaceExecArgs, PussySpaceVideoOutput } from './PussySpaceContracts';
import { PussySpaceMethods } from './PussySpaceTypes';

export class PussySpaceProvider extends BaseProvider<PussySpaceExecArgs> {
	protected readonly provider = ProviderType.PussySpace;
	private VIDEO_REGEX_PATH = /^https:\/\/(?:www\.)?pussyspace\.(?:com)\/vid-([a-z-0-9A-Z-.]+)\/(?:\?.*)?/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.PussySpace,
			urlPattern: /^(?:www\.)?pussyspace\.(?:com)$/i,
			metadata: {
				hls: false,
				mp4: true,
				kvs: false,
				geoRestriction: false,
				needsBrowser: false
			}
		});
	}

	get videoUrl(): string {
		const match = this.url.match(this.VIDEO_REGEX_PATH);

		if (!match) throw new GenericException('Invalid video url', this.provider);

		return this.url;
	}

	public async getVideo(): Promise<PussySpaceVideoOutput> {
		return await this.execute<PussySpaceVideoOutput>({
			targets: [this.videoUrl],
			provider: this.provider,
			method: PussySpaceMethods.getVideo,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
