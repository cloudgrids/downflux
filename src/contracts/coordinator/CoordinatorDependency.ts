import { HtmlClient, StreamHttpClient } from '@app/clients';
import { ProgressManager } from '@app/progress';
import { CliRenderer } from '@app/renderer';
import { StrategyRegistry } from '@app/strategies';
import { TransferCoordinator } from '@app/transfer';
import { TransformerRegistry } from '@app/transformers';
import { ExecutionCoordinator } from 'src/coordinators';

export interface CoordinatorDependencies {
	htmlClient: HtmlClient;
	streamHttpClient: StreamHttpClient;
	transformerRegistry: TransformerRegistry;
	transferCoordinator: TransferCoordinator;
	executionCoordinator: ExecutionCoordinator;
	strategyRegistry: StrategyRegistry;
	progressManager: ProgressManager;
	cliRenderer: CliRenderer;
}
