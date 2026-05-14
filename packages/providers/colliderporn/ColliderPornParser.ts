import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { ColliderPornOutput } from './ColliderPornContracts';

export class ColliderPornParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<ColliderPornOutput>>> {
		try {
			return {
				customFields: {
					pageUrl: sourceUrl,
					poster: this.extractScriptMethodInput('setThumbUrl', html),
					videoUrl: {
						low: this.extractScriptMethodInput('setVideoUrlLow', html),
						high: this.extractScriptMethodInput('setVideoUrlHigh', html),
						hls: this.extractScriptMethodInput('setVideoHLS', html)
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
