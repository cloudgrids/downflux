import { ExecutionArgs, PipelineItem } from '@app/contracts';
import { ProviderType } from '@app/shared';
import { FileManager } from '@app/storage';
import { DefaultPipeline } from './DefaultPipeline';
import { HqPornPipeline } from './HqPornPipeline';
import { OkPornPipeline } from './OkPornPipeline';
import { PornHubPipeline } from './PornHubPipeline';
import { PornsOkPipeline } from './PornsOkPipeline';
import { TnAFlixPipeline } from './TnAFlixPipeline';
import { WallHavenPipeline } from './WallHavenPipeline';
import { XHamsterPipeline } from './XHamsterPipeline';
import { XVideosPipeline } from './XVideosPipeline';

type PipelineCtor = new (fileManager: FileManager) => DefaultPipeline<any, any>;

export class PipelineRegistry {
	constructor(protected fileManager: FileManager) {}

	private readonly pipelines: Map<ProviderType, PipelineCtor> = new Map<ProviderType, PipelineCtor>([
		[ProviderType.Coomer, DefaultPipeline],
		[ProviderType.Default, DefaultPipeline],
		[ProviderType.HqPorn, HqPornPipeline],
		[ProviderType.OkPorn, OkPornPipeline],
		[ProviderType.PornHub, PornHubPipeline],
		[ProviderType.PornsOk, PornsOkPipeline],
		[ProviderType.TnAFlix, TnAFlixPipeline],
		[ProviderType.WallHaven, WallHavenPipeline],
		[ProviderType.XHamster, XHamsterPipeline],
		[ProviderType.XVideos, XVideosPipeline]
	]);

	public build<TResult, TExec extends ExecutionArgs>(metadata: TResult, request: TExec): PipelineItem[] {
		const provider = request.provider ?? ProviderType.Default;

		const PipelineClass = this.pipelines.get(provider) ?? this.pipelines.get(ProviderType.Default)!;

		const pipeline = new PipelineClass(this.fileManager);

		return pipeline.build(metadata, request);
	}
}
