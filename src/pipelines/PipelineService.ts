import { ServiceType } from '../enums';
import { PipelineItem } from '../types';
import { BasePipeline } from './BasePipeline';
import { OkPornPipeline } from './OkPornPipeline';

export class PipelineService {
	private readonly pipelines: Map<ServiceType, BasePipeline>;

	constructor() {
		this.pipelines = new Map([
			[ServiceType.OKPORN, new OkPornPipeline()],
			[ServiceType.DEFAULT, new BasePipeline()]
		]);
	}

	public build(metadata: any, service: ServiceType): PipelineItem[] {
		const serviceType = service || ServiceType.DEFAULT;
		const pipeline = this.pipelines.get(serviceType) || this.pipelines.get(ServiceType.DEFAULT);

		return pipeline?.build(metadata, serviceType) ?? [];
	}
}
