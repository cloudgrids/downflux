import { OutputType, UrlType } from '../types';
import { ImportExecutionRequest } from '../types/ImportExecutionRequest';
import { BaseProvider } from './BaseProvider';

export class OkPornProvider extends BaseProvider {
	private readonly ALBUMS_URL = 'https://ok.porn/albums/';
	private readonly VIDEOS_URL = 'https://ok.porn/videos/';
	private readonly MODELS_URL = 'https://ok.porn/models/';
	private readonly TAGS_URL = 'https://ok.porn/tags/';
	private readonly CHANNELS_URL = 'https://ok.porn/channels/';

	constructor(url: string) {
		super(url);
	}

	private buildRequest(overrides: Partial<ImportExecutionRequest>): ImportExecutionRequest {
		return {
			urls: [this.url],
			baseUrl: this.url,
			urlType: UrlType.IMAGES,
			outputType: OutputType.JSON,
			...this.options,
			...overrides
		};
	}

	private run(overrides: Partial<ImportExecutionRequest>) {
		return this.deps.job.execute(this.buildRequest(overrides));
	}

	public getAlbums(start = 0, end = 10) {
		return this.run({
			urls: Array.from({ length: end - start }, (_, i) => `${this.ALBUMS_URL}${start + i}/`),
			urlType: UrlType.ANCHORS
		});
	}

	public getAlbum(id: string) {
		return this.run({
			urls: [`${this.ALBUMS_URL}${id}/`],
			urlType: UrlType.IMAGES
		});
	}

	public getModels(start = 0, end = 10) {
		return this.run({
			urls: Array.from({ length: end - start }, (_, i) => `${this.MODELS_URL}${start + i}/`),
			urlType: UrlType.ANCHORS
		});
	}

	public getTags(startsWith: string = 'all') {
		return this.run({
			urls: [this.TAGS_URL],
			urlType: UrlType.ANCHORS
		});
	}

	public getChannels(start = 0, end = 10) {
		return this.run({
			urls: Array.from({ length: end - start }, (_, i) => `${this.CHANNELS_URL}${start + i}/`),
			urlType: UrlType.ANCHORS
		});
	}

	public getVideos(start = 0, end = 10) {
		return this.run({
			urls: Array.from({ length: end - start }, (_, i) => `${this.VIDEOS_URL}${start + i}/`),
			urlType: UrlType.ANCHORS
		});
	}

	public getVideo(id: string) {
		return this.run({
			urls: [`${this.VIDEOS_URL}${id}/`],
			urlType: UrlType.SOURCES
		});
	}
}
