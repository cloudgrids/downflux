import { InvalidRangeException, InvalidUrlException } from '../exceptions';
import {
	OkPornAlbumOutput,
	OkPornChannelOutput,
	OkPornExecArgs,
	OkPornIdType,
	OkPornMethods,
	OkPornModelOutput,
	OkPornTagOutput,
	OkPornVideoOutput,
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

	constructor(url: string) {
		super(url);
		this.validateUrl(url);
	}

	protected override validateUrl(url: string): void {
		if (!url.startsWith('https://ok.porn/')) throw new InvalidUrlException(url, ServiceType.OKPORN);
	}

	public async getAlbums(param: Range): Promise<OkPornAlbumOutput[]> {
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
	public getModels(range: Range, args?: OkPornIdType): Promise<OkPornModelOutput[]> {
		return this.execute<OkPornModelOutput>({
			targets: this.targets(this.MODELS_URL, range),
			urlType: UrlType.ANCHORS,
			method: OkPornMethods.getModels,
			service: ServiceType.OKPORN,
			modelArgs: args
		});
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
	public getChannels(range: Range, args?: OkPornIdType): Promise<OkPornChannelOutput[]> {
		return this.execute<OkPornChannelOutput>({
			targets: this.targets(this.CHANNELS_URL, range),
			urlType: UrlType.ANCHORS,
			method: OkPornMethods.getChannels,
			service: ServiceType.OKPORN,
			channelArgs: args
		});
	}

	public getVideos(range: Range, args?: VideoQuality[]): Promise<OkPornVideoOutput[]> {
		return this.execute<OkPornVideoOutput>({
			targets: this.targets(this.VIDEOS_URL, range),
			urlType: UrlType.SOURCES,
			method: OkPornMethods.getVideos,
			service: ServiceType.OKPORN,
			videoArgs: args
		});
	}

	public async getVideo(id: string, args?: VideoQuality[]): Promise<OkPornVideoOutput> {
		const [video] = await this.execute<OkPornVideoOutput>({
			targets: [`${this.VIDEOS_URL}${id}/`],
			urlType: UrlType.SOURCES,
			method: OkPornMethods.getVideo,
			service: ServiceType.OKPORN,
			videoArgs: args
		});

		return video;
	}

	private targets(baseUrl: string, range: Range) {
		if (range.type === 'index') {
			const { start, end } = range;
			if (start < 0 || end < 0 || start > end)
				throw new InvalidRangeException(start, end, ServiceType.OKPORN, OkPornMethods.getAlbums);
			return Array.from({ length: end - start + 1 }, (_, i) => `${baseUrl}${start + i}/`);
		} else {
			const { page, limit } = range;
			if (page < 1 || limit < 1) throw new InvalidRangeException(page, page + limit, ServiceType.OKPORN, OkPornMethods.getAlbums);
			return Array.from({ length: limit }, (_, i) => `${baseUrl}${page + i}/`);
		}
	}
}
