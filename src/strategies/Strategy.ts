import { ProgressService } from '../progress/ProgressService';
import { ServiceType } from '../util';
import { BaseStrategy } from './BaseStrategy';
import { PornHubStrategy } from './PornHubStrategy';
import { XHamsterStrategy } from './XHamsterStrategy';

type StrategyCtor = new (progress: ProgressService) => BaseStrategy;

export class StrategyService {
	constructor(private readonly progressService: ProgressService) {}

	private readonly strategies: Record<ServiceType, StrategyCtor> = {
		[ServiceType.OkPorn]: BaseStrategy,
		[ServiceType.PornHub]: PornHubStrategy,
		[ServiceType.WallHaven]: BaseStrategy,
		[ServiceType.Coomer]: BaseStrategy,
		[ServiceType.Default]: BaseStrategy,
		[ServiceType.XHamster]: XHamsterStrategy,
		[ServiceType.TnAFlix]: BaseStrategy
	};

	public getStrategy(service: ServiceType): BaseStrategy {
		const StrategyClass = this.strategies[service] ?? this.strategies[ServiceType.Default];
		return new StrategyClass(this.progressService);
	}
}
