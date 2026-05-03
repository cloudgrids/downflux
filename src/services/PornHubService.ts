import { GenericException, InvalidUrlException } from '../exceptions';
import { PornHubExecArgs, PornHubMethods, PornHubVideoOutput, ServiceType, UrlType, VideoQuality } from '../util';
import { BaseService } from './BaseService';

/**
 * @class PornHub service.
 * @operations operations related to PornHub.
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
			throw new InvalidUrlException(url, ServiceType.PORNHUB);
		}
		if (!url.includes('pornhub')) throw new InvalidUrlException(url, ServiceType.PORNHUB);
		this.BASE_URL = new URL(url).origin;
	}

	/**
	 *
	 * @param viewKey refers to the ID https://pornhub.com/view_video.php?viewkey=ph5b2c8e1cbb9d `ph5b2c8e1cbb9d`
	 * @defaultValue `viewKey` is collected from the URL query param `viewkey` if exists
	 * @param quality allowed video quality (e.g., 720p, 1080p). If not specified, all available quality will be returned.
	 * @returns `PornHubVideoOutput` containing video metadata and source URLs
	 * @throws `GenericException` When the view key is missing or invalid
	 */
	public async getVideo(quality?: VideoQuality): Promise<PornHubVideoOutput> {
		const urlObj = new URL(this.url);
		const viewKeyFromUrl = urlObj.searchParams.get('viewkey');

		if (!viewKeyFromUrl) throw new GenericException('View key not found', ServiceType.PORNHUB, PornHubMethods.getVideo);

		return await this.execute<PornHubVideoOutput>({
			targets: [this.url],
			method: PornHubMethods.getVideo,
			service: ServiceType.PORNHUB,
			urlType: UrlType.SOURCES,
			allowedVideoQuality: quality,
			returnType: 'object'
		});
	}
}
