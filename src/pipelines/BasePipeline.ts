import { detectResourceType } from '../helpers';
import { DefaultExtractorResult, ExecutionArgs, IdentifierContext, MediaType, PipelineExtractedItem, PipelineItem } from '../util';

export class BasePipeline<TExec extends ExecutionArgs, TResult = DefaultExtractorResult> {
	public build(metadata: TResult, request: TExec): PipelineItem[] {
		return this.sliceByMaxDownloads(
			request,
			this.filterByExt(
				request,
				this.extract(request, metadata).map(({ mediaType, url }) => ({
					downloadUrl: url,
					baseUrl: request.entryUrl,
					identifier: {
						mediaType,
						...detectResourceType(url),
						key: this.buildIdentifier({
							mediaType,
							metadata,
							url
						})
					},
					service: request.service
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
		const metadata = ctx.metadata as DefaultExtractorResult;

		return `${new URL(metadata.baseUrl).hostname}/${ctx.mediaType}/${new URL(metadata.baseUrl).pathname.substring(1)}`;
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

		if (metadata.divHrefs?.length) {
			metadata.divHrefs.filter(Boolean).forEach((url) => urls.push({ mediaType: MediaType.OTHER, url }));
		}

		if (metadata.allUrls?.length) {
			metadata.allUrls.filter(Boolean).forEach((url) => urls.push({ mediaType: MediaType.OTHER, url }));
		}

		return urls;
	}

	protected filterByQuality<T, TEnum = string | number>(
		items: T[],
		options: {
			allowedQualities: TEnum[];
			getQuality: (item: T) => TEnum | undefined;
		}
	): T[] {
		const { allowedQualities, getQuality } = options;

		if (!allowedQualities?.length || !getQuality) return items;

		return items.filter((item) => {
			const quality = getQuality(item);
			return quality !== undefined && allowedQualities.includes(quality);
		});
	}
}
