import { BaseProvider } from '@base';
import { ExtractionTarget, Provider } from '@types';
import { XVideosExecArgs, XVideosVideoOutput } from './XVideosContracts';
import { XVideosMethods } from './XVideosTypes';

/**
 * @class XVideosProvider
 * @extends BaseProvider
 *
 * Provider for XVideos video downloader.
 * Provides m3u8 links
 *
 * The `xvideos.com` does not have any flashVars but for subdomains like `xvideos2` has flashVars which contains the video sources.
 * So we have to handle both cases in the extractor.
 *
 * @remarks
 * XVideos supports video downloading (canDownload: true).
 * Dependencies: ffmpeg (for m3u8 to mp4 conversion)
 */
export class XVideosProvider extends BaseProvider<XVideosExecArgs> {
	protected readonly provider = Provider.XVideos;

	constructor(url: string) {
		super(url, {
			provider: Provider.XVideos,
			urlPattern: /(?:www\.)?xvideos(?:\d+)?\.(?:com)$/i,
			metadata: {
				hasHls: true,
				type: 'adult',
				hasMp4: true,
				hlsIntegrated: true,
				mp4Integrated: false,
				hasKvs: true, // for subdomains like xvideos2
				underGeoRestriction: false,
				requiresBrowser: false,
				canDownload: true,
				underDevelopment: true,
				cloudflareChallenge: false,
				sniSpoofing: 'failed' // for xvideos.com, untested for subdomains like xvideos2
			}
		});
	}

	/**
	 * @returns `XVideosVideoOutput` with video metadata and source URLs.
	 * Fetches video sources from the provided XVideos URL.
	 * @throws `GenericException` when the video sources cannot be extracted
	 * `true`
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
