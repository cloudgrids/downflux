import { GenericException, InvalidUrlException } from '../exceptions';
import {
	IndexRange,
	OutputType,
	ServiceType,
	UrlType,
	WallHavenExecArgs,
	WallHavenMethods,
	WallHavenThumbnailQuality,
	WallHavenUserExecArgs,
	WallHavenUserFavoriteCollection,
	WallHavenUserInfo,
	WallHavenUserUploadsOutput,
	WallHavenWallPaperOutput
} from '../util';
import { BaseService } from './BaseService';

/**
 * WallHaven service.
 * Provides wallpaper and user upload operations.
 */
export class WallHavenService extends BaseService<WallHavenExecArgs> {
	private readonly BASE_URL = 'https://wallhaven.cc';
	private readonly WALLPAPER_URL = `${this.BASE_URL}/w`;
	private readonly USER_URL = `${this.BASE_URL}/user`;
	private readonly DEFAULT_INDEX_RANGE: IndexRange = { start: 1, end: 1 };

	/**
	 * Creates a WallHaven service.
	 * @param url WallHaven URL
	 * @throws InvalidUrlException When the URL is not WallHaven
	 */
	constructor(url: string) {
		super(url);
		this.validateUrl(url);
	}

	protected override validateUrl(url: string): void {
		if (!url.includes('wallhaven.cc')) throw new InvalidUrlException(url, ServiceType.WALLHAVEN);
	}

	/**
	 * Gets a single wallpaper.
	 * @param id WallHaven wallpaper identifier
	 * @param thumbQualities Thumbnail qualities to include
	 * @returns Wallpaper metadata and thumbnails
	 * @throws GenericException When the ID is missing
	 */
	public async getWallPaper(id: string, thumbQualities?: WallHavenThumbnailQuality[]): Promise<WallHavenWallPaperOutput> {
		if (!id) throw new GenericException('Wallpaper ID is required', ServiceType.WALLHAVEN, WallHavenMethods.getWallPaper);

		const [wallPaper] = await this.execute<WallHavenWallPaperOutput>({
			targets: [`${this.WALLPAPER_URL}/${id}`],
			method: WallHavenMethods.getWallPaper,
			service: ServiceType.WALLHAVEN,
			urlType: UrlType.IMAGES,
			thumbQualities
		});

		return wallPaper;
	}

	/**
	 * Gets uploads for a WallHaven user.
	 * @param args User upload options WallHavenUserExecArgs
	 * @param range Page index range or 'all' to get all pages (defaults to first page)
	 * @returns User upload metadata and thumbnails
	 */
	public async getUserUploads(
		args: WallHavenUserExecArgs,
		range: 'all' | IndexRange = this.DEFAULT_INDEX_RANGE
	): Promise<WallHavenUserUploadsOutput> {
		const existingOptions = this.jobOptions;

		const [result] = await this.execute<WallHavenUserUploadsOutput>({
			...this.makeTargets(
				`${this.USER_URL}/${args.username}/uploads?purity=${this.purity(args)}&page=`,
				await this.range(range, async () => (await this.setOutput(OutputType.RETURN).getUserUploadsInfo(args.username)).totalPages),
				ServiceType.WALLHAVEN,
				WallHavenMethods.getUserUploads,
				false
			),
			...existingOptions,
			userArgs: args,
			urlType: UrlType.IMAGES
		});

		return result;
	}

	/**
	 * Gets the upload info for a WallHaven user.
	 * @param username WallHaven username
	 * @returns Total upload images count
	 * @throws GenericException When the username is missing
	 */
	public async getUserUploadsInfo(username: string): Promise<WallHavenUserInfo> {
		if (!username) throw new GenericException('Username is required', ServiceType.WALLHAVEN, WallHavenMethods.getUserUploadsInfo);

		const [uploadsCount] = await this.execute<WallHavenUserInfo>({
			targets: [`${this.USER_URL}/${username}/uploads`],
			method: WallHavenMethods.getUserUploadsInfo,
			service: ServiceType.WALLHAVEN,
			userArgs: { username }
		});

		return uploadsCount;
	}

	/**
	 * Gets the favorite collections for a WallHaven user.
	 * @returns User favorite collections metadata and thumbnails
	 * @throws GenericException When the username is missing
	 */
	public async getUserFavoriteCollections(
		args: WallHavenUserExecArgs,
		range: 'all' | IndexRange = this.DEFAULT_INDEX_RANGE
	): Promise<WallHavenUserFavoriteCollection[]> {
		if (!args?.username) {
			throw new GenericException('Username is required', ServiceType.WALLHAVEN, WallHavenMethods.getUserFavoriteCollections);
		}

		return await this.execute<WallHavenUserFavoriteCollection>({
			...this.makeTargets(
				`${this.USER_URL}/${args.username}/favorites?purity=${this.purity(args)}&page=`,
				await this.range(range),
				ServiceType.WALLHAVEN,
				WallHavenMethods.getUserFavoriteCollections,
				false
			),
			urlType: UrlType.IMAGES,
			userArgs: args
		});
	}

	public async getUserFavorites(): Promise<void> {
		throw new Error('Method not implemented yet');
	}

	public async getWallPapers(): Promise<void> {
		throw new Error('Method not implemented yet');
	}

	private async range(range: 'all' | IndexRange = this.DEFAULT_INDEX_RANGE, func?: () => Promise<number>): Promise<IndexRange> {
		return range === 'all' ? { start: 1, end: (await func?.()) as number } : range;
	}

	private purity(args: WallHavenUserExecArgs): number {
		return args?.purity ? 100 : 110;
	}
}
