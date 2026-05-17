import { BasePipeline } from '@base';
import { IdentifierContext, PipelineMappings } from '@contracts';
import { MediaType } from '@types';
import { XnXXExecArgs, XnXXOutput } from './XnXXContracts';

export class XnXXPipeline extends BasePipeline<XnXXExecArgs, XnXXOutput> {
	protected override buildIdentifier(ctx: IdentifierContext<XnXXOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'xnxx';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;

			case MediaType.VIDEO_POSTER:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;

			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.uploader), mediaSegment);
	}

	protected override mappings(metadata: XnXXOutput, request: XnXXExecArgs): PipelineMappings {
		const videoId = request.entryUrl.split('/').pop();

		return [
			this.createMappings(metadata?.videoUrl ? [metadata.videoUrl.hls] : undefined, {
				getMedia: () => MediaType.VIDEOS,
				getUrl: (url) => url,
				getId: () => videoId || 'unknown'
			}),
			this.createMappings(metadata?.poster ? [metadata.poster] : undefined, {
				getMedia: () => MediaType.VIDEO_POSTER,
				getUrl: (poster) => poster,
				getId: () => videoId || 'unknown'
			})
		];
	}
}
