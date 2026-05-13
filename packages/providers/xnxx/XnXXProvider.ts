import { BaseProvider } from '@base';
import { ExtractionTarget, ProviderType } from '@types';
import { XnXXExecArgs, XnXXVideoOutput } from './XnXXContracts';
import { XnXXMethods } from './XnXXTypes';

/**
 * @class XnXXProvider
 * @extends BaseProvider
 * @description Provider for XnXX video downloader.
 * @fileoverview Provides m3u8 links
 * @dependencies ffmpeg (for m3u8 to mp4 conversion)
 */
export class XnXXProvider extends BaseProvider<XnXXExecArgs> {
	protected readonly provider = ProviderType.XnXX;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.XnXX,
			urlPattern: /^(?:www\.)?xnxx(?:\d+)?\.(?:com|health)$/i
		});
	}

	/**
	 * @returns `XnXXVideoOutput` with video metadata and source URLs.
	 * @description Fetches video sources from the provided XnXX URL.
	 * @throws `GenericException` when the video sources cannot be extracted
	 * @canDownload `true`
	 */
	public async getVideo(): Promise<XnXXVideoOutput> {
		return await this.execute<XnXXVideoOutput>({
			targets: [this.url],
			method: XnXXMethods.getVideo,
			executionShape: 'single',
			provider: this.provider,
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
