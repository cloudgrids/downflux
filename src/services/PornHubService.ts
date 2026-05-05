import { GenericException, InvalidUrlException } from '../exceptions';
import {
	PageRange,
	PornHubExecArgs,
	PornHubMethods,
	PornHubVideoExecArgs,
	PornHubVideoOutput,
	PornHubVideosExecArgs,
	PornHubVideosFormat,
	ServiceType,
	UrlType
} from '../util';
import { PornHubVideosOutput } from '../util/interfaces/services/pornhub/PornHubVideosOutput';
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
	private readonly Default_PAGE_RANGE: PageRange = { page: 1, limit: 1 };
	private readonly PORN_HUB_FORMATS = ['pornstar', 'model', 'channel'] as const;
	private readonly FORMAT_SET = new Set<string>(this.PORN_HUB_FORMATS);

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

	get CHANNEL_URL() {
		return `${this.BASE_URL}/channel`;
	}

	get PORN_STAR_URL() {
		return `${this.BASE_URL}/pornstar`;
	}

	private getUrl(key: string, addPage: boolean = false, type: PornHubVideosFormat | 'video' = 'video'): string {
		let url: string;
		switch (type) {
			case 'channel':
				url = `${this.CHANNEL_URL}/${key}`;
				break;
			case 'model':
				url = `${this.MODEL_URL}/${key}`;
				break;
			case 'video':
				url = `${this.VIDEO_URL}${key}`;
				break;
			case 'pornstar':
				url = `${this.PORN_STAR_URL}/${key}`;
				break;
			default:
				url = '';
		}
		return addPage ? url.concat('/videos?page=') : url;
	}

	private isVideosFormat(value: string): value is PornHubVideosFormat {
		return this.FORMAT_SET.has(value);
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
		const viewKey = args.viewKey || urlObj.searchParams.get('viewkey');

		if (!viewKey) throw new GenericException('View key not found', ServiceType.PornHub, PornHubMethods.getVideo);

		return await this.execute<PornHubVideoOutput>({
			targets: [this.getUrl(viewKey)],
			method: PornHubMethods.getVideo,
			service: ServiceType.PornHub,
			urlType: UrlType.SOURCES,
			allowedVideoQuality: args.quality,
			returnType: 'object',
			videoArgs: { viewKey, quality: args.quality }
		});
	}

	/**
	 * @returns `PornHubVideosOutput[]` containing video urls
	 * @throws `GenericException` when the username or type is missing, usually derived from URL if exists
	 */
	public async getVideos(args: PornHubVideosExecArgs = {}, range: PageRange = this.Default_PAGE_RANGE): Promise<PornHubVideosOutput[]> {
		let type = args.type;

		const url = new URL(this.url);
		const pathParts = url.pathname.split('/').filter(Boolean);

		const username = args.username || pathParts[1];
		const currentPage = Number(url.searchParams.get('page') ?? 1);

		if (!username) throw new GenericException('Username is required', ServiceType.PornHub, PornHubMethods.getVideos);

		if (pathParts?.length) {
			if (!this.isVideosFormat(pathParts[0])) {
				throw new GenericException('Invalid format', ServiceType.PornHub, PornHubMethods.getVideos);
			}

			type = pathParts[0];
		}

		return await this.execute<PornHubVideosOutput[]>({
			...this.makeTargets(
				this.getUrl(username, true, type),
				{ page: currentPage, limit: range.limit },
				ServiceType.PornHub,
				PornHubMethods.getVideos,
				false
			),
			returnType: 'array',
			urlType: UrlType.ANCHORS,
			videosArgs: { ...args, username, type }
		});
	}
}
