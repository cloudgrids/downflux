import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { OutputType, VideoQuality } from '@types';
import { BeegExecArgs, BeegVideoMetadata, BeegVideoOutput } from './BeegContracts';
import { BeegMethods } from './BeegTypes';

/**
 * @class `BeegTransformer`
 * Transforms raw data fetched from the Beeg API into a structured format suitable for video downloading.
 * The transformer is designed to work with the Beeg API's response structure and may need adjustments if the API changes.
 * Provides all quality videos along with posters
 */
export class BeegTransformer extends BaseTransformer<BeegExecArgs, DefaultExecutionResult | BeegVideoOutput> {
	private readonly REFERER = 'https://beeg.com/';
	private readonly VIDEO_ORIGIN = 'https://video.beeg.com';
	private readonly API_URL = 'https://store.externulls.com/facts/file';

	public async transform(url: string, request?: BeegExecArgs): Promise<DefaultExecutionResult | BeegVideoOutput> {
		switch (request?.method) {
			case BeegMethods.getVideo:
				return await this.toVideoOutput(request);
			default:
				return {
					title: 'Beeg_title_not_found',
					description: 'Beeg_description_not_found',
					keywords: [],
					status: 200,
					anchors: [],
					images: [],
					links: [],
					sources: [],
					sourceUrl: url,
					videoSources: []
				};
		}
	}

	private async toVideoOutput(request: BeegExecArgs): Promise<BeegVideoOutput> {
		const parsedData = await this.requestData(`${this.API_URL}/${request.id}`, {
			...request,
			outputType: request.outputType as OutputType,
			referer: this.REFERER
		});

		const fetchedFile = parsedData?.file;
		const description = fetchedFile?.data[0]?.cd_value || 'Beeg_description_not_found';
		const videos = fetchedFile?.qualities?.h264 as BeegVideoMetadata[];
		const videoId = videos?.[0]?.id;
		const fallBackVideo = [
			{
				url: `${this.VIDEO_ORIGIN}/${fetchedFile?.fallback}`,
				quality: fetchedFile?.fallback?.match(/\/(\d{3,4}p)\//)?.[1] as VideoQuality
			}
		];

		return {
			description: description,
			username: 'unknown',
			title: '',
			poster: '',
			tags: [],
			videoId: videoId?.toString() ?? 'unknown',
			pageUrl: request.entryUrl,
			videos: {
				hls: this.uniqueVideos(videos ?? [], {
					getUrl: (video) => `${this.VIDEO_ORIGIN}/${video.url}`,
					getQuality: (video) => `${video.quality}p` as VideoQuality
				}),
				mp4: this.uniqueVideos(fallBackVideo, {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				})
			}
		};
	}
}
