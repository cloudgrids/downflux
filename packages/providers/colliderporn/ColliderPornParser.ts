import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType, VideoQuality } from '@types';
import { ColliderPornOutput } from './ColliderPornContracts';

export class ColliderPornParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<ColliderPornOutput>>> {
		const mp4s = [this.extractScriptMethodInput('setVideoUrlLow', html), this.extractScriptMethodInput('setVideoUrlHigh', html)]?.map(
			(url) => ({ url, quality: VideoQuality.QUnknown })
		);

		const hls = [this.extractScriptMethodInput('setVideoUrlHls', html)]?.map((url) => ({ url, quality: VideoQuality.QUnknown }));

		const altMp4s = this.collectElements(html, 'source')?.map((source) => ({
			url: source.src,
			quality: (source.title as VideoQuality) || VideoQuality.QUnknown
		}));

		try {
			return {
				customFields: {
					tags: [],
					description: '',
					pageUrl: sourceUrl,
					poster: this.extractScriptMethodInput('setThumbUrl', html),
					videos: { mp4: mp4s?.length ? mp4s : altMp4s, hls: hls },
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
