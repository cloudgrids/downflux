import { BaseProvider } from '@base';
import { ExtractionTarget, ProviderType } from '@types';
import { CumLouderMethods, GenericException } from 'packages';
import { CumLouderExecArgs, CumLouderVideoOutput } from './CumLouderContracts';

/**
 * @class CumLouderProvider
 * @description Provider implementation for CumLouder website, responsible for validating URLs, extracting video information, and handling video downloads.
 * @notes This provider might not support for all regions due to potential geo-restrictions on CumLouder content. Ensure that the provided URLs are accessible from your location.
 * @remarks The provider is still under development and may not support all video formats or qualities available on CumLouder.
 * As the default is unknown
 */
export class CumLouderProvider extends BaseProvider<CumLouderExecArgs> {
	protected readonly provider = ProviderType.CumLouder;
	private VIDEO_REGEX_PATH = /^https:\/\/(?:www\.)?cumlouder\.(?:com)\/(?:(?:es|it|fr|de|nl|br)\/)?(?:porn-video|videos)\/([^./]+)\/$/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.CumLouder,
			urlPattern: /^(?:www\.)?cumlouder\.(?:com)$/i
		});
	}

	get videoUrl(): string {
		const match = this.url.match(this.VIDEO_REGEX_PATH);

		if (!match) throw new GenericException('Invalid video url', this.provider);

		return this.url;
	}

	public async getVideo(): Promise<CumLouderVideoOutput> {
		return await this.execute<CumLouderVideoOutput>({
			targets: [this.videoUrl],
			provider: this.provider,
			method: CumLouderMethods.getVideo,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
