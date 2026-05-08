import { GenericException, InvalidRangeException, InvalidUrlException } from '../exceptions';
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
	ServiceType,
	TagFilterOptions,
	UrlType,
	VideoQuality
} from '../util';
import { BaseService } from './BaseService';

/**
 * OkPorn service.
 * Provides album, video, model, tag, and channel operations.
 * @remarks Model pages are limited to 555 pages. Channel pages are limited to 21 pages.
 */
export class OkPornService extends BaseService<OkPornExecArgs> {
	private readonly service = ServiceType.OkPorn;
	private readonly ALBUMS_URL = 'https://ok.porn/albums/';
	private readonly VIDEOS_URL = 'https://ok.porn/video/';
	private readonly MODELS_URL = 'https://ok.porn/models/';
	private readonly TAGS_URL = 'https://ok.porn/tags/';
	private readonly CHANNELS_URL = 'https://ok.porn/channels/';
	private readonly MODEL_VIDEO_PAGE_LIMIT = 555;
	private readonly CHANNEL_PAGE_LIMIT = 21;
	private readonly Default_PAGE_RANGE: PageRange = { page: 1, limit: 1 };
	private readonly Default_INDEX_RANGE: IndexRange = { start: 1, end: 1 };

	/**
	 * Creates an OkPorn service.
	 * @param url OkPorn URL
	 * @throws InvalidUrlException When the URL is not OkPorn
	 */
	constructor(url: string) {
		super(url);
		this.validate(url);
	}

	protected override validate(url: string): void {
		try {
			new URL(url);
		} catch {
			throw new InvalidUrlException(url, this.service);
		}
		if (!url.startsWith('https://ok.porn/')) throw new InvalidUrlException(url, this.service);
	}

	/**
	 * Gets albums by page range.
	 * @param param Page range
	 * @returns `OkPornAlbumOutput[]` list
	 * @throws InvalidRangeException When the page range is invalid
	 * @canDownload true
	 * @notes The method will fetch the total number of pages for albums and iterate through them based on the specified range to retrieve all relevant metadata and thumbnail URLs.
	 */
	public async getAlbums(param: PageRange = this.Default_PAGE_RANGE): Promise<OkPornAlbumOutput[]> {
		return await this.execute<OkPornAlbumOutput[]>({
			...this.makeTargets(this.ALBUMS_URL, param, this.service, OkPornMethods.getAlbums),
			urlType: UrlType.IMAGES,
			executionShape: 'multiple'
		});
	}

	/**
	 * Gets a single album.
	 * @param id Album identifier
	 * @returns `OkPornAlbumOutput`
	 * @remarks The album identifier can be found in the album URL (e.g., https://ok.porn/albums/12345/ has the identifier "12345")
	 * @throws GenericException When the album ID is not provided
	 * @canDownload true
	 * @notes The method will retrieve the album metadata and thumbnail URLs based on the specified album ID.
	 */
	public async getAlbum(id: string): Promise<OkPornAlbumOutput> {
		if (!id) throw new GenericException('Album ID is required', this.service, OkPornMethods.getAlbum);
		return await this.execute<OkPornAlbumOutput>({
			targets: [`${this.ALBUMS_URL}${id}/`],
			urlType: UrlType.IMAGES,
			method: OkPornMethods.getAlbum,
			service: this.service,
			executionShape: 'single'
		});
	}

	/**
	 * Gets models by page range.
	 * @param range Page range
	 * @param args Model identifier output format
	 * @returns `OkPornModelOutput[]` list
	 * @remarks The model video page limit is 555. Exceeding this will throw an InvalidRangeException.
	 * @throws InvalidRangeException When the range exceeds the model page limit
	 * @throws GenericException When the model identifier output format is invalid
	 * @canDownload true
	 * @notes The method will fetch the total number of pages for models and iterate through them based on the specified range to retrieve all relevant metadata and thumbnail URLs.
	 */
	public getModels(range: PageRange = this.Default_PAGE_RANGE, args?: OkPornIdType): Promise<OkPornModelOutput[]> {
		if (range.limit > this.MODEL_VIDEO_PAGE_LIMIT) {
			throw new InvalidRangeException(range.page, range.limit, this.service, OkPornMethods.getModels);
		}

		return this.execute<OkPornModelOutput[]>({
			...this.makeTargets(this.MODELS_URL, range, this.service, OkPornMethods.getModels),
			urlType: UrlType.ANCHORS,
			modelArgs: args,
			executionShape: 'multiple'
		});
	}

	/**
	 * Gets video cards for a model.
	 * @param username Model username
	 * @param range Page range
	 * @returns `OkPornModelVideoIdsOutput` containing video identifiers and metadata
	 * @throws InvalidRangeException When the range exceeds the model video page limit
	 * @throws GenericException When the username is not provided
	 * @canDownload true
	 * @notes The method will fetch the total number of pages for the model's videos and iterate through them based on the specified range to retrieve all relevant video identifiers and metadata.
	 */
	public async getModelVideoIds(username: string, range: PageRange = this.Default_PAGE_RANGE): Promise<OkPornModelVideoIdsOutput> {
		if (!username) throw new GenericException('Model username is required', this.service, OkPornMethods.getModelVideoIds);

		return await this.execute<OkPornModelVideoIdsOutput>({
			...this.makeTargets(`${this.MODELS_URL}${username}/`, range, this.service, OkPornMethods.getModelVideoIds),
			urlType: UrlType.ANCHORS,
			executionShape: 'single'
		});
	}

	/**
	 * Gets tags by filter options.
	 * @param args Tag filter options
	 * @returns `OkPornTagOutput[]` list in tag format if path is not specified, otherwise returns tag URLs or tag names based on the specified format
	 * @remarks The tag page is not paginated and will return all tags matching the filter options. Use with specific filters to limit results.
	 * @throws GenericException When the tag filter options are invalid
	 * @remarks This method is not paginated and will return all tags matching the filter options. Use with specific filters to limit results.
	 * @canDownload false
	 * @notes The method will retrieve the tag metadata based on the specified filter options.
	 */
	public async getTags(args: TagFilterOptions): Promise<OkPornTagOutput[]> {
		return await this.execute<OkPornTagOutput[]>({
			targets: [this.TAGS_URL],
			urlType: UrlType.ANCHORS,
			method: OkPornMethods.getTags,
			service: this.service,
			tagArgs: args,
			executionShape: 'multiple'
		});
	}

	/**
	 * Gets channels by page range.
	 * @param range Page range
	 * @param args Channel identifier output format
	 * @returns `OkPornChannelOutput[]` list
	 * @remarks The channel page limit is 21. Exceeding this will throw an InvalidRangeException.
	 * @throws InvalidRangeException When the range exceeds the channel page limit
	 * @throws GenericException When the channel identifier output format is invalid
	 * @canDownload false
	 * @notes The method will fetch the total number of pages for channels and iterate through them based on the specified range to retrieve all relevant metadata and thumbnail URLs.
	 */
	public async getChannels(range: PageRange = this.Default_PAGE_RANGE, args?: OkPornIdType): Promise<OkPornChannelOutput[]> {
		if (range.limit > this.CHANNEL_PAGE_LIMIT) {
			throw new InvalidRangeException(range.page, range.limit, this.service, OkPornMethods.getChannels);
		}
		return await this.execute<OkPornChannelOutput[]>({
			...this.makeTargets(this.CHANNELS_URL, range, this.service, OkPornMethods.getChannels),
			urlType: UrlType.ANCHORS,
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
	 * @canDownload true
	 */
	public async getVideos(range: IndexRange = this.Default_INDEX_RANGE, quality?: VideoQuality): Promise<OkPornVideoOutput[]> {
		return await this.execute<OkPornVideoOutput[]>({
			...this.makeTargets(this.VIDEOS_URL, range, this.service, OkPornMethods.getVideos),
			urlType: UrlType.SOURCES,
			videoArgs: { quality },
			allowedVideoQuality: quality,
			executionShape: 'multiple'
		});
	}

	/**
	 * Gets a single video.
	 * @param id Video identifier
	 * @param quality Allowed video quality
	 * @returns `OkPornVideoOutput`
	 * @remarks The video identifier can be found in the video URL (e.g., https://ok.porn/video/12345/ has the identifier "12345")
	 * @throws GenericException When the video ID is not provided
	 * @canDownload true
	 * @notes The method will retrieve the video metadata and source URLs based on the specified video ID and quality.
	 */
	public async getVideo(id: string, quality?: VideoQuality): Promise<OkPornVideoOutput> {
		if (!id) throw new GenericException('Video ID is required', this.service, OkPornMethods.getVideo);

		return await this.execute<OkPornVideoOutput>({
			targets: [`${this.VIDEOS_URL}${id}/`],
			urlType: UrlType.SOURCES,
			method: OkPornMethods.getVideo,
			service: this.service,
			videoArgs: { quality },
			allowedVideoQuality: quality,
			executionShape: 'single'
		});
	}
}
