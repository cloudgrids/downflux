import { ProgressManager } from '@app/progress';
import { ProviderType } from '@app/shared';
import { DefaultStrategy } from './DefaultStrategy';
import { PornHubStrategy } from './PornHubStrategy';
import { XHamsterStrategy } from './XHamsterStrategy';

type StrategyCtor = new (progress: ProgressManager) => DefaultStrategy;

export class StrategyRegistry {
	constructor(private readonly progressManager: ProgressManager) {}

	private readonly strategies: Record<ProviderType, StrategyCtor> = {
		[ProviderType.OkPorn]: DefaultStrategy,
		[ProviderType.PornHub]: PornHubStrategy,
		[ProviderType.WallHaven]: DefaultStrategy,
		[ProviderType.Coomer]: DefaultStrategy,
		[ProviderType.Default]: DefaultStrategy,
		[ProviderType.XHamster]: XHamsterStrategy,
		[ProviderType.TnAFlix]: DefaultStrategy
	};

	public getStrategy(service: ProviderType): DefaultStrategy {
		const StrategyClass = this.strategies[service] ?? this.strategies[ProviderType.Default];
		return new StrategyClass(this.progressManager);
	}
}
