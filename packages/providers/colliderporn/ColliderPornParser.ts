import { BaseParser } from '@base';
import { DefaultExecutionResult, VideoSourceOutput } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType, VideoQuality } from '@types';
import { ColliderPornOutput } from './ColliderPornContracts';

export class ColliderPornParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<ColliderPornOutput>>> {
		const mp4s = [this.extractScriptMethodInput('setVideoUrlLow', html), this.extractScriptMethodInput('setVideoUrlHigh', html)]
			?.filter(Boolean)
			?.map((url) => ({ url, quality: VideoQuality.QUnknown }));

		const hls = [this.extractScriptMethodInput('setVideoUrlHls', html)]
			?.filter(Boolean)
			?.map((url) => ({ url, quality: VideoQuality.QUnknown }));

		const uniqueMp4sSources = new Map<string, VideoSourceOutput>();

		this.collectElements(html, 'source')?.forEach((source) => {
			if (source?.src)
				uniqueMp4sSources.set(source.src, {
					url: source.src,
					quality: (source.title as VideoQuality) || VideoQuality.QUnknown
				});
		});

		try {
			return {
				customFields: {
					tags: [],
					description: '',
					pageUrl: sourceUrl,
					poster: this.extractScriptMethodInput('setThumbUrl', html),
					videos: {
						mp4: mp4s?.length ? mp4s : Array.from(uniqueMp4sSources.values()),
						hls: hls?.length ? hls : []
					},
					title: this.extractScriptMethodInput('setVideoTitle', html),
					uploader: this.extractScriptMethodInput('setUploaderName', html),
					videoId: this.extractScriptMethodInput('setVideoId', html)
				} as ColliderPornOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.ColliderPorn, 'ColliderPornParser', { cause: error });
		}
	}
}
