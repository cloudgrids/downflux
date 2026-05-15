import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { XGroovyExecArgs, XGroovyVideoOutput } from './XGroovyContracts';
import { XGroovyMethods } from './XGroovyTypes';

/**
 * @class XGroovyProvider
 * @extends BaseProvider
 * Provider for XGroovy video downloader.
 * Provides direct mp4 links
 */
export class XGroovyProvider extends BaseProvider<XGroovyExecArgs> {
	protected readonly provider = ProviderType.XGroovy;
	private readonly VIDEO_PATH_REGEX =
		/^https:\/\/(?:(?:www|rt|pt|de|es|pl|it|cn|jp|ko|nl)?\.)?xgroovy(?:-fr)?\.(?:com)\/videos\/(\d+)\/([-a-zA-z0-9]+)\/$/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.XGroovy,
			urlPattern: /^(?:(?:www|rt|pt|de|es|pl|it|cn|jp|ko|nl)?\.)?xgroovy(?:-fr)?\.(?:com)$/i,
			metadata: {
				hls: false,
				mp4: true,
				kvs: false,
				geoRestriction: false,
				needsBrowser: false
			}
		});
	}

	private get videoUrl() {
		const match = this.url.match(this.VIDEO_PATH_REGEX);

		if (!match) throw new GenericException('Invalid xgroovy url', this.provider);

		return this.url;
	}

	/**
	 * @returns `XGroovyVideoOutput` with video metadata and source URLs.
	 * Fetches video sources from the provided XGroovy URL.
	 * @throws `GenericException` when the video sources cannot be extracted
	 * `true`
	 */
	public async getVideo(): Promise<XGroovyVideoOutput> {
		return await this.execute<XGroovyVideoOutput>({
			targets: [this.videoUrl],
			executionShape: 'single',
			provider: this.provider,
			method: XGroovyMethods.getVideo,
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
