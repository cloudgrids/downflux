import { ExecutionArgs, PipelineItem, ServiceType } from '../util';
import { BasePipeline } from './BasePipeline';
import { OkPornPipeline } from './OkPornPipeline';
import { WallHavenPipeline } from './WallHavenPipeline';

/**
 * Pipelines are stateless and purely functional, so we can maintain a single instance for each service type.
 * The PipelineService acts as a factory to retrieve the appropriate pipeline based on the service type.
 * No per-request instantiation is needed, which optimizes performance and resource usage.
 * No dependency injection is required
 */

type PipelineCtor = new () => BasePipeline<any, any>;

export class PipelineService {
	private static readonly pipelines: Map<ServiceType, PipelineCtor> = new Map<ServiceType, PipelineCtor>([
		[ServiceType.OKPORN, OkPornPipeline],
		[ServiceType.WALLHAVEN, WallHavenPipeline],
		[ServiceType.DEFAULT, BasePipeline]
	]);

	public static build<TResult, TExec extends ExecutionArgs>(metadata: TResult, request: TExec): PipelineItem[] {
		const serviceType = request.service ?? ServiceType.DEFAULT;

		const PipelineClass = this.pipelines.get(serviceType) ?? this.pipelines.get(ServiceType.DEFAULT)!;

		const pipeline = new PipelineClass();

		return pipeline.build(metadata, request);
	}
}
