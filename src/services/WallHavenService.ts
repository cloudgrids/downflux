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
	WallHavenUserFavoriteCollectionOutput,
	WallHavenUserFavoriteCollectionsOutput,
	WallHavenUserFavoritesExecArgs,
	WallHavenUserInfoOutput,
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
	private readonly Default_INDEX_RANGE: IndexRange = { start: 1, end: 1 };

	/**
	 * Creates a WallHaven service.
	 * @param url WallHaven URL
	 * @throws InvalidUrlException When the URL is not from WallHaven
	 */
	constructor(url: string) {
		super(url);
		this.validateUrl(url);
	}

	/**
	 * @override Validates that the URL is from WallHaven.
	 */
	protected override validateUrl(url: string): void {
		try {
			new URL(url);
		} catch {
			throw new InvalidUrlException(url, ServiceType.WallHaven);
		}
		if (!url.startsWith('https://wallhaven.cc/')) throw new InvalidUrlException(url, ServiceType.WallHaven);
	}

	/**
	 * Gets a single wallpaper.
	 * @param id WallHaven wallpaper identifier
	 * @param thumbQualities Thumbnail qualities to include in the response (defaults to all qualities)
	 * @returns `WallHavenWallPaperOutput` Wallpaper metadata and thumbnails
	 * @throws `GenericException` When the ID is missing
	 */
	public async getWallPaper(id: string, thumbQualities?: WallHavenThumbnailQuality[]): Promise<WallHavenWallPaperOutput> {
		if (!id) throw new GenericException('Wallpaper ID is required', ServiceType.WallHaven, WallHavenMethods.getWallPaper);

		return await this.execute<WallHavenWallPaperOutput>({
			targets: [`${this.WALLPAPER_URL}/${id}`],
			method: WallHavenMethods.getWallPaper,
			service: ServiceType.WallHaven,
			urlType: UrlType.IMAGES,
			thumbQualities,
			returnType: 'object'
		});
	}

	/**
	 * Gets uploads for a WallHaven user.
	 * @param args User upload options WallHavenUserExecArgs
	 * @param range Page index range or 'all' to get all pages (defaults to first page)
	 * @returns `WallHavenUserUploadsOutput` User upload metadata and thumbnails
	 */
	public async getUserUploads(
		args: WallHavenUserExecArgs,
		range: 'all' | IndexRange = this.Default_INDEX_RANGE
	): Promise<WallHavenUserUploadsOutput> {
		const existingOptions = this.jobOptions;

		return await this.execute<WallHavenUserUploadsOutput>({
			...this.makeTargets(
				`${this.USER_URL}/${args.username}/uploads?purity=${this.purity(args)}&page=`,
				await this.range(range, async () => (await this.setOutput(OutputType.RETURN).getUserUploadsInfo(args.username)).totalPages),
				ServiceType.WallHaven,
				WallHavenMethods.getUserUploads,
				false
			),
			returnType: 'object',
			...existingOptions,
			userArgs: args,
			urlType: UrlType.IMAGES
		});
	}

	/**
	 * Gets the upload info for a WallHaven user.
	 * @param username WallHaven username
	 * @returns `WallHavenUserInfo` Total upload images count
	 * @throws `GenericException` When the username is missing
	 */
	public async getUserUploadsInfo(username: string): Promise<WallHavenUserInfoOutput> {
		if (!username) throw new GenericException('Username is required', ServiceType.WallHaven, WallHavenMethods.getUserUploadsInfo);

		return await this.execute<WallHavenUserInfoOutput>({
			targets: [`${this.USER_URL}/${username}/uploads`],
			method: WallHavenMethods.getUserUploadsInfo,
			service: ServiceType.WallHaven,
			userArgs: { username },
			returnType: 'object'
		});
	}

	/**
	 * Gets the favorite collections for a WallHaven user.
	 * @returns `WallHavenUserFavoriteCollection[]` User favorite collections metadata and thumbnails
	 * @throws `GenericException` When the username is missing
	 */
	public async getUserFavoriteCollections(
		args: WallHavenUserExecArgs,
		range: 'all' | IndexRange = this.Default_INDEX_RANGE
	): Promise<WallHavenUserFavoriteCollectionsOutput[]> {
		if (!args?.username) {
			throw new GenericException('Username is required', ServiceType.WallHaven, WallHavenMethods.getUserFavoriteCollections);
		}

		return await this.execute<WallHavenUserFavoriteCollectionsOutput[]>({
			...this.makeTargets(
				`${this.USER_URL}/${args.username}/favorites?purity=${this.purity(args)}&page=`,
				await this.range(range),
				ServiceType.WallHaven,
				WallHavenMethods.getUserFavoriteCollections,
				false
			),
			urlType: UrlType.IMAGES,
			returnType: 'array',
			userArgs: args
		});
	}

	/**
	 * Gets favorite collection of a WallHaven user.
	 * @param args User upload options WallHavenUserExecArgs
	 * @param range Page index range or 'all' to get all pages (defaults to first page)
	 * @returns `WallHavenUserUploadsOutput` User upload metadata and thumbnails
	 */
	public async getUserFavoritesCollection(
		args: WallHavenUserFavoritesExecArgs,
		range: 'all' | IndexRange = this.Default_INDEX_RANGE
	): Promise<WallHavenUserFavoriteCollectionOutput> {
		const existingOptions = this.jobOptions;

		return await this.execute<WallHavenUserFavoriteCollectionOutput>({
			...this.makeTargets(
				`${this.USER_URL}/${args.username}/favorites/${args.collectionId}?purity=${this.purity(args)}&page=`,
				await this.range(range, async () => (await this.setOutput(OutputType.RETURN).getUserUploadsInfo(args.username)).totalPages),
				ServiceType.WallHaven,
				WallHavenMethods.getUserFavoriteCollection,
				false
			),
			returnType: 'object',
			...existingOptions,
			collectionArgs: args,
			urlType: UrlType.IMAGES
		});
	}

	public async getWallPapers(): Promise<void> {
		throw new Error('Method not implemented yet');
	}

	private async range(range: 'all' | IndexRange = this.Default_INDEX_RANGE, func?: () => Promise<number>): Promise<IndexRange> {
		return range === 'all' ? { start: 1, end: (await func?.()) as number } : range;
	}

	private purity(args: WallHavenUserExecArgs): number {
		return args?.purity ? 100 : 110;
	}
}
