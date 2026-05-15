import { BaseProvider, TagFilterOptions } from '@base';
import { GenericException, InvalidRangeException } from '@core/exceptions';
import { ExtractionTarget, IndexRange, PageRange, ProviderType, VideoQuality } from '@types';
import {
	OkPornAlbumOutput,
	OkPornChannelOutput,
	OkPornExecArgs,
	OkPornIdType,
	OkPornModelOutput,
	OkPornModelVideoIdsOutput,
	OkPornTagOutput,
	OkPornVideoOutput
} from './OkPornContracts';
import { OkPornMethods } from './OkPornTypes';

/**
 * OkPorn provider
 * remarks Model pages are limited to 555 pages. Channel pages are limited to 21 pages.
 * This provider can be used with both `ok.porn` and `ok.xxx` domains.
 * Provides: album, video, model, tag, and channel operations.
 * Provides m3u8 links
 * Dependencies: - ffmpeg (for m3u8 to mp4 conversion)
 */
export class OkPornProvider extends BaseProvider<OkPornExecArgs> {
	protected readonly provider = ProviderType.OkPorn;
	private readonly BASE_URLS = {
		PORN: 'https://ok.porn',
		XXX: 'https://ok.xxx'
	};
	private readonly MODEL_VIDEO_PAGE_LIMIT = 555;
	private readonly CHANNEL_PAGE_LIMIT = 21;
	private readonly DEFAULT_PAGE_RANGE: PageRange = { page: 1, limit: 1 };
	private readonly DEFAULT_INDEX_RANGE: IndexRange = { start: 1, end: 1 };
	private readonly PROVIDER_REGEX =
		/^https:\/\/(?:www\.)?ok\.(?:porn|xxx)\/(albums|video|videos|tags|channels|models)\/?([a-zA-Z0-9]+)?\/?$/i;
	private readonly urlMatch: RegExpMatchArray | null = this.url.match(this.PROVIDER_REGEX);

	constructor(url: string) {
		super(url, {
			provider: ProviderType.OkPorn,
			urlPattern: /^(?:www\.)?ok\.(?:porn|xxx)$/i,
			metadata: {
				hasHls: true,
				hasMp4: true,
				hasKvs: false,
				underGeoRestriction: false,
				requiresBrowser: false,
				sniSpoofing: 'untested'
			}
		});
	}

	get baseUrl(): string {
		return this.url.includes('porn') ? this.BASE_URLS.PORN : this.BASE_URLS.XXX;
	}

	get albumsUrl(): string {
		if (this.urlMatch?.[1] !== 'albums') throw new GenericException('Invalid URL', this.provider, OkPornMethods.getAlbums);

		return `${this.baseUrl}/albums/`;
	}

	get albumUrl(): string {
		const albumId = this.urlMatch?.[2];

		if (!albumId) throw new GenericException('Album id is missing or not found', this.provider, OkPornMethods.getAlbums);

		if (!/^\d+$/i.test(albumId) || this.urlMatch?.[1] !== 'albums') {
			throw new GenericException('Invalid album url', this.provider, OkPornMethods.getAlbums);
		}

		return `${this.baseUrl}/${this.urlMatch?.[1]}/${albumId}/`;
	}

	get videoUrl(): string {
		const videoId = this.urlMatch?.[2];

		if (!videoId) throw new GenericException('Video id is missing or not found', this.provider, OkPornMethods.getVideo);

		if (!/^\d+$/i.test(videoId) || this.urlMatch?.[1] !== 'video') {
			throw new GenericException('Invalid video url', this.provider, OkPornMethods.getVideo);
		}

		return `${this.baseUrl}/${this.urlMatch?.[1]}/${videoId}/`;
	}

	get videosUrl(): string {
		if (this.urlMatch?.[1] !== 'videos') throw new GenericException('Invalid URL', this.provider, OkPornMethods.getModels);

		return `${this.baseUrl}/videos/`;
	}

	get modelUrl(): string {
		const modelName = this.urlMatch?.[2];

		if (!modelName) throw new GenericException('Model name is missing or not found', this.provider, OkPornMethods.getModels);

		if (this.urlMatch?.[1] !== 'models') throw new GenericException('Invalid model url', this.provider, OkPornMethods.getModels);

		return `${this.baseUrl}/${this.urlMatch?.[1]}/${modelName}/`;
	}

	get modelsUrl(): string {
		if (this.urlMatch?.[1] !== 'models') throw new GenericException('Invalid URL', this.provider, OkPornMethods.getModels);

		return `${this.baseUrl}/models/`;
	}

	get tagsUrl(): string {
		if (this.urlMatch?.[1] !== 'tags') throw new GenericException('Invalid URL', this.provider, OkPornMethods.getTags);

		return `${this.baseUrl}/tags/`;
	}

	get channelsUrl(): string {
		if (this.urlMatch?.[1] !== 'channels') throw new GenericException('Invalid URL', this.provider, OkPornMethods.getChannels);

		return `${this.baseUrl}/channels/`;
	}

	/**
	 * Gets albums by page range.
	 * @param param Page range
	 * @returns `OkPornAlbumOutput[]` list
	 * @throws InvalidRangeException When the page range is invalid
	 * true
	 */
	public async getAlbums(param: PageRange = this.DEFAULT_PAGE_RANGE): Promise<OkPornAlbumOutput[]> {
		return await this.execute<OkPornAlbumOutput[]>({
			...this.makeTargets(this.albumsUrl, param, this.provider, OkPornMethods.getAlbums),
			extractionTarget: ExtractionTarget.IMAGES,
			executionShape: 'multiple'
		});
	}

	/**
	 * Gets a single album.
	 * @returns `OkPornAlbumOutput`
	 * true
	 */
	public async getAlbum(): Promise<OkPornAlbumOutput> {
		return await this.execute<OkPornAlbumOutput>({
			targets: [this.albumUrl],
			extractionTarget: ExtractionTarget.IMAGES,
			method: OkPornMethods.getAlbum,
			provider: this.provider,
			executionShape: 'single'
		});
	}

	/**
	 * Gets models by page range.
	 * @param range Page range
	 * @param args Model identifier output format
	 * @returns `OkPornModelOutput[]` list
	 * @throws InvalidRangeException When the range exceeds the model page limit
	 * @throws GenericException When the model identifier output format is invalid
	 * true
	 */
	public getModels(range: PageRange = this.DEFAULT_PAGE_RANGE, args?: OkPornIdType): Promise<OkPornModelOutput[]> {
		if (range.limit > this.MODEL_VIDEO_PAGE_LIMIT) {
			throw new InvalidRangeException(range.page, range.limit, this.provider, OkPornMethods.getModels);
		}

		return this.execute<OkPornModelOutput[]>({
			...this.makeTargets(this.modelsUrl, range, this.provider, OkPornMethods.getModels),
			extractionTarget: ExtractionTarget.ANCHORS,
			modelArgs: args,
			executionShape: 'multiple'
		});
	}

	/**
	 * Gets video cards for a model.
	 * @param range Page range
	 * @returns `OkPornModelVideoIdsOutput` containing video identifiers and metadata
	 * @throws InvalidRangeException When the range exceeds the model video page limit
	 * @throws GenericException When the username is not provided
	 * true
	 */
	public async getModelVideoIds(range: PageRange = this.DEFAULT_PAGE_RANGE): Promise<OkPornModelVideoIdsOutput> {
		return await this.execute<OkPornModelVideoIdsOutput>({
			...this.makeTargets(this.modelUrl, range, this.provider, OkPornMethods.getModelVideoIds),
			extractionTarget: ExtractionTarget.ANCHORS,
			executionShape: 'single'
		});
	}

	/**
	 * Gets tags by filter options.
	 * @param args Tag filter options
	 * @returns `OkPornTagOutput[]` list in tag format if path is not specified,
	 *          otherwise returns tag URLs or tag names based on the specified format
	 * @throws GenericException When the tag filter options are invalid
	 * false
	 */
	public async getTags(args: TagFilterOptions): Promise<OkPornTagOutput[]> {
		return await this.execute<OkPornTagOutput[]>({
			targets: [this.tagsUrl],
			extractionTarget: ExtractionTarget.ANCHORS,
			method: OkPornMethods.getTags,
			provider: this.provider,
			tagArgs: args,
			executionShape: 'multiple'
		});
	}

	/**
	 * Gets channels by page range.
	 * @param range Page range
	 * @param args Channel identifier output format
	 * @returns `OkPornChannelOutput[]` list
	 * remarks The channel page limit is 21. Exceeding this will throw an InvalidRangeException.
	 * @throws InvalidRangeException When the range exceeds the channel page limit
	 * @throws GenericException When the channel identifier output format is invalid
	 * false
	 */
	public async getChannels(range: PageRange = this.DEFAULT_PAGE_RANGE, args?: OkPornIdType): Promise<OkPornChannelOutput[]> {
		if (range.limit > this.CHANNEL_PAGE_LIMIT) {
			throw new InvalidRangeException(range.page, range.limit, this.provider, OkPornMethods.getChannels);
		}
		return await this.execute<OkPornChannelOutput[]>({
			...this.makeTargets(this.channelsUrl, range, this.provider, OkPornMethods.getChannels),
			extractionTarget: ExtractionTarget.ANCHORS,
			channelArgs: args,
			executionShape: 'multiple'
		});
	}

	/**
	 * Gets videos by index range.
	 * @param range Index range
	 * @param quality Allowed video quality
	 * @returns `OkPornVideoOutput[]` list
	 * @throws InvalidRangeException When the index range is invalid
	 * true
	 */
	public async getVideos(range: IndexRange = this.DEFAULT_INDEX_RANGE, quality?: VideoQuality): Promise<OkPornVideoOutput[]> {
		return await this.execute<OkPornVideoOutput[]>({
			...this.makeTargets(this.videoUrl, range, this.provider, OkPornMethods.getVideos),
			extractionTarget: ExtractionTarget.SOURCES,
			videoArgs: { quality },
			allowedVideoQuality: quality,
			executionShape: 'multiple'
		});
	}

	/**
	 * Gets a single video.
	 * @param quality Allowed video quality
	 * @returns `OkPornVideoOutput`
	 * remarks The video identifier can be found in the video URL (e.g., https://ok.porn/video/12345/ has the identifier "12345")
	 * @throws GenericException When the video ID is not provided
	 * true
	 */
	public async getVideo(quality?: VideoQuality): Promise<OkPornVideoOutput> {
		return await this.execute<OkPornVideoOutput>({
			targets: [this.videoUrl],
			extractionTarget: ExtractionTarget.SOURCES,
			method: OkPornMethods.getVideo,
			provider: this.provider,
			videoArgs: { quality },
			allowedVideoQuality: quality,
			executionShape: 'single'
		});
	}
}
