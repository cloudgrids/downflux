import { BaseTransformer } from '@base';
import { DefaultExecutionResult, VideosFormat, VideoSourceOutput } from '@contracts';
import { OutputType, ProviderType, VideoQuality } from '@types';
import { EPornerExecArgs, EPornerOutput, EPornerVideoOutput } from './EPornerContracts';
import { EPornerMethods } from './EPornerTypes';

interface EPornerSource {
	src: string;
	type: string;
	label?: string;
	labelShort?: string;
}

export class EPornerTransformer extends BaseTransformer<EPornerExecArgs, DefaultExecutionResult | EPornerVideoOutput> {
	public async transform(url: string, request?: EPornerExecArgs): Promise<DefaultExecutionResult | EPornerVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<EPornerOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case EPornerMethods.getVideo:
				return this.toVideoOutput(request, metadata);
			default:
				return metadata;
		}
	}

	private async toVideoOutput(
		request: EPornerExecArgs,
		metadata: DefaultExecutionResult<Partial<EPornerOutput>>
	): Promise<EPornerVideoOutput> {
		const ePornerFields = metadata.customFields as EPornerOutput;

		return {
			...ePornerFields,
			description: metadata?.description,
			tags: metadata?.keywords,
			title: metadata?.title,
			videos: await this.getVideos(request, ePornerFields)
		};
	}

	private async getVideos(request: EPornerExecArgs, ePornerFields: EPornerOutput): Promise<VideosFormat> {
		const hash = this.getHash(ePornerFields.hash);
		const hostname = new URL(request.entryUrl).hostname;

		const videoJSON = `https://${hostname}/xhr/video/${ePornerFields.videoId}?hash=${hash}&domain=${hostname}&pixelRatio=2&playerWidth=0&playerHeight=0&fallback=false&embed=false&supportedFormats=hls,dash,h265,vp9,av1,mp4&_=${new Date().getTime().toString()}`;

		const json = await this.httpClient.fetchJson(videoJSON, {
			outputType: OutputType.JSON,
			provider: ProviderType.EPorner,
			referer: request.entryUrl
		});

		return {
			mp4: this.transformSources(json?.sources?.mp4),
			hls: this.transformSources(json?.sources?.hls)
		};
	}

	private getHash(hash: string): string {
		return (
			parseInt(hash.substring(0, 8), 16).toString(36) +
			parseInt(hash.substring(8, 16), 16).toString(36) +
			parseInt(hash.substring(16, 24), 16).toString(36) +
			parseInt(hash.substring(24, 32), 16).toString(36)
		);
	}

	private transformSources(data: Record<string, EPornerSource>): VideoSourceOutput[] {
		const urls = new Set<VideoSourceOutput>();
		for (const { src, labelShort } of Object.values(data)) {
			urls.add({
				url: src,
				quality: (labelShort as VideoQuality) ?? VideoQuality.QUnknown
			});
		}
		return Array.from(urls);
	}
}
