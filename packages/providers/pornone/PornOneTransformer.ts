import { BaseTransformer } from '@base';
import { DefaultExecutionResult, VideosFormat, VideoSourceOutput } from '@contracts';
import { VideoQuality } from '@types';
import { PornOneExecArgs, PornOneOutput, PornOneVideoOutput } from './PornOneContracts';
import { PornOneMethods } from './PornOneTypes';

/**
 * Normalizes parsed PornOne metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class PornOneTransformer extends BaseTransformer<PornOneExecArgs, DefaultExecutionResult | PornOneVideoOutput> {
	public async transform(url: string, request?: PornOneExecArgs): Promise<DefaultExecutionResult | PornOneVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<PornOneOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case PornOneMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<PornOneOutput>>): PornOneVideoOutput {
		const pornOneFields = metadata.customFields as PornOneOutput;
		const mp4 = this.mapSources(metadata.sources, pornOneFields.quality ?? VideoQuality.QUnknown)?.mp4;
		return {
			categories: pornOneFields.categories,
			description: metadata.description,
			pageUrl: pornOneFields.pageUrl,
			pornStars: pornOneFields.pornStars,
			poster: pornOneFields.poster,
			tags: metadata.keywords,
			title: metadata.title,
			uploader: pornOneFields.uploader,
			videos: {
				mp4: this.uniqueVideos(mp4 || [], {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				})
			}
		};
	}

	private mapSources(sources: string[], quality: string): VideosFormat {
		return {
			mp4: sources?.filter((url) => url.includes('pornone')).map((url) => ({ url, quality: quality })) as VideoSourceOutput[]
		};
	}
}
