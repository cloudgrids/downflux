import {
	PornHubChannelsOutput,
	PornHubChannelsQueryArgsType,
	PornHubExecArgs,
	PornHubVideoExecArgs,
	PornHubVideoOutput,
	PornHubVideosExecArgs,
	PornHubVideosFormat,
	PornHubVideosOutput
} from '@app/contracts';
import { GenericException, InvalidUrlException } from '@app/exceptions';
import { ExtractionTarget, PornHubMethods, ProviderType, UrlFormat } from '@app/shared';
import { PageRange } from '@app/types';
import { Provider } from './Provider';

/**
 * @class PornHub provider.
 * @operations operations related to PornHub.
 * @notes Due to the dynamic nature of PornHub's webpage and potential anti-scraping measures,
 * The `getVideo` method may not work reliably for all videos or may require frequent updates to the extraction logic.
 * @notes Please report any issues you encounter to help improve the provider.
 */
export class PornHubProvider extends Provider<PornHubExecArgs> {
	private readonly provider = ProviderType.PornHub;
	private readonly HOST_REGEX = /^(?:www\.)?pornhub\.(?:com|net|org)$/i;
	private readonly CHANNELS_PATH_REGEX = /^https:\/\/(?:www\.)?pornhub\.(?:com|net|org)\/channels(?:\?.*)?$/i;
	private readonly Default_PAGE_RANGE: PageRange = { page: 1, limit: 1 };
	private readonly PORN_HUB_FORMATS = ['pornstar', 'model', 'channels'] as const;
	private readonly FORMAT_SET = new Set<string>(this.PORN_HUB_FORMATS);
	private readonly CHANNEL_QUERY_MAP: Record<PornHubChannelsQueryArgsType, string> = {
		all: '',
		most_popular: 'o=rk',
		trending: 'o=tr',
		most_recent: 'o=mr',
		alphabetical: 'o=al'
	};

	constructor(url: string) {
		super(url);
		this.validate(url);
	}

	protected override validate(url: string): void {
		try {
			new URL(url);
		} catch {
			throw new InvalidUrlException(url, this.provider);
		}
		const isSupportedHost = this.HOST_REGEX.test(new URL(url).hostname);

		if (!isSupportedHost) throw new InvalidUrlException(url, this.provider);
	}

	private get VIDEO_URL() {
		return `${this.ORIGIN}/view_video.php?viewkey=`;
	}

	private get MODEL_URL() {
		return `${this.ORIGIN}/model`;
	}

	private get CHANNEL_URL() {
		return `${this.ORIGIN}/channel`;
	}

	private get PORN_STAR_URL() {
		return `${this.ORIGIN}/pornstar`;
	}

	private resolveUrl(key: string, type: PornHubVideosFormat | 'video' = 'video', addPage: boolean = false): string {
		let url: string;
		switch (type) {
			case 'channels':
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
	 * @param quality allowed video quality (e.g., 720p, 1080p). If not specified, highest quality will be returned.
	 * @returns `PornHubVideoOutput` containing video metadata and source URLs
	 * @throws `GenericException` When the view key is missing or invalid
	 * @canDownload true
	 */
	public async getVideo(args: PornHubVideoExecArgs = {}): Promise<PornHubVideoOutput> {
		const urlObj = new URL(this.url);
		const viewKey = args.viewKey || urlObj.searchParams.get('viewkey');

		if (!viewKey) throw new GenericException('View key not found', this.provider, PornHubMethods.getVideo);

		return await this.execute<PornHubVideoOutput>({
			targets: [this.resolveUrl(viewKey)],
			method: PornHubMethods.getVideo,
			provider: this.provider,
			extractionTarget: ExtractionTarget.SOURCES,
			allowedVideoQuality: args.quality,
			executionShape: 'single',
			videoArgs: { viewKey, quality: args.quality }
		});
	}

	/**
	 * @returns `PornHubVideosOutput[]` containing video urls
	 * @notes This method does not download videos only returns array or urls
	 * @throws `GenericException` when the username or type is missing, usually derived from URL if exists
	 * @param args options parameter to specify username, type of videos and quality
	 * @notes This method is specially designed for fetching videos from `channel` or `model` or `pornstar` pages where the videos are listed in a paginated format.
	 * @canDownload false
	 */
	public async getVideos(args: PornHubVideosExecArgs = {}, range: PageRange = this.Default_PAGE_RANGE): Promise<PornHubVideosOutput[]> {
		let type = args.type;

		const url = new URL(this.url);
		const pathParts = url.pathname.split('/').filter(Boolean);

		const username = args.username || pathParts[1];
		const currentPage = Number(url.searchParams.get('page') ?? 1);

		if (!username) throw new GenericException('Username is required', this.provider, PornHubMethods.getVideos);

		if (pathParts?.length) {
			if (!this.isVideosFormat(pathParts[0])) {
				throw new GenericException('Invalid format', this.provider, PornHubMethods.getVideos);
			}

			type = pathParts[0];
		}

		return await this.execute<PornHubVideosOutput[]>({
			...this.makeTargets(
				this.resolveUrl(username, type, true),
				{ page: currentPage, limit: range.limit },
				this.provider,
				PornHubMethods.getVideos,
				false
			),
			executionShape: 'multiple',
			extractionTarget: ExtractionTarget.ANCHORS,
			videosArgs: { ...args, username, type }
		});
	}

	/**
	 * Fetches videos from any URL based on its format (model, channel, pornstar) and extracts video URLs without downloading them.
	 * This method is useful for quickly retrieving video links from various page types without needing to specify the format explicitly.
	 * @throws `GenericException` when the URL format is invalid or unsupported
	 * @param format options parameter to specify format of the videos
	 * @returns `PornHubVideosOutput[]` containing video urls
	 * @notes This method does not download videos only returns array or urls
	 * @notes The method will attempt to determine the format based on the URL structure and extract videos accordingly.
	 * @canDownload false
	 */
	public async getVideosFromAnyUrl(format?: UrlFormat): Promise<PornHubVideosOutput[]> {
		return await this.execute<PornHubVideosOutput[]>({
			targets: [this.url],
			provider: this.provider,
			method: PornHubMethods.getVideos,
			executionShape: 'multiple',
			extractionTarget: ExtractionTarget.ANCHORS,
			videosArgs: { format }
		});
	}

	public async getChannels(
		type: PornHubChannelsQueryArgsType = 'most_popular',
		range: PageRange = this.Default_PAGE_RANGE
	): Promise<PornHubChannelsOutput[]> {
		const hasMatched = this.CHANNELS_PATH_REGEX.test(this.url);
		let channelUrl = hasMatched ? this.url : `${this.CHANNEL_URL}s?${this.CHANNEL_QUERY_MAP[type]}&page=`;

		const hasPageQuery = new URL(this.url).searchParams.get('page');
		const hasChannelQuery = new URL(this.url).searchParams.get('o');

		if (!hasChannelQuery || !hasPageQuery) {
			channelUrl = `${this.CHANNEL_URL}s?${this.CHANNEL_QUERY_MAP[type]}&page=`;
		}

		return await this.execute<PornHubChannelsOutput[]>({
			...this.makeTargets(channelUrl, range, this.provider, PornHubMethods.getChannels, false),
			executionShape: 'multiple',
			extractionTarget: ExtractionTarget.ANCHORS
		});
	}
}
