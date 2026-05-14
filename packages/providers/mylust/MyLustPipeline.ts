import { BasePipeline } from '@base';
import { IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { MediaType } from '@types';
import { MyLustExecArgs, MyLustOutput } from './MyLustContracts';

export class MyLustPipeline extends BasePipeline<MyLustExecArgs, MyLustOutput> {
	public override build(metadata: MyLustOutput, request: MyLustExecArgs): PipelineItem[] {
		return this.sliceByMaxDownloads(
			request,
			this.filterByExt(
				request,
				this.extract(request, metadata).map((item) => ({
					downloadUrl: item.url,
					sourceUrl: request.entryUrl,
					provider: request.provider,
					identifier: {
						mediaType: item.mediaType,
						...this.fileManager.detectResourceType(item.url, request),
						key: this.buildIdentifier({
							mediaType: item.mediaType,
							metadata,
							url: item.url,
							id: item.id
						})
					}
				}))
			)
		);
	}

	protected override buildIdentifier(ctx: IdentifierContext<MyLustOutput>): string {
		const { mediaType, id, metadata } = ctx;
		const prefix = 'MyLust';
		let mediaSegment: string;

		switch (mediaType) {
			case MediaType.VIDEOS:
				mediaSegment = `${MediaType.VIDEOS}/${id}`;
				break;

			case MediaType.VIDEO_POSTER:
				mediaSegment = `${MediaType.VIDEOS}/${id}/${mediaType}`;
				break;

			default:
				mediaSegment = `${mediaType}/${id}`;
		}

		return this.pathBuilder.join(prefix, this.pathBuilder.spaceNormalizer(metadata.uploader), mediaSegment);
	}

	protected override extract(request: MyLustExecArgs, metadata: MyLustOutput): PipelineExtractedItem[] {
		const urls: Set<PipelineExtractedItem> = new Set();

		if (metadata?.videos?.length) {
			this.filterByQuality(metadata.videos, {
				allowedQuality: request.allowedVideoQuality,
				getQuality: (item) => item.quality
			}).forEach((video) => {
				urls.add({
					url: video.url,
					id: metadata.videoId || metadata.title,
					mediaType: MediaType.VIDEOS
				});
			});
		}

		if (metadata?.poster) {
			urls.add({
				url: metadata.poster,
				id: metadata.videoId || metadata.title,
				mediaType: MediaType.IMAGES
			});
		}

		return Array.from(urls);
	}
}
