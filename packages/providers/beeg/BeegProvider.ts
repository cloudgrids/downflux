import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { BeegExecArgs, BeegVideoOutput } from './BeegContracts';
import { BeegMethods } from './BeegTypes';

/**
 * @class BeegProvider
 * @extends BaseProvider
 * Provider for Beeg video downloader.
 * Provides m3u8 files and converts them to mp4 using ffmpeg
 * Dependencies: - ffmpeg (for m3u8 to mp4 conversion)
 */
export class BeegProvider extends BaseProvider<BeegExecArgs> {
	protected readonly provider = ProviderType.Beeg;
	private readonly PROVIDER_REGEX = /^https:\/\/(?:www\.)?beeg\.com\/([a-zA-Z0-9-]+)\/?$/i;
	private readonly urlMatch: RegExpMatchArray | null = this.url.match(this.PROVIDER_REGEX);
	private VIDEO_ID: string = '';

	constructor(url: string) {
		super(url, {
			provider: ProviderType.Beeg,
			urlPattern: /^(?:www\.)?beeg\.(?:com)$/i,
			metadata: {
				hls: true,
				mp4: true,
				kvs: false,
				geoRestriction: false,
				needsBrowser: false
			}
		});
	}

	get videoUrl() {
		const videoId = this.urlMatch?.[1];

		if (!videoId) throw new GenericException('Video id is missing or not found', this.provider, BeegMethods.getVideo);

		this.VIDEO_ID = videoId.replace(/^-0/i, '');

		if (!this.VIDEO_ID) throw new GenericException('Invalid video url', this.provider, BeegMethods.getVideo);

		return `https://beeg.com/${videoId}`;
	}

	public async getVideo(): Promise<BeegVideoOutput> {
		return await this.execute<BeegVideoOutput>({
			targets: [this.videoUrl],
			executionShape: 'single',
			provider: this.provider,
			method: BeegMethods.getVideo,
			extractionTarget: ExtractionTarget.SOURCES,
			id: this.VIDEO_ID
		});
	}
}
