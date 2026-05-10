import { ProgressManager } from '@app/progress';
import { ProviderType } from '@app/shared';
import { DefaultStrategy } from './DefaultStrategy';
import { Porn300Strategy } from './Porn300Strategy';
import { PornHubStrategy } from './PornHubStrategy';
import { PornOneStrategy } from './PornOneStrategy';
import { XHamsterStrategy } from './XHamsterStrategy';
import { XVideosStrategy } from './XVideosStrategy';
import { XnXXStrategy } from './XnXXStrategy';

type StrategyCtor = new (progress: ProgressManager) => DefaultStrategy;

export class StrategyRegistry {
	constructor(private readonly progressManager: ProgressManager) {}

	private readonly strategies: Record<ProviderType, StrategyCtor> = {
		[ProviderType.Coomer]: DefaultStrategy,
		[ProviderType.Default]: DefaultStrategy,
		[ProviderType.HqPorn]: DefaultStrategy,
		[ProviderType.OkPorn]: DefaultStrategy,
		[ProviderType.Porn300]: Porn300Strategy,
		[ProviderType.PornHub]: PornHubStrategy,
		[ProviderType.PornOne]: PornOneStrategy,
		[ProviderType.PornsOk]: DefaultStrategy,
		[ProviderType.TnAFlix]: DefaultStrategy,
		[ProviderType.WallHaven]: DefaultStrategy,
		[ProviderType.XHamster]: XHamsterStrategy,
		[ProviderType.XVideos]: XVideosStrategy,
		[ProviderType.XnXX]: XnXXStrategy
	};

	public getStrategy(provider: ProviderType): DefaultStrategy {
		const StrategyClass = this.strategies[provider] ?? this.strategies[ProviderType.Default];
		return new StrategyClass(this.progressManager);
	}
}
