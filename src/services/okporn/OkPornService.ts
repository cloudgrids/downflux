import { ServiceType, UrlType } from '../../enums';
import { InvalidRangeError } from '../../errors/InvalidRangeError';
import { InvalidUrlError } from '../../errors/InvalidUrlError';
import { METHOD_MAPPER } from '../../helpers/Mappers';
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
	}

	validateUrl(url: string): void {
		if (!url.startsWith('https://ok.porn/')) {
			throw new InvalidUrlError(`Invalid URL for OkPornService: ${url}`);
		}
	}

	public async getAlbums(start = 0, end = 1): Promise<ExecutionResult<OkPornAlbumOutput>> {
		return await this.execute<OkPornAlbumOutput>({
			targets: this.targets(this.ALBUMS_URL, start, end),
			method: METHOD_MAPPER[ServiceType.OKPORN].getAlbums,
			service: ServiceType.OKPORN,
			urlType: UrlType.IMAGES
		});
	}

	public getAlbum(id: string) {
		return this.execute({
			targets: [`${this.ALBUMS_URL}${id}/`],
			urlType: UrlType.IMAGES,
			method: METHOD_MAPPER[ServiceType.OKPORN].getAlbum,
			service: ServiceType.OKPORN
		});
	}

	public getModels(start = 0, end = 1) {
		return this.execute({
			targets: this.targets(this.MODELS_URL, start, end),
			urlType: UrlType.ANCHORS,
			method: METHOD_MAPPER[ServiceType.OKPORN].getModels,
			service: ServiceType.OKPORN
		});
	}

	public getTags(startsWith: string = 'all') {
		const tagsUrl = startsWith === 'all' ? this.TAGS_URL : `${this.TAGS_URL}${startsWith}/`;

		return this.execute({
			targets: [tagsUrl],
			urlType: UrlType.ANCHORS,
			method: METHOD_MAPPER[ServiceType.OKPORN].getTags,
			service: ServiceType.OKPORN
		});
	}

	public getChannels(start = 0, end = 1) {
		return this.execute({
			targets: this.targets(this.CHANNELS_URL, start, end),
			urlType: UrlType.ANCHORS,
			method: METHOD_MAPPER[ServiceType.OKPORN].getChannels,
			service: ServiceType.OKPORN
		});
	}

	public getVideos(start = 0, end = 1) {
		return this.execute({
			targets: this.targets(this.VIDEOS_URL, start, end),
			urlType: UrlType.ANCHORS,
			method: METHOD_MAPPER[ServiceType.OKPORN].getVideos,
			service: ServiceType.OKPORN
		});
	}

	public getVideo(id: string) {
		return this.execute({
			targets: [`${this.VIDEOS_URL}${id}/`],
			urlType: UrlType.SOURCES,
			method: METHOD_MAPPER[ServiceType.OKPORN].getVideo,
			service: ServiceType.OKPORN
		});
	}

	private targets(baseUrl: string, start = 0, end = 1) {
		if (start < 0 || end < 0 || start > end) throw new InvalidRangeError('Invalid range for targets', `${start}-${end}`);
		return Array.from({ length: end - start + 1 }, (_, i) => `${baseUrl}${start + i}/`);
	}
}
