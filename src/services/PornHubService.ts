import { GenericException, InvalidUrlException } from '../exceptions';
import { PornHubExecArgs, PornHubMethods, PornHubVideoOutput, ServiceType, UrlType, VideoQuality } from '../util';
import { BaseService } from './BaseService';

/**
 * @class PornHub service.
 * @operations operations related to PornHub.
 * @notes Due to the dynamic nature of PornHub's webpage and potential anti-scraping measures,
 * The `getVideo` method may not work reliably for all videos or may require frequent updates to the extraction logic.
 * You may encounter disk write errors,as PornHub may send segmented content in an unordered manner,
 * which may cause issues when trying to save the video files.
 * It may be necessary to retry to get the expected results.
 * @notes Please report any issues you encounter to help improve the service.
 */
export class PornHubService extends BaseService<PornHubExecArgs> {
	private BASE_URL = 'https://www.pornhub.com';

	/**
	 * Creates a PornHub service instance.
	 * @param url PornHub video URL
	 * @throws InvalidUrlException When the URL is not a valid PornHub video URL
	 */
	constructor(url: string) {
		super(url);
		this.validateUrl(url);
	}

	protected override validateUrl(url: string): void {
		try {
			new URL(url);
		} catch {
			throw new InvalidUrlException(url, ServiceType.PornHub);
		}
		if (!url.includes('pornhub')) throw new InvalidUrlException(url, ServiceType.PornHub);
		this.BASE_URL = new URL(url).origin;
	}

	/**
	 *
	 * @param viewKey refers to the ID https://pornhub.com/view_video.php?viewkey=ph5b2c8e1cbb9d `ph5b2c8e1cbb9d`
	 * @defaultValue `viewKey` is collected from the entry URL query param if exists
	 * @param quality allowed video quality (e.g., 720p, 1080p). If not specified, all available quality will be returned.
	 * @returns `PornHubVideoOutput` containing video metadata and source URLs
	 * @throws `GenericException` When the view key is missing or invalid
	 */
	public async getVideo(quality?: VideoQuality): Promise<PornHubVideoOutput> {
		const urlObj = new URL(this.url);
		const viewKey = urlObj.searchParams.get('viewkey');

		if (!viewKey) throw new GenericException('View key not found', ServiceType.PornHub, PornHubMethods.getVideo);

		return await this.execute<PornHubVideoOutput>({
			targets: [this.url],
			method: PornHubMethods.getVideo,
			service: ServiceType.PornHub,
			urlType: UrlType.SOURCES,
			allowedVideoQuality: quality,
			returnType: 'object',
			viewKey
		});
	}
}
