import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, IndexRange, OutputType, ProviderType } from '@types';
import {
	WallHavenExecArgs,
	WallHavenUserExecArgs,
	WallHavenUserFavoriteCollectionOutput,
	WallHavenUserFavoriteCollectionsOutput,
	WallHavenUserFavoritesExecArgs,
	WallHavenUserInfoOutput,
	WallHavenUserUploadsOutput,
	WallHavenWallPaperOutput
} from './WallHavenContracts';
import { WallHavenMethods, WallHavenThumbnailQuality } from './WallHavenTypes';

/**
 * WallHaven provider.
 * Provides wallpaper and user upload operations.
 */
export class WallHavenProvider extends BaseProvider<WallHavenExecArgs> {
	protected readonly provider = ProviderType.WallHaven;
	private readonly BASE_URL = 'https://wallhaven.cc';
	private readonly WALLPAPER_URL = `${this.BASE_URL}/w`;
	private readonly USER_URL = `${this.BASE_URL}/user`;
	private readonly DefaultIndexRange: IndexRange = { start: 1, end: 1 };

	constructor(url: string) {
		super(url, {
			provider: ProviderType.WallHaven,
			urlPattern: /^(?:(?:www|th|w)\.)?wallhaven\.cc$/i,
			metadata: {
				hls: false,
				mp4: true,
				kvs: false,
				geoRestriction: false,
				needsBrowser: false
			}
		});
	}

	/**
	 * Gets a single wallpaper.
	 * @param id WallHaven wallpaper identifier
	 * @param thumbQuality Thumbnail qualities to include in the response (defaults to all qualities)
	 * @returns `WallHavenWallPaperOutput` Wallpaper metadata and thumbnails
	 * @throws `GenericException` When the ID is missing
	 * This method downloads the found urls and returns the metadata and thumbnail URLs without downloading the full wallpaper image.
	 * true
	 */
	public async getWallPaper(id: string, thumbQuality?: WallHavenThumbnailQuality): Promise<WallHavenWallPaperOutput> {
		if (!id) throw new GenericException('Wallpaper ID is required', this.provider, WallHavenMethods.getWallPaper);

		return await this.execute<WallHavenWallPaperOutput>({
			targets: [`${this.WALLPAPER_URL}/${id}`],
			method: WallHavenMethods.getWallPaper,
			provider: this.provider,
			extractionTarget: ExtractionTarget.IMAGES,
			thumbQuality,
			executionShape: 'single'
		});
	}

	/**
	 * Gets uploads for a WallHaven user.
	 * @param args User upload options WallHavenUserExecArgs
	 * @param range Page index range or 'all' to get all pages (defaults to first page)
	 * @returns `WallHavenUserUploadsOutput` User upload metadata and thumbnails
	 * @throws `GenericException` When the username is missing
	 * This method downloads the images and metadata for a user's uploads
	 * The method will fetch the total number of pages for the user's uploads and iterate through them based on the specified range to retrieve all relevant metadata and thumbnail URLs.
	 * true
	 */
	public async getUserUploads(
		args: WallHavenUserExecArgs,
		range: 'all' | IndexRange = this.DefaultIndexRange
	): Promise<WallHavenUserUploadsOutput> {
		const existingOptions = this.executionOptions;

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
			extractionTarget: ExtractionTarget.IMAGES
		});
	}

	/**
	 * Gets the upload info for a WallHaven user.
	 * @param username WallHaven username
	 * @returns `WallHavenUserInfo` Total upload images count
	 * @throws `GenericException` When the username is missing
	 * This method only fetches the total upload count and total pages for a user, it does not download any images or thumbnails.
	 * This method is used internally to determine the number of pages to fetch when retrieving user uploads.
	 * false
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
	 * This method downloads and fetches the favorite collection metadata and thumbnail URLs
	 * true
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
			extractionTarget: ExtractionTarget.IMAGES,
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
	 * This method downloads the images and metadata for a specific favorite collection, it does not download any images.
	 * true
	 */
	public async getUserFavoritesCollection(
		args: WallHavenUserFavoritesExecArgs,
		range: 'all' | IndexRange = this.DefaultIndexRange
	): Promise<WallHavenUserFavoriteCollectionOutput> {
		const existingOptions = this.executionOptions;

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
			extractionTarget: ExtractionTarget.IMAGES
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
