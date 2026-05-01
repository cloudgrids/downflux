import { ExecutionArgs, PipelineItem, ServiceType } from '../util';
import { BasePipeline } from './BasePipeline';
import { OkPornPipeline } from './OkPornPipeline';
import { WallHavenPipeline } from './WallHavenPipeline';

export class PipelineService {
	private readonly pipelines: Map<ServiceType, BasePipeline<any, any>>;

	constructor() {
		this.pipelines = new Map([
			[ServiceType.OKPORN, new OkPornPipeline()],
			[ServiceType.DEFAULT, new BasePipeline()],
			[ServiceType.WALLHAVEN, new WallHavenPipeline()]
		]);
	}

	public build<TExec extends ExecutionArgs>(metadata: any, request: TExec): PipelineItem[] {
		const serviceType = request.service || ServiceType.DEFAULT;
		const pipeline = this.pipelines.get(serviceType) || this.pipelines.get(ServiceType.DEFAULT);

		return pipeline?.build(metadata, request) ?? [];
	}
}
