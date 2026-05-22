import { ProviderMetadata } from '@base';
import { ExecutionCoordinator, TransferCoordinator } from '@core/coordinators';
import { ProgressManager } from '@core/progress';
import { StrategyRegistry, TransformerRegistry } from '@core/registries';
import { CliManager } from '@core/ui';
import { HttpClient, StreamHttpClient } from '@engine/http';
import { Provider } from '@types';

export interface CoordinatorDependencies {
	httpClient: HttpClient;
	streamHttpClient: StreamHttpClient;
	transformerRegistry: TransformerRegistry;
	transferCoordinator: TransferCoordinator;
	executionCoordinator: ExecutionCoordinator;
	strategyRegistry: StrategyRegistry;
	progressManager: ProgressManager;
	cliManager: CliManager;
}

export interface RegistryCoordinator {
	name: string;
	parser?: boolean;
	pipeline?: boolean;
	transformer?: boolean;
	strategy?: boolean;
	method?: boolean;
}

export interface ProviderConfig {
	provider: Provider;
	urlPattern: RegExp;
	metadata: ProviderMetadata;
}
