import { FileService } from '../file';
import { ExecutionArgs, PipelineItem, ServiceType } from '../util';
import { BasePipeline } from './BasePipeline';
import { OkPornPipeline } from './OkPornPipeline';
import { PornHubPipeline } from './PornHubPipeline';
import { WallHavenPipeline } from './WallHavenPipeline';
import { XHamsterPipeline } from './XHamsterPipeline';
import { TnAFlixPipeline } from './TnAFlixPipeline';

type PipelineCtor = new (fileService: FileService) => BasePipeline<any, any>;

export class PipelineService {
	constructor(protected fileService: FileService) {}

	private readonly pipelines: Map<ServiceType, PipelineCtor> = new Map<ServiceType, PipelineCtor>([
		[ServiceType.OkPorn, OkPornPipeline],
		[ServiceType.PornHub, PornHubPipeline],
		[ServiceType.WallHaven, WallHavenPipeline],
		[ServiceType.Coomer, BasePipeline],
		[ServiceType.Default, BasePipeline],
		[ServiceType.XHamster, XHamsterPipeline],
		[ServiceType.TnAFlix, TnAFlixPipeline]
	]);

	public build<TResult, TExec extends ExecutionArgs>(metadata: TResult, request: TExec): PipelineItem[] {
		const serviceType = request.service ?? ServiceType.Default;

		const PipelineClass = this.pipelines.get(serviceType) ?? this.pipelines.get(ServiceType.Default)!;

		const pipeline = new PipelineClass(this.fileService);

		return pipeline.build(metadata, request);
	}
}
