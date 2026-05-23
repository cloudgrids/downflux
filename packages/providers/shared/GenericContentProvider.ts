import { BaseProvider, ProviderMetadata } from '@base';
import { DefaultExecutionResult, ExecutionArgs } from '@contracts';
import { ExtractionTarget, Provider } from '@types';

export interface GenericContentProviderConfig {
	provider: Provider;
	urlPattern: RegExp;
	metadata: ProviderMetadata;
}

export enum GenericContentMethods {
	getMetadata = 'getMetadata',
	getLinks = 'getLinks',
	getImages = 'getImages',
	getVideos = 'getVideos',
	getAudio = 'getAudio',
	getAllUrls = 'getAllUrls'
}

/**
 * Generic provider for sites that can use the default extraction pipeline while
 * site-specific parsers are still being built.
 */
export abstract class GenericContentProvider<TExec extends ExecutionArgs = ExecutionArgs> extends BaseProvider<TExec> {
	constructor(url: string, config: GenericContentProviderConfig) {
		super(url, config);
	}

	public async getMetadata(): Promise<DefaultExecutionResult> {
		return await this.execute<DefaultExecutionResult>({
			provider: this.provider,
			method: GenericContentMethods.getMetadata,
			extractionTarget: ExtractionTarget.ALL_URLS,
			executionShape: 'single',
			targets: [this.url]
		} as TExec & { executionShape: 'single' });
	}

	public async getLinks(): Promise<string[]> {
		const metadata = await this.getMetadata();
		return metadata.anchors;
	}

	public async getImages(): Promise<string[]> {
		const metadata = await this.getMetadata();
		return metadata.images;
	}

	public async getVideos(): Promise<string[]> {
		const metadata = await this.getMetadata();
		return this.unique([...metadata.sources, ...metadata.videoSources]);
	}

	public async getAudio(): Promise<string[]> {
		const metadata = await this.getMetadata();
		return metadata.sources;
	}

	public async getAllUrls(): Promise<string[]> {
		const metadata = await this.getMetadata();
		return this.unique([
			...metadata.anchors,
			...metadata.images,
			...metadata.sources,
			...metadata.videoSources,
			...(metadata.videoPosters ?? []),
			...(metadata.divHREFs ?? []),
			...(metadata.allUrls ?? [])
		]);
	}

	public async getDownloadableResources(): Promise<string[]> {
		const metadata = await this.getMetadata();
		return this.unique([...metadata.images, ...metadata.sources, ...metadata.videoSources, ...(metadata.videoPosters ?? [])]);
	}

	private unique(urls: string[]): string[] {
		return [...new Set(urls.filter(Boolean))];
	}
}
