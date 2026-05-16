import { BaseTransformer } from '@base';
import { DefaultExecutionResult, VideosFormat, VideoSourceOutput } from '@contracts';
import { VideoQuality } from '@types';
import { Porn300ExecArgs, Porn300Output, Porn300VideoOutput } from './Porn300Contracts';
import { Porn300Methods } from './Porn300Types';

export class Porn300Transformer extends BaseTransformer<Porn300ExecArgs, DefaultExecutionResult | Porn300VideoOutput> {
	public async transform(url: string, request?: Porn300ExecArgs): Promise<DefaultExecutionResult | Porn300VideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<Porn300Output>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case Porn300Methods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<Porn300Output>>): Porn300VideoOutput {
		const porn300Fields = metadata.customFields as Porn300VideoOutput;
		return {
			description: porn300Fields.description,
			pageUrl: porn300Fields.pageUrl,
			poster: porn300Fields.poster,
			title: metadata.title,
			tags: metadata.keywords || [],
			videos: this.mapSources(metadata.sources)
		};
	}

	private mapSources(sources: string[]): VideosFormat {
		return {
			mp4: this.uniqueVideos(
				sources
					?.filter((source) => source?.includes('porn300'))
					.map((video) => ({
						url: video,
						quality: VideoQuality.QUnknown
					})) as VideoSourceOutput[],
				{
					getQuality: (video) => video.quality,
					getUrl: (video) => video.url
				}
			)
		};
	}
}
