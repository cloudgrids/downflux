import { FileService } from '../file';
import { ExecutionArgs, PipelineItem, ServiceType } from '../util';
import { BasePipeline } from './BasePipeline';
import { OkPornPipeline } from './OkPornPipeline';
import { PornHubPipeline } from './PornHubPipeline';
import { WallHavenPipeline } from './WallHavenPipeline';

/**
 * Pipelines are stateless and purely functional, so we can maintain a single instance for each service type.
 * The PipelineService acts as a factory to retrieve the appropriate pipeline based on the service type.
 * No per-request instantiation is needed, which optimizes performance and resource usage.
 * No dependency injection is required
 */

type PipelineCtor = new (fileService: FileService) => BasePipeline<any, any>;

export class PipelineService {
	constructor(protected fileService: FileService) {}
	private readonly pipelines: Map<ServiceType, PipelineCtor> = new Map<ServiceType, PipelineCtor>([
		[ServiceType.OkPorn, OkPornPipeline],
		[ServiceType.WallHaven, WallHavenPipeline],
		[ServiceType.Default, BasePipeline],
		[ServiceType.Coomer, BasePipeline],
		[ServiceType.PornHub, PornHubPipeline]
	]);

	public build<TResult, TExec extends ExecutionArgs>(metadata: TResult, request: TExec): PipelineItem[] {
		const serviceType = request.service ?? ServiceType.Default;

		const PipelineClass = this.pipelines.get(serviceType) ?? this.pipelines.get(ServiceType.Default)!;

		const pipeline = new PipelineClass(this.fileService);

		return pipeline.build(metadata, request);
	}
}
