import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { ColliderPornExecArgs, ColliderPornVideoOutput } from './ColliderPornContracts';
import { ColliderPornMethods } from './ColliderPornTypes';

/**
 * This provider sets embedded video URLs from XVideos,
 * as ColliderPorn is a front for XVideos and doesn't have its own video hosting.
 * So the video metadata is quite limited and we rely on the embedded video data for most of the information.
 * It might not work in some region due to geo-restrictions, as the embedded video URLs are from XVideos.
 */
export class ColliderPornProvider extends BaseProvider<ColliderPornExecArgs> {
	protected readonly provider = ProviderType.ColliderPorn;
	private readonly SUPPORTED_LANGUAGES =
		'en|af|ar|az|be|bg|ca|cs|da|de|el|es|et|fa|ai|fr|he|hi|hr|hu|id|it|ja|ko|lv|nl|no|pl|pt|ro|ru|sk|sl|sq|sr|sv|tl|tr|uk|vi|zh-CN|zh-TW';

	private readonly VIDEO_URL_REGEX = new RegExp(
		`^https:\\/\\/(?:www\\.)?colliderporn\\.com\\/(?:(?:${this.SUPPORTED_LANGUAGES})\\/)?look\\/\\d+\\/.*\\.php$`,
		'i'
	);
	constructor(url: string) {
		super(url, {
			provider: ProviderType.ColliderPorn,
			urlPattern: /^(?:www\.)?colliderporn\.(?:com)$/i
		});
	}

	get videoUrl(): string {
		if (this.VIDEO_URL_REGEX.test(this.url)) return this.url;
		throw new GenericException('Invalid ColliderPorn video URL', this.provider);
	}

	public async getVideo(): Promise<ColliderPornVideoOutput> {
		return await this.execute<ColliderPornVideoOutput>({
			targets: [this.videoUrl],
			method: ColliderPornMethods.getVideo,
			provider: this.provider,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
