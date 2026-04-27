import { ServiceType, UrlType } from '../../enums';
import { METHOD_MAPPER } from '../../helpers/types';
import { ExecutionResult } from '../../types';
import { BaseService } from '../BaseService';
import { OkPornAlbumOutput } from './output/okporn-album.output';

export class OkPornService extends BaseService {
	private readonly ALBUMS_URL = 'https://ok.porn/albums/';
	private readonly VIDEOS_URL = 'https://ok.porn/video/';
	private readonly MODELS_URL = 'https://ok.porn/models/';
	private readonly TAGS_URL = 'https://ok.porn/tags/';
	private readonly CHANNELS_URL = 'https://ok.porn/channels/';

	constructor(url: string) {
		super(url);
	}

	public async getAlbums(start = 0, end = 10): Promise<ExecutionResult<OkPornAlbumOutput>> {
		return await this.execute<OkPornAlbumOutput>({
			targets: Array.from({ length: end - start + 1 }, (_, i) => `${this.ALBUMS_URL}${start + i}/`),
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

	public getModels(start = 0, end = 10) {
		return this.execute({
			targets: Array.from({ length: end - start + 1 }, (_, i) => `${this.MODELS_URL}${start + i}/`),
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

	public getChannels(start = 0, end = 10) {
		return this.execute({
			targets: Array.from({ length: end - start + 1 }, (_, i) => `${this.CHANNELS_URL}${start + i}/`),
			urlType: UrlType.ANCHORS,
			method: METHOD_MAPPER[ServiceType.OKPORN].getChannels,
			service: ServiceType.OKPORN
		});
	}

	public getVideos(start = 0, end = 10) {
		return this.execute({
			targets: Array.from({ length: end - start + 1 }, (_, i) => `${this.VIDEOS_URL}${start + i}/`),
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
}
