import { BaseTransformer } from '@base';
import { DefaultExecutionResult, VideoSourceOutput } from '@contracts';
import { VideoQuality } from '@types';
import { CumLouderExecArgs, CumLouderOutput, CumLouderVideoOutput } from './CumLouderContracts';
import { CumLouderMethods } from './CumLouderTypes';

export class CumLouderTransformer extends BaseTransformer<CumLouderExecArgs, DefaultExecutionResult | CumLouderVideoOutput> {
	public async transform(url: string, request?: CumLouderExecArgs): Promise<DefaultExecutionResult | CumLouderVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<CumLouderOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case CumLouderMethods.getVideo:
				return this.toVideoOutput(metadata);
			default:
				return metadata;
		}
	}

	private toVideoOutput(metadata: DefaultExecutionResult<Partial<CumLouderOutput>>): CumLouderVideoOutput {
		const cumLouderFields = metadata.customFields as CumLouderOutput;
		return {
			pageUrl: cumLouderFields.pageUrl,
			videos: this.mapSources(metadata.sources),
			poster: cumLouderFields?.poster,
			title: metadata.title,
			description: metadata.description,
			tags: metadata.keywords || []
		};
	}

	private mapSources(sources: string[]): { mp4: VideoSourceOutput[] } {
		return {
			mp4: this.filterAndMapSources(sources).map((video) => ({
				url: video,
				quality: VideoQuality.QUnknown
			})) as VideoSourceOutput[]
		};
	}

	private filterAndMapSources(sources: string[]) {
		return sources?.filter((src) => /^https:\/\/mediacdnst(?:\d+)\.cumlouder\.com\/.*/i.test(src));
	}
}
