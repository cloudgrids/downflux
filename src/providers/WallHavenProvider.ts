import {
	WallHavenExecArgs,
	WallHavenUserExecArgs,
	WallHavenUserFavoriteCollectionOutput,
	WallHavenUserFavoriteCollectionsOutput,
	WallHavenUserFavoritesExecArgs,
	WallHavenUserInfoOutput,
	WallHavenUserUploadsOutput,
	WallHavenWallPaperOutput
} from '@app/contracts';
import { GenericException, InvalidUrlException } from '@app/exceptions';
import { OutputType, ProviderType, UrlType, WallHavenMethods, WallHavenThumbnailQuality } from '@app/shared';
import { IndexRange } from '@app/types';
import { Provider } from './Provider';

/**
 * WallHaven provider.
 * Provides wallpaper and user upload operations.
 */
export class WallHavenProvider extends Provider<WallHavenExecArgs> {
	private readonly provider = ProviderType.WallHaven;
	private readonly BASE_URL = 'https://wallhaven.cc';
	private readonly WALLPAPER_URL = `${this.BASE_URL}/w`;
	private readonly USER_URL = `${this.BASE_URL}/user`;
	private readonly DefaultIndexRange: IndexRange = { start: 1, end: 1 };

	constructor(url: string) {
		super(url);
		this.validate(url);
	}

	/**
	 * @override Validates that the URL is from WallHaven.
	 */
	protected override validate(url: string): void {
		try {
			new URL(url);
		} catch {
			throw new InvalidUrlException(url, this.provider);
		}
		if (!url.startsWith('https://wallhaven.cc/')) throw new InvalidUrlException(url, this.provider);
	}

	/**
	 * Gets a single wallpaper.
	 * @param id WallHaven wallpaper identifier
	 * @param thumbQualities Thumbnail qualities to include in the response (defaults to all qualities)
	 * @returns `WallHavenWallPaperOutput` Wallpaper metadata and thumbnails
	 * @throws `GenericException` When the ID is missing
	 * @notes This method downloads the found urls and returns the metadata and thumbnail URLs without downloading the full wallpaper image.
	 * @canDownload true
	 */
	public async getWallPaper(id: string, thumbQualities?: WallHavenThumbnailQuality[]): Promise<WallHavenWallPaperOutput> {
		if (!id) throw new GenericException('Wallpaper ID is required', this.provider, WallHavenMethods.getWallPaper);

		return await this.execute<WallHavenWallPaperOutput>({
			targets: [`${this.WALLPAPER_URL}/${id}`],
			method: WallHavenMethods.getWallPaper,
			provider: this.provider,
			urlType: UrlType.IMAGES,
			thumbQualities,
			executionShape: 'single'
		});
	}

	/**
	 * Gets uploads for a WallHaven user.
	 * @param args User upload options WallHavenUserExecArgs
	 * @param range Page index range or 'all' to get all pages (defaults to first page)
	 * @returns `WallHavenUserUploadsOutput` User upload metadata and thumbnails
	 * @throws `GenericException` When the username is missing
	 * @notes This method downloads the images and metadata for a user's uploads
	 * @notes The method will fetch the total number of pages for the user's uploads and iterate through them based on the specified range to retrieve all relevant metadata and thumbnail URLs.
	 * @canDownload true
	 */
	public async getUserUploads(
		args: WallHavenUserExecArgs,
		range: 'all' | IndexRange = this.DefaultIndexRange
	): Promise<WallHavenUserUploadsOutput> {
		const existingOptions = this.jobOptions;

		return await this.execute<WallHavenUserUploadsOutput>({
			...this.makeTargets(
				`${this.USER_URL}/${args.username}/uploads?purity=${this.purity(args)}&page=`,
				await this.range(range, async () => (await this.setOutput(OutputType.RETURN).getUserUploadsInfo(args.username)).totalPages),
				this.provider,
				WallHavenMethods.getUserUploads,
				false
			),
			executionShape: 'single',
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
	 * @notes This method only fetches the total upload count and total pages for a user, it does not download any images or thumbnails.
	 * @notes This method is used internally to determine the number of pages to fetch when retrieving user uploads.
	 * @canDownload false
	 */
	public async getUserUploadsInfo(username: string): Promise<WallHavenUserInfoOutput> {
		if (!username) throw new GenericException('Username is required', this.provider, WallHavenMethods.getUserUploadsInfo);

		return await this.execute<WallHavenUserInfoOutput>({
			targets: [`${this.USER_URL}/${username}/uploads`],
			method: WallHavenMethods.getUserUploadsInfo,
			provider: this.provider,
			userArgs: { username },
			executionShape: 'single'
		});
	}

	/**
	 * Gets the favorite collections for a WallHaven user.
	 * @returns `WallHavenUserFavoriteCollection[]` User favorite collections metadata and thumbnails
	 * @throws `GenericException` When the username is missing
	 * @notes This method downloads and fetches the favorite collection metadata and thumbnail URLs
	 * @canDownload true
	 */
	public async getUserFavoriteCollections(
		args: WallHavenUserExecArgs,
		range: 'all' | IndexRange = this.DefaultIndexRange
	): Promise<WallHavenUserFavoriteCollectionsOutput[]> {
		if (!args?.username) {
			throw new GenericException('Username is required', this.provider, WallHavenMethods.getUserFavoriteCollections);
		}

		return await this.execute<WallHavenUserFavoriteCollectionsOutput[]>({
			...this.makeTargets(
				`${this.USER_URL}/${args.username}/favorites?purity=${this.purity(args)}&page=`,
				await this.range(range),
				this.provider,
				WallHavenMethods.getUserFavoriteCollections,
				false
			),
			urlType: UrlType.IMAGES,
			executionShape: 'multiple',
			userArgs: args
		});
	}

	/**
	 * Gets favorite collection of a WallHaven user.
	 * @param args User upload options WallHavenUserExecArgs
	 * @param range Page index range or 'all' to get all pages (defaults to first page)
	 * @returns `WallHavenUserUploadsOutput` User upload metadata and thumbnails
	 * @throws `GenericException` When the username or collection ID is missing
	 * @notes This method downloads the images and metadata for a specific favorite collection, it does not download any images.
	 * @canDownload true
	 */
	public async getUserFavoritesCollection(
		args: WallHavenUserFavoritesExecArgs,
		range: 'all' | IndexRange = this.DefaultIndexRange
	): Promise<WallHavenUserFavoriteCollectionOutput> {
		const existingOptions = this.jobOptions;

		return await this.execute<WallHavenUserFavoriteCollectionOutput>({
			...this.makeTargets(
				`${this.USER_URL}/${args.username}/favorites/${args.collectionId}?purity=${this.purity(args)}&page=`,
				await this.range(range, async () => (await this.setOutput(OutputType.RETURN).getUserUploadsInfo(args.username)).totalPages),
				this.provider,
				WallHavenMethods.getUserFavoriteCollection,
				false
			),
			executionShape: 'single',
			...existingOptions,
			collectionArgs: args,
			urlType: UrlType.IMAGES
		});
	}

	public async getWallPapers(): Promise<void> {
		throw new Error('Method not implemented yet');
	}

	private async range(range: 'all' | IndexRange = this.DefaultIndexRange, func?: () => Promise<number>): Promise<IndexRange> {
		return range === 'all' ? { start: 1, end: (await func?.()) as number } : range;
	}

	private purity(args: WallHavenUserExecArgs): number {
		return args?.purity ? 100 : 110;
	}
}
