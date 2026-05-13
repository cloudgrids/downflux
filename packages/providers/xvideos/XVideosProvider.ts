import { BaseProvider } from '@base';
import { ExtractionTarget, ProviderType } from '@types';
import { XVideosExecArgs, XVideosVideoOutput } from './XVideosContracts';
import { XVideosMethods } from './XVideosTypes';

/**
 * @class XVideosProvider
 * @extends BaseProvider
 * @description Provider for XVideos video downloader.
 * @fileoverview Provides m3u8 links
 * @dependencies ffmpeg (for m3u8 to mp4 conversion)
 */
export class XVideosProvider extends BaseProvider<XVideosExecArgs> {
	protected readonly provider = ProviderType.XVideos;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.XVideos,
			urlPattern: /(?:www\.)?xvideos(?:\d+)?\.(?:com)$/i
		});
	}

	/**
	 * @returns `XVideosVideoOutput` with video metadata and source URLs.
	 * @description Fetches video sources from the provided XVideos URL.
	 * @throws `GenericException` when the video sources cannot be extracted
	 * @canDownload `true`
	 */
	public async getVideo(): Promise<XVideosVideoOutput> {
		return await this.execute<XVideosVideoOutput>({
			targets: [this.url],
			method: XVideosMethods.getVideo,
			executionShape: 'single',
			provider: this.provider,
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
