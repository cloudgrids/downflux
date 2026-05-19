import {
	DefaultExecutionResult,
	ExecutionArgs,
	IdentifierContext,
	PipelineExtractedItem,
	PipelineExtractionHandler,
	PipelineItem,
	PipelineMapping,
	PipelineMappings
} from '@contracts';
import { Helper } from '@shared';
import { FileManager, PathBuilder } from '@storage';
import { MediaType, VideoQuality } from '@types';

/**
 * Converts extracted metadata into downloadable work items.
 *
 * @remarks
 * Pipelines exist because extraction output is descriptive, while downloads
 * need concrete URLs, media types, file extensions, and stable identifiers.
 * Provider pipelines decide which media are eligible and how files should be
 * grouped on disk.
 */
export class BasePipeline<TExec extends ExecutionArgs, TResult extends DefaultExecutionResult = DefaultExecutionResult> {
	protected readonly pathBuilder = new PathBuilder();
	protected readonly helper = new Helper();

	constructor(protected fileManager: FileManager) {}

	/**
	 * Builds filtered, deduplicated pipeline items for a single metadata result.
	 *
	 * @param metadata Extracted provider metadata.
	 * @param request Execution request with filters and provider options.
	 * @returns Downloadable pipeline items.
	 */
	public build(metadata: TResult, request: TExec): PipelineItem[] {
		return this.uniquePipelines(
			this.sliceByMaxDownloads(
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
							...(item.extension && { extension: item.extension }),
							key: this.buildIdentifier({
								metadata,
								...item
							})
						}
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

	/**
	 * Builds the storage identifier used as the logical output path.
	 *
	 * @param ctx Media item context and source metadata.
	 * @returns Stable identifier for storage and progress output.
	 */
	protected buildIdentifier(ctx: IdentifierContext<TResult>): string {
		const metadata = ctx.metadata as DefaultExecutionResult;

		return `${new URL(metadata.sourceUrl).hostname}/${ctx.mediaType}/${new URL(metadata.sourceUrl).pathname.substring(1)}`;
	}

	protected createMappings<T>(elements: T[] | undefined, handler: PipelineExtractionHandler<T>): PipelineMapping<T> {
		if (!elements || !elements.length) return [undefined, handler];

		return [elements, handler];
	}

	/**
	 * Defines which metadata collections should become pipeline items.
	 *
	 * @param metadata Extracted provider metadata.
	 * @param request Execution request with provider filters.
	 * @returns Mapping definitions used by `extract`.
	 */
	protected mappings(metadata: TResult, request: TExec): PipelineMappings {
		console.log('Resolving to base pipeline mapping:', request);

		return [
			this.createMappings(metadata?.sources, { getUrl: (x) => x, getMedia: () => MediaType.VIDEOS }),
			this.createMappings(metadata?.images, { getUrl: (x) => x, getMedia: () => MediaType.IMAGES })
		];
	}

	protected extract(request: TExec, metadata: TResult): PipelineExtractedItem[] {
		const urls: PipelineExtractedItem[] = [];

		for (const [elements, handler] of this.mappings(metadata, request)) {
			this.extractedItems(urls, handler, elements);
		}

		return urls;
	}

	/**
	 * Applies provider quality filtering without changing source order.
	 *
	 * @param items Source records to filter.
	 * @param options Quality selector and requested quality.
	 * @returns Sources matching the requested quality, or all sources when no quality is requested.
	 */
	protected filterByQuality<T, TEnum = string | number>(
		items: T[] = [],
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
						secondaryId: handlers.getSecondaryId?.(element),
						username: handlers.getUsername?.(element)
					}) as PipelineExtractedItem
			)
		);
	}
}
