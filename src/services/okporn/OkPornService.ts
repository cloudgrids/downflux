import { Range } from '../../common';
import { ServiceType, UrlType } from '../../enums';
import { OkPornMethods } from '../../enums/services/OkPornMethods';
import { InvalidRangeException } from '../../exceptions/InvalidRangeError';
import { InvalidUrlException } from '../../exceptions/InvalidUrlException';
import { ExecutionResult } from '../../types';
import { BaseService } from '../BaseService';
import { OkPornAlbumOutput } from './output/OkPornAlbumOutput';

export class OkPornService extends BaseService {
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
		if (!url.startsWith('https://ok.porn/')) {
			throw new InvalidUrlException(url, ServiceType.OKPORN);
		}
	}

	public async getAlbums(param: Range): Promise<ExecutionResult<OkPornAlbumOutput>> {
		return await this.execute<OkPornAlbumOutput>({
			targets: this.targets(this.ALBUMS_URL, param),
			method: OkPornMethods.getAlbums,
			service: ServiceType.OKPORN,
			urlType: UrlType.IMAGES
		});
	}

	public getAlbum(id: string) {
		return this.execute({
			targets: [`${this.ALBUMS_URL}${id}/`],
			urlType: UrlType.IMAGES,
			method: OkPornMethods.getAlbum,
			service: ServiceType.OKPORN
		});
	}

	public getModels(range: Range) {
		return this.execute({
			targets: this.targets(this.MODELS_URL, range),
			urlType: UrlType.ANCHORS,
			method: OkPornMethods.getModels,
			service: ServiceType.OKPORN
		});
	}

	public getTags(startsWith: string = 'all') {
		const tagsUrl = startsWith === 'all' ? this.TAGS_URL : `${this.TAGS_URL}${startsWith}/`;

		return this.execute({
			targets: [tagsUrl],
			urlType: UrlType.ANCHORS,
			method: OkPornMethods.getTags,
			service: ServiceType.OKPORN
		});
	}

	public getChannels(range: Range) {
		return this.execute({
			targets: this.targets(this.CHANNELS_URL, range),
			urlType: UrlType.ANCHORS,
			method: OkPornMethods.getChannels,
			service: ServiceType.OKPORN
		});
	}

	public getVideos(range: Range) {
		return this.execute({
			targets: this.targets(this.VIDEOS_URL, range),
			urlType: UrlType.ANCHORS,
			method: OkPornMethods.getVideos,
			service: ServiceType.OKPORN
		});
	}

	public getVideo(id: string) {
		return this.execute({
			targets: [`${this.VIDEOS_URL}${id}/`],
			urlType: UrlType.SOURCES,
			method: OkPornMethods.getVideo,
			service: ServiceType.OKPORN
		});
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
