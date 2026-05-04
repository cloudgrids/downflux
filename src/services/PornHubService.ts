import { GenericException, InvalidUrlException } from '../exceptions';
import {
	IndexRange,
	PornHubExecArgs,
	PornHubMethods,
	PornHubModelVideosExecArgs,
	PornHubVideoExecArgs,
	PornHubVideoOutput,
	ServiceType,
	UrlType
} from '../util';
import { PornHubModelVideosOutput } from '../util/interfaces/services/pornhub/PornHubModelVideosOutput';
import { BaseService } from './BaseService';

/**
 * @class PornHub service.
 * @operations operations related to PornHub.
 * @notes Due to the dynamic nature of PornHub's webpage and potential anti-scraping measures,
 * The `getVideo` method may not work reliably for all videos or may require frequent updates to the extraction logic.
 * @notes Please report any issues you encounter to help improve the service.
 */
export class PornHubService extends BaseService<PornHubExecArgs> {
	private BASE_URL = 'https://www.pornhub.com';
	private readonly Default_INDEX_RANGE: IndexRange = { start: 1, end: 1 };

	/**
	 * Creates a PornHub service instance.
	 * @param url PornHub URL (e.g., video URL or model URL)
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

	get VIDEO_URL() {
		return `${this.BASE_URL}/view_video.php?viewkey=`;
	}

	get MODEL_URL() {
		return `${this.BASE_URL}/model`;
	}

	private getModelUrl(username: string): string {
		return `${this.MODEL_URL}/${username}`;
	}

	private getModelVideosUrl(username: string): string {
		return `${this.getModelUrl(username)}/videos?page=`;
	}

	private getVideoUrl(viewKey: string): string {
		return `${this.VIDEO_URL}${viewKey}`;
	}

	/**
	 * @param viewKey refers to the ID https://pornhub.com/view_video.php?viewkey=ph5b2c8e1cbb9d `ph5b2c8e1cbb9d`
	 * @defaultValue `viewKey` is collected from the entry URL query param if exists
	 * @param quality allowed video quality (e.g., 720p, 1080p). If not specified, all available quality will be returned.
	 * @returns `PornHubVideoOutput` containing video metadata and source URLs
	 * @throws `GenericException` When the view key is missing or invalid
	 */
	public async getVideo(args: PornHubVideoExecArgs): Promise<PornHubVideoOutput> {
		const urlObj = new URL(this.url);
		const _viewKey = args.viewKey ?? urlObj.searchParams.get('viewkey');

		if (!_viewKey) throw new GenericException('View key not found', ServiceType.PornHub, PornHubMethods.getVideo);

		return await this.execute<PornHubVideoOutput>({
			targets: [this.getVideoUrl(_viewKey)],
			method: PornHubMethods.getVideo,
			service: ServiceType.PornHub,
			urlType: UrlType.SOURCES,
			allowedVideoQuality: args.quality,
			returnType: 'object',
			videoArgs: { viewKey: _viewKey, quality: args.quality }
		});
	}

	public async getModelVideos(
		args: PornHubModelVideosExecArgs,
		range: IndexRange = this.Default_INDEX_RANGE
	): Promise<PornHubModelVideosOutput[]> {
		if (!args.username) throw new GenericException('Username is required', ServiceType.PornHub, PornHubMethods.getModelVideos);

		return await this.execute<PornHubModelVideosOutput[]>({
			...this.makeTargets(this.getModelVideosUrl(args.username), range, ServiceType.PornHub, PornHubMethods.getModelVideos, false),
			returnType: 'array',
			urlType: UrlType.ANCHORS,
			modelVideosArgs: args
		});
	}
}
