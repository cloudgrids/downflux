import { FileService } from '../file';
import { ProgressService } from '../progress/ProgressService';
import { ServiceType } from '../util';
import { BaseStrategy } from './BaseStrategy';
import { PornHubStrategy } from './PornHubStrategy';

type StrategyCtor = new (progress: ProgressService, fileService: FileService) => BaseStrategy;

export class StrategyService {
	constructor(
		private readonly progressService: ProgressService,
		protected fileService: FileService
	) {}

	private readonly strategies: Record<ServiceType, StrategyCtor> = {
		[ServiceType.Coomer]: BaseStrategy,
		[ServiceType.Default]: BaseStrategy,
		[ServiceType.OkPorn]: BaseStrategy,
		[ServiceType.PornHub]: PornHubStrategy,
		[ServiceType.WallHaven]: BaseStrategy
	};

	public getStrategy(service: ServiceType): BaseStrategy {
		const StrategyClass = this.strategies[service] ?? this.strategies[ServiceType.Default];
		return new StrategyClass(this.progressService, this.fileService);
	}
}
