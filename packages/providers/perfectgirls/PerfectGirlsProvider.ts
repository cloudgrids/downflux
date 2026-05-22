import { BaseProvider, TagFilterOptions } from '@base';
import { GenericException, InvalidRangeException } from '@core/exceptions';
import { ExtractionTarget, IndexRange, PageRange, Provider, VideoQuality } from '@types';
import {
	PerfectGirlsAlbumOutput,
	PerfectGirlsChannelOutput,
	PerfectGirlsExecArgs,
	PerfectGirlsIdType,
	PerfectGirlsModelOutput,
	PerfectGirlsModelVideoIdsOutput,
	PerfectGirlsTagOutput,
	PerfectGirlsVideoOutput
} from './PerfectGirlsContracts';
import { PerfectGirlsMethods } from './PerfectGirlsTypes';

/**
 * @class PerfectGirlsProvider
 * This provider can be used with both `perfectdamen.co` and `perfectgirls.xxx` domains.
 * Provides: album, video, model, tag, and channel operations.
 * Provides m3u8 links
 * Dependencies: - ffmpeg (for m3u8 to mp4 conversion)
 *
 * @remarks
 * PerfectGirls supports video downloading (canDownload: true).
 */
export class PerfectGirlsProvider extends BaseProvider<PerfectGirlsExecArgs> {
	protected readonly provider = Provider.PerfectGirls;
	private readonly BASE_URLS = {
		PORN: 'https://perfectdamen.co',
		XXX: 'https://perfectgirls.xxx'
	};
	private readonly MODEL_VIDEO_PAGE_LIMIT = 555;
	private readonly CHANNEL_PAGE_LIMIT = 21;
	private readonly DEFAULT_PAGE_RANGE: PageRange = { page: 1, limit: 1 };
	private readonly DEFAULT_INDEX_RANGE: IndexRange = { start: 1, end: 1 };
	private readonly PROVIDER_REGEX =
		/^https:\/\/(?:www\.)?(?:perfectgirls|perfectdamen)\.(?:co|xxx)\/(albums|video|videos|tags|channels|models)\/?([a-zA-Z0-9]+)?\/?$/i;
	private readonly urlMatch: RegExpMatchArray | null = this.url.match(this.PROVIDER_REGEX);

	constructor(url: string) {
		super(url, {
			provider: Provider.PerfectGirls,
			urlPattern: /^(?:www\.)?(?:perfectgirls|perfectdamen)\.(?:co|xxx)$/i,
			metadata: {
				hasHls: true,
				type: 'adult',
				hasMp4: false,
				hlsIntegrated: true,
				mp4Integrated: false,
				hasKvs: false,
				underGeoRestriction: false,
				requiresBrowser: false,
				canDownload: true,
				underDevelopment: true,
				cloudflareChallenge: false,
				sniSpoofing: 'untested'
			}
		});
	}

	private get baseUrl(): string {
		return this.url.includes('xxx') ? this.BASE_URLS.XXX : this.BASE_URLS.PORN;
	}

	private get albumsUrl(): string {
		if (this.urlMatch?.[1] !== 'albums') throw new GenericException('Invalid URL', this.provider, PerfectGirlsMethods.getAlbums);

		return `${this.baseUrl}/albums/`;
	}

	private get albumUrl(): string {
		const albumId = this.urlMatch?.[2];

		if (!albumId) throw new GenericException('Album id is missing or not found', this.provider, PerfectGirlsMethods.getAlbums);

		if (!/^\d+$/i.test(albumId) || this.urlMatch?.[1] !== 'albums') {
			throw new GenericException('Invalid album url', this.provider, PerfectGirlsMethods.getAlbums);
		}

		return `${this.baseUrl}/${this.urlMatch?.[1]}/${albumId}/`;
	}

	private get videoUrl(): string {
		const videoId = this.urlMatch?.[2];

		if (!videoId) throw new GenericException('Video id is missing or not found', this.provider, PerfectGirlsMethods.getVideo);

		if (!/^\d+$/i.test(videoId) || this.urlMatch?.[1] !== 'video') {
			throw new GenericException('Invalid video url', this.provider, PerfectGirlsMethods.getVideo);
		}

		return `${this.baseUrl}/${this.urlMatch?.[1]}/${videoId}/`;
	}

	private get videosUrl(): string {
		if (this.urlMatch?.[1] !== 'videos') throw new GenericException('Invalid URL', this.provider, PerfectGirlsMethods.getModels);

		return `${this.baseUrl}/videos/`;
	}

	private get modelUrl(): string {
		const modelName = this.urlMatch?.[2];

		if (!modelName) throw new GenericException('Model name is missing or not found', this.provider, PerfectGirlsMethods.getModels);

		if (this.urlMatch?.[1] !== 'models') throw new GenericException('Invalid model url', this.provider, PerfectGirlsMethods.getModels);

		return `${this.baseUrl}/${this.urlMatch?.[1]}/${modelName}/`;
	}

	private get modelsUrl(): string {
		if (this.urlMatch?.[1] !== 'models') throw new GenericException('Invalid URL', this.provider, PerfectGirlsMethods.getModels);

		return `${this.baseUrl}/models/`;
	}

	private get tagsUrl(): string {
		if (this.urlMatch?.[1] !== 'tags') throw new GenericException('Invalid URL', this.provider, PerfectGirlsMethods.getTags);

		return `${this.baseUrl}/tags/`;
	}

	private get channelsUrl(): string {
		if (this.urlMatch?.[1] !== 'channels') throw new GenericException('Invalid URL', this.provider, PerfectGirlsMethods.getChannels);

		return `${this.baseUrl}/channels/`;
	}

	/**
	 * Gets albums by page range.
	 * @param param Page range
	 * @returns `PerfectGirlsAlbumOutput[]` list
	 * @throws InvalidRangeException When the page range is invalid
	 * true
	 */
	public async getAlbums(param: PageRange = this.DEFAULT_PAGE_RANGE): Promise<PerfectGirlsAlbumOutput[]> {
		return await this.execute<PerfectGirlsAlbumOutput[]>({
			...this.makeTargets(this.albumsUrl, param, this.provider, PerfectGirlsMethods.getAlbums),
			extractionTarget: ExtractionTarget.IMAGES,
			executionShape: 'multiple'
		});
	}

	/**
	 * Gets a single album.
	 * @returns `PerfectGirlsAlbumOutput`
	 * true
	 */
	public async getAlbum(): Promise<PerfectGirlsAlbumOutput> {
		return await this.execute<PerfectGirlsAlbumOutput>({
			targets: [this.albumUrl],
			extractionTarget: ExtractionTarget.IMAGES,
			method: PerfectGirlsMethods.getAlbum,
			provider: this.provider,
			executionShape: 'single'
		});
	}

	/**
	 * Gets models by page range.
	 * @param range Page range
	 * @param args Model identifier output format
	 * @returns `PerfectGirlsModelOutput[]` list
	 * @throws InvalidRangeException When the range exceeds the model page limit
	 * @throws GenericException When the model identifier output format is invalid
	 * true
	 */
	public getModels(range: PageRange = this.DEFAULT_PAGE_RANGE, args?: PerfectGirlsIdType): Promise<PerfectGirlsModelOutput[]> {
		if (range.limit > this.MODEL_VIDEO_PAGE_LIMIT) {
			throw new InvalidRangeException(range.page, range.limit, this.provider, PerfectGirlsMethods.getModels);
		}

		return this.execute<PerfectGirlsModelOutput[]>({
			...this.makeTargets(this.modelsUrl, range, this.provider, PerfectGirlsMethods.getModels),
			extractionTarget: ExtractionTarget.ANCHORS,
			modelArgs: args,
			executionShape: 'multiple'
		});
	}

	/**
	 * Gets video cards for a model.
	 * @param range Page range
	 * @returns `PerfectGirlsModelVideoIdsOutput` containing video identifiers and metadata
	 * @throws InvalidRangeException When the range exceeds the model video page limit
	 * @throws GenericException When the username is not provided
	 * true
	 */
	public async getModelVideoIds(range: PageRange = this.DEFAULT_PAGE_RANGE): Promise<PerfectGirlsModelVideoIdsOutput> {
		return await this.execute<PerfectGirlsModelVideoIdsOutput>({
			...this.makeTargets(this.modelUrl, range, this.provider, PerfectGirlsMethods.getModelVideoIds),
			extractionTarget: ExtractionTarget.ANCHORS,
			executionShape: 'single'
		});
	}

	/**
	 * Gets tags by filter options.
	 * @param args Tag filter options
	 * @returns `PerfectGirlsTagOutput[]` list in tag format if path is not specified,
	 *          otherwise returns tag URLs or tag names based on the specified format
	 * @throws GenericException When the tag filter options are invalid
	 * false
	 */
	public async getTags(args: TagFilterOptions): Promise<PerfectGirlsTagOutput[]> {
		return await this.execute<PerfectGirlsTagOutput[]>({
			targets: [this.tagsUrl],
			extractionTarget: ExtractionTarget.ANCHORS,
			method: PerfectGirlsMethods.getTags,
			provider: this.provider,
			tagArgs: args,
			executionShape: 'multiple'
		});
	}

	/**
	 * Gets channels by page range.
	 * @param range Page range
	 * @param args Channel identifier output format
	 * @returns `PerfectGirlsChannelOutput[]` list
	 * remarks The channel page limit is 21. Exceeding this will throw an InvalidRangeException.
	 * @throws InvalidRangeException When the range exceeds the channel page limit
	 * @throws GenericException When the channel identifier output format is invalid
	 * false
	 */
	public async getChannels(range: PageRange = this.DEFAULT_PAGE_RANGE, args?: PerfectGirlsIdType): Promise<PerfectGirlsChannelOutput[]> {
		if (range.limit > this.CHANNEL_PAGE_LIMIT) {
			throw new InvalidRangeException(range.page, range.limit, this.provider, PerfectGirlsMethods.getChannels);
		}
		return await this.execute<PerfectGirlsChannelOutput[]>({
			...this.makeTargets(this.channelsUrl, range, this.provider, PerfectGirlsMethods.getChannels),
			extractionTarget: ExtractionTarget.ANCHORS,
			channelArgs: args,
			executionShape: 'multiple'
		});
	}

	/**
	 * Gets videos by index range.
	 * @param range Index range
	 * @param quality Allowed video quality
	 * @returns `PerfectGirlsVideoOutput[]` list
	 * @throws InvalidRangeException When the index range is invalid
	 * true
	 */
	public async getVideos(range: IndexRange = this.DEFAULT_INDEX_RANGE, quality?: VideoQuality): Promise<PerfectGirlsVideoOutput[]> {
		return await this.execute<PerfectGirlsVideoOutput[]>({
			...this.makeTargets(this.videoUrl, range, this.provider, PerfectGirlsMethods.getVideos),
			extractionTarget: ExtractionTarget.SOURCES,
			videoArgs: { quality },
			allowedVideoQuality: quality,
			executionShape: 'multiple'
		});
	}

	/**
	 * Gets a single video.
	 * @param quality Allowed video quality
	 * @returns `PerfectGirlsVideoOutput`
	 * remarks The video identifier can be found in the video URL (e.g., https://ok.porn/video/12345/ has the identifier "12345")
	 * @throws GenericException When the video ID is not provided
	 * true
	 */
	public async getVideo(quality?: VideoQuality): Promise<PerfectGirlsVideoOutput> {
		return await this.execute<PerfectGirlsVideoOutput>({
			targets: [this.videoUrl],
			extractionTarget: ExtractionTarget.SOURCES,
			method: PerfectGirlsMethods.getVideo,
			provider: this.provider,
			videoArgs: { quality },
			allowedVideoQuality: quality,
			executionShape: 'single'
		});
	}
}
