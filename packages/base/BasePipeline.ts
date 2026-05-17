import {
	DefaultExecutionResult,
	ExecutionArgs,
	IdentifierContext,
	PipelineExtractedItem,
	PipelineExtractionHandler,
	PipelineItem
} from '@contracts';
import { Helper } from '@shared';
import { FileManager, PathBuilder } from '@storage';
import { MediaType, VideoQuality } from '@types';

export class BasePipeline<TExec extends ExecutionArgs, TResult extends DefaultExecutionResult = DefaultExecutionResult> {
	protected readonly pathBuilder = new PathBuilder();
	protected readonly helper = new Helper();

	constructor(protected fileManager: FileManager) {}

	public build(metadata: TResult, request: TExec): PipelineItem[] {
		return this.uniquePipelines(
			this.sliceByMaxDownloads(
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

	protected mappings(metadata: TResult): Array<[unknown[] | undefined, PipelineExtractionHandler<unknown>]> {
		return [
			[
				metadata?.sources,
				{
					getUrl: (x: string) => x,
					getMedia: () => MediaType.VIDEOS
				}
			],

			[
				metadata?.images,
				{
					getUrl: (x: string) => x,
					getMedia: () => MediaType.IMAGES
				}
			]
		] as const;
	}

	protected extract(request: TExec, metadata: any): PipelineExtractedItem[] {
		const urls: PipelineExtractedItem[] = [];

		for (const [elements, handler] of this.mappings(metadata)) {
			this.extractedItems(urls, handler, elements);
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

	protected uniquePipelines(pipelines: PipelineItem[]): PipelineItem[] {
		const uniqueMap = new Map<string, PipelineItem>();

		for (const pipeline of pipelines) {
			if (!uniqueMap.has(pipeline.downloadUrl)) {
				uniqueMap.set(pipeline.downloadUrl, pipeline);
			}
		}

		return Array.from(uniqueMap.values());
	}

	protected extractedItems<T>(targets: PipelineExtractedItem[], handlers: PipelineExtractionHandler<T>, elements?: T[]) {
		if (!elements || elements.length === 0) return [];

		targets.push(
			...elements.filter(Boolean).map(
				(element) =>
					this.helper.shake({
						url: handlers.getUrl(element),
						mediaType: handlers.getMedia(element),
						extension: handlers.getExt?.(element),
						mimeType: handlers.getMime?.(element),
						id: handlers.getId?.(element),
						secondaryId: handlers.getSecId?.(element),
						username: handlers.getUsername?.(element)
					}) as PipelineExtractedItem
			)
		);
	}
}
