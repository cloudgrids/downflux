import { InvalidUrlException } from '../exceptions';
import {
	IndexRange,
	ServiceType,
	UrlType,
	WallHavenExecArgs,
	WallHavenMethods,
	WallHavenThumbnailQuality,
	WallHavenUserUploadsExecArgs,
	WallHavenUserUploadsOutput,
	WallHavenWallPaperOutput
} from '../util';
import { BaseService } from './BaseService';

export class WallHavenService extends BaseService<WallHavenExecArgs> {
	private readonly BASE_URL = 'https://wallhaven.cc';
	private readonly WALLPAPER_URL = `${this.BASE_URL}/w`;
	private readonly USER_URL = `${this.BASE_URL}/user`;
	private readonly DEFAULT_INDEX_RANGE: IndexRange = { start: 1, end: 1 };

	constructor(url: string) {
		super(url);
		this.validateUrl(url);
	}

	public validateUrl(url: string): void {
		if (!url.includes('wallhaven.cc')) throw new InvalidUrlException(url, ServiceType.WALLHAVEN);
	}

	public async getWallPaper(id: string, thumbQualities?: WallHavenThumbnailQuality[]): Promise<WallHavenWallPaperOutput> {
		const [wallPaper] = await this.execute<WallHavenWallPaperOutput>({
			targets: [`${this.WALLPAPER_URL}/${id}`],
			method: WallHavenMethods.getWallPaper,
			service: ServiceType.WALLHAVEN,
			urlType: UrlType.IMAGES,
			thumbQualities
		});

		return wallPaper;
	}

	public async getUserUploads(
		args: WallHavenUserUploadsExecArgs,
		range: IndexRange = this.DEFAULT_INDEX_RANGE
	): Promise<WallHavenUserUploadsOutput> {
		const purity = args?.purity ? 100 : 110;
		const [result] = await this.execute<WallHavenUserUploadsOutput>({
			...this.makeTargets(
				`${this.USER_URL}/${args.username}/uploads?purity=${purity}&page=`,
				range,
				ServiceType.WALLHAVEN,
				WallHavenMethods.getUserUploads,
				false
			),
			userUploadsArgs: args,
			urlType: UrlType.IMAGES
		});

		return result;
	}
}
