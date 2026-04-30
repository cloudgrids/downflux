import { InvalidRangeException, InvalidUrlException } from '../exceptions';
import {
	IndexRange,
	OkPornAlbumOutput,
	OkPornChannelOutput,
	OkPornExecArgs,
	OkPornIdType,
	OkPornMethods,
	OkPornModelOutput,
	OkPornModelVideoIdsOutput,
	OkPornTagOutput,
	OkPornVideoOutput,
	PageRange,
	Range,
	ServiceType,
	TagFilterOptions,
	UrlType,
	VideoQuality
} from '../util';
import { BaseService } from './BaseService';

export class OkPornService extends BaseService<OkPornExecArgs> {
	private readonly ALBUMS_URL = 'https://ok.porn/albums/';
	private readonly VIDEOS_URL = 'https://ok.porn/video/';
	private readonly MODELS_URL = 'https://ok.porn/models/';
	private readonly TAGS_URL = 'https://ok.porn/tags/';
	private readonly CHANNELS_URL = 'https://ok.porn/channels/';
	private readonly MODEL_VIDEO_PAGE_LIMIT = 555;
	private readonly CHANNEL_PAGE_LIMIT = 21;
	private readonly DEFAULT_PAGE_RANGE: PageRange = { page: 1, limit: 1 };
	private readonly DEFAULT_INDEX_RANGE: IndexRange = { start: 1, end: 1 };

	constructor(url: string) {
		super(url);
		this.validateUrl(url);
	}

	protected override validateUrl(url: string): void {
		if (!url.startsWith('https://ok.porn/')) throw new InvalidUrlException(url, ServiceType.OKPORN);
	}

	public async getAlbums(param: PageRange = this.DEFAULT_PAGE_RANGE): Promise<OkPornAlbumOutput[]> {
		return await this.execute<OkPornAlbumOutput>({
			targets: this.targets(this.ALBUMS_URL, param),
			method: OkPornMethods.getAlbums,
			service: ServiceType.OKPORN,
			urlType: UrlType.IMAGES
		});
	}

	public async getAlbum(id: string): Promise<OkPornAlbumOutput> {
		const [album] = await this.execute<OkPornAlbumOutput>({
			targets: [`${this.ALBUMS_URL}${id}/`],
			urlType: UrlType.IMAGES,
			method: OkPornMethods.getAlbum,
			service: ServiceType.OKPORN
		});

		return album;
	}

	/** Pagination starts from 1 and ends at 555 */
	public getModels(range: PageRange = this.DEFAULT_PAGE_RANGE, args?: OkPornIdType): Promise<OkPornModelOutput[]> {
		if (range.limit > this.MODEL_VIDEO_PAGE_LIMIT) {
			throw new InvalidRangeException(range.page, range.limit, ServiceType.OKPORN, OkPornMethods.getModels);
		}

		return this.execute<OkPornModelOutput>({
			targets: this.targets(this.MODELS_URL, range),
			urlType: UrlType.ANCHORS,
			method: OkPornMethods.getModels,
			service: ServiceType.OKPORN,
			modelArgs: args
		});
	}

	public async getModelVideoIds(modelName: string, range: PageRange = this.DEFAULT_PAGE_RANGE): Promise<OkPornModelVideoIdsOutput> {
		const [modelVideos] = await this.execute<OkPornModelVideoIdsOutput>({
			targets: this.targets(`${this.MODELS_URL}${modelName}/`, range),
			urlType: UrlType.ANCHORS,
			method: OkPornMethods.getModelVideoIds,
			service: ServiceType.OKPORN
		});

		return modelVideos;
	}

	public getTags(args: TagFilterOptions): Promise<OkPornTagOutput[]> {
		return this.execute<OkPornTagOutput>({
			targets: [this.TAGS_URL],
			urlType: UrlType.ANCHORS,
			method: OkPornMethods.getTags,
			service: ServiceType.OKPORN,
			tagArgs: args
		});
	}

	/** Pagination starts from 1 and ends at 21 */
	public getChannels(range: PageRange = this.DEFAULT_PAGE_RANGE, args?: OkPornIdType): Promise<OkPornChannelOutput[]> {
		if (range.limit > this.CHANNEL_PAGE_LIMIT) {
			throw new InvalidRangeException(range.page, range.limit, ServiceType.OKPORN, OkPornMethods.getChannels);
		}
		return this.execute<OkPornChannelOutput>({
			targets: this.targets(this.CHANNELS_URL, range),
			urlType: UrlType.ANCHORS,
			method: OkPornMethods.getChannels,
			service: ServiceType.OKPORN,
			channelArgs: args
		});
	}

	public getVideos(range: IndexRange = this.DEFAULT_INDEX_RANGE, args?: VideoQuality[]): Promise<OkPornVideoOutput[]> {
		return this.execute<OkPornVideoOutput>({
			targets: this.targets(this.VIDEOS_URL, range),
			urlType: UrlType.SOURCES,
			method: OkPornMethods.getVideos,
			service: ServiceType.OKPORN,
			videoArgs: { allowedQualities: args }
		});
	}

	public async getVideo(id: string, args?: VideoQuality[]): Promise<OkPornVideoOutput> {
		const [video] = await this.execute<OkPornVideoOutput>({
			targets: [`${this.VIDEOS_URL}${id}/`],
			urlType: UrlType.SOURCES,
			method: OkPornMethods.getVideo,
			service: ServiceType.OKPORN,
			videoArgs: { allowedQualities: args }
		});

		return video;
	}

	private targets(baseUrl: string, range: Range) {
		const isIndexRange = 'start' in range;

		if (isIndexRange) {
			const { start, end } = range;
			if (start < 0 || end < 0 || start > end)
				throw new InvalidRangeException(start, end, ServiceType.OKPORN, OkPornMethods.getAlbums);
			return Array.from({ length: end + 1 - start }, (_, i) => `${baseUrl}${start + i}/`);
		} else {
			const { page, limit } = range;
			if (page < 1 || limit < 1) throw new InvalidRangeException(page, page + limit, ServiceType.OKPORN, OkPornMethods.getAlbums);
			return Array.from({ length: limit }, (_, i) => `${baseUrl}${page + i}/`);
		}
	}
}
