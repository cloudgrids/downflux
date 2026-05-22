import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, Provider } from '@types';
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
	protected readonly provider = Provider.Beeg;
	private readonly VIDEO_PATH_REGEX = /^https:\/\/(?:www\.)?beeg\.com\/-0([0-9]+)\/?$/i;
	private VIDEO_ID: string = '';

	constructor(url: string) {
		super(url, {
			provider: Provider.Beeg,
			urlPattern: /^(?:www\.)?beeg\.(?:com)$/i,
			metadata: {
				hasHls: true,
				type: 'adult',
				hasMp4: true,
				hlsIntegrated: true,
				mp4Integrated: true,
				hasKvs: false,
				underGeoRestriction: true,
				requiresBrowser: false,
				canDownload: true,
				underDevelopment: true,
				cloudflareChallenge: false,
				needsExternalAPI: true,
				sniSpoofing: 'working'
			}
		});
	}

	private get videoUrl() {
		const videoId = this.url.match(this.VIDEO_PATH_REGEX)?.[1];

		if (!videoId) throw new GenericException('Video id is missing or not found', this.provider, BeegMethods.getVideo);

		this.VIDEO_ID = videoId.replace(/^-0/i, '');

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
