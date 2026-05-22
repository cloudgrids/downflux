import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, Provider } from '@types';
import { AnalRzExecArgs, AnalRzVideoOutput } from './AnalRzContracts';
import { AnalRzMethods } from './AnalRzTypes';

/**
 * Provider for AnalRz video platform.
 * Handles URL validation and video extraction for analrz.com domain.
 *
 * @remarks
 * This provider manages the interaction with AnalRz's API and handles specific URL patterns
 * for video identification and metadata retrieval.
 * AnalRz supports video downloading (canDownload: true).
 */
export class AnalRzProvider extends BaseProvider<AnalRzExecArgs> {
	protected readonly provider = Provider.AnalRz;
	private readonly VIDEO_PATH_REGEX = /^https:\/\/(?:www\.)?analrz\.(?:com)\/video\/\d+\/[a-zA-Z0-9_-]+\/(?:\?.*)?$/i;

	constructor(url: string) {
		super(url, {
			provider: Provider.AnalRz,
			urlPattern: /^(?:www\.)?analrz\.(?:com)$/i,
			metadata: {
				hasHls: false,
				type: 'adult',
				hasMp4: true,
				hasKvs: false,
				hlsIntegrated: false,
				mp4Integrated: true,
				requiresBrowser: false,
				sniSpoofing: 'untested',
				underGeoRestriction: false,
				underDevelopment: true,
				needsExternalAPI: false,
				canDownload: true
			}
		});
	}

	private get videoUrl(): string {
		if (this.VIDEO_PATH_REGEX.test(this.url)) return this.url;

		throw new GenericException('Invalid url format', this.provider);
	}

	public async getVideo(): Promise<AnalRzVideoOutput> {
		return await this.execute<AnalRzVideoOutput>({
			method: AnalRzMethods.getVideo,
			provider: this.provider,
			targets: [this.videoUrl],
			extractionTarget: ExtractionTarget.SOURCES,
			executionShape: 'single'
		});
	}
}
