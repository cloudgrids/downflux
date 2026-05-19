import { BaseTransformer } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { PussySpaceExecArgs, PussySpaceOutput, PussySpaceVideoOutput } from './PussySpaceContracts';
import { PussySpaceMethods } from './PussySpaceTypes';

/**
 * Normalizes parsed PussySpace metadata into the public output shape.
 *
 * @remarks
 * Transformers bridge raw parser fields and typed provider results, including method-specific output mapping.
 */
export class PussySpaceTransformer extends BaseTransformer<PussySpaceExecArgs, DefaultExecutionResult | PussySpaceVideoOutput> {
	private readonly playerUrl = 'https://www.pussyspace.com/get/player/sb/';

	public async transform(url: string, request?: PussySpaceExecArgs): Promise<DefaultExecutionResult | PussySpaceVideoOutput> {
		const metadata = (await super.transform(url, request)) as DefaultExecutionResult<Partial<PussySpaceOutput>>;

		if (!request?.transformOutput) return metadata;

		switch (request?.method) {
			case PussySpaceMethods.getVideo:
				return this.toVideoOutput(metadata, request);
			default:
				return metadata;
		}
	}

	private async toVideoOutput(
		metadata: DefaultExecutionResult<Partial<PussySpaceOutput>>,
		request: PussySpaceExecArgs
	): Promise<PussySpaceVideoOutput> {
		const pussySpaceFields = metadata.customFields as PussySpaceOutput;

		const metadataFromApi = (await super.transform(this.playerUrl, {
			...request,
			formData: { id: pussySpaceFields.token },
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				/** This is an ajax headers */
				'X-Requested-With': 'XMLHttpRequest',
				'Accept': '*/*'
			}
		})) as DefaultExecutionResult<Partial<PussySpaceOutput>>;

		const videos = metadataFromApi.customFields?.videos;

		return {
			...pussySpaceFields,
			description: metadata.description,
			title: metadata.title,
			videos: {
				mp4: this.uniqueVideos(videos?.mp4 ?? [], {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				}),
				hls: this.uniqueVideos(videos?.hls ?? [], {
					getUrl: (video) => video.url,
					getQuality: (video) => video.quality
				})
			},
			tags: metadata.keywords || []
		};
	}
}
