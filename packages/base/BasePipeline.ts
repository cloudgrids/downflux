import { DefaultExecutionResult, ExecutionArgs, IdentifierContext, PipelineExtractedItem, PipelineItem } from '@contracts';
import { FileManager, PathBuilder } from '@storage';
import { MediaType, VideoQuality } from '@types';

export class BasePipeline<TExec extends ExecutionArgs, TResult = DefaultExecutionResult> {
	protected readonly pathBuilder = new PathBuilder();

	constructor(protected fileManager: FileManager) {}

	public build(metadata: TResult, request: TExec): PipelineItem[] {
		return this.sliceByMaxDownloads(
			request,
			this.filterByExt(
				request,
				this.extract(request, metadata).map(({ mediaType, url }) => ({
					downloadUrl: url,
					sourceUrl: request.entryUrl,
					identifier: {
						mediaType,
						...this.fileManager.detectResourceType(url, request),
						key: this.buildIdentifier({
							mediaType,
							metadata,
							url
						})
					},
					provider: request.provider
				}))
			)
		);
	}

	protected filterByExt(request: TExec, pipelineItems: PipelineItem[]): PipelineItem[] {
		if (!request.allowedExtensions?.length) return pipelineItems;

		return pipelineItems.filter((item) => request.allowedExtensions?.includes(item.identifier.extension));
	}

	protected sliceByMaxDownloads(request: TExec, items: PipelineItem[]): PipelineItem[] {
		return request.maxDownloads ? items.slice(0, request.maxDownloads) : items;
	}

	protected buildIdentifier(ctx: IdentifierContext<TResult>): string {
		const metadata = ctx.metadata as DefaultExecutionResult;

		return `${new URL(metadata.sourceUrl).hostname}/${ctx.mediaType}/${new URL(metadata.sourceUrl).pathname.substring(1)}`;
	}

	protected extract(request: TExec, metadata: any): PipelineExtractedItem[] {
		const urls: PipelineExtractedItem[] = [];

		if (metadata.images?.length) {
			metadata.images.filter(Boolean).forEach((url) => urls.push({ mediaType: MediaType.IMAGES, url }));
		}

		if (metadata.sources?.length) {
			metadata.sources.filter(Boolean).forEach((url) => urls.push({ mediaType: MediaType.VIDEOS, url }));
		}

		if (metadata.videoPosters?.length) {
			metadata.videoPosters.filter(Boolean).forEach((url) => urls.push({ mediaType: MediaType.VIDEO_POSTER, url }));
		}

		if (metadata.divHREFs?.length) {
			metadata.divHREFs.filter(Boolean).forEach((url) => urls.push({ mediaType: MediaType.OTHER, url }));
		}

		if (metadata.allUrls?.length) {
			metadata.allUrls.filter(Boolean).forEach((url) => urls.push({ mediaType: MediaType.OTHER, url }));
		}

		return urls;
	}

	protected filterByQuality<T, TEnum = string | number>(
		items: T[],
		options: {
			allowedQuality?: TEnum;
			getQuality: (item: T) => TEnum;
		}
	): T[] {
		const { allowedQuality, getQuality } = options;

		if (!allowedQuality || allowedQuality === VideoQuality.QUnknown) return items;

		return items.filter((item) => getQuality(item) === allowedQuality);
	}
}
