import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { OutputType, VideoQuality } from '@types';
import { PornDoeExecArgs, PornDoeOutput, PornDoeVideoOutput, PornDoeVideoSource } from './PornDoeContracts';
import { PornDoeMethods } from './PornDoeTypes';

export class PornDoeTransformer extends BaseTransformer<PornDoeExecArgs, DefaultExecutionResult | PornDoeVideoOutput> {
	private readonly MP4_URL = 'https://porndoe.com/service/index.json?device=mobile&height=869&width=1440';

	public async transform(url: string, request?: PornDoeExecArgs): Promise<DefaultExecutionResult | PornDoeVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<PornDoeOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case PornDoeMethods.getVideo:
				return this.toVideoOutput(metadata, request);
			default:
				return metadata;
		}
	}

	private async toVideoOutput(
		metadata: DefaultExecutionResult<Partial<PornDoeOutput>>,
		request: PornDoeExecArgs
	): Promise<PornDoeVideoOutput> {
		const pornDoeFields = metadata.customFields as PornDoeOutput;

		const mp4Sources = await this.httpClient.fetchJson(
			`${this.MP4_URL}&page=${pornDoeFields.banners?.page}&id=${pornDoeFields.banners?.id}`,
			{
				...request,
				outputType: request.outputType as OutputType,
				referer: request.entryUrl,
				headers: {
					'Accept': '*/*',
					'Accept-Language': 'en,en-GB;q=0.9,en-US;q=0.8',
					'Referer': request.entryUrl
				}
			}
		);

		const player = mp4Sources?.payload?.player;

		const videos = (player?.sources?.mp4 || []) as PornDoeVideoSource[];
		const hds = player?.sources?.deo ?? [];

		const preview = player?.preview?.url;
		const poster = player.poster;

		videos.push(...hds);

		return {
			description: metadata.description,
			pageUrl: pornDoeFields.pageUrl,
			title: metadata.title,
			id: pornDoeFields.id,
			videos: { mp4: videos.map((video) => ({ url: video.link, quality: `${video.height}p` as VideoQuality })) },
			preview,
			poster,
			tags: metadata.keywords || [],
			uploader: pornDoeFields.uploader
		};
	}
}
