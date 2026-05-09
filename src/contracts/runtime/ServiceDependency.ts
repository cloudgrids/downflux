import { HtmlClient, StreamHttpClient } from '@app/clients';
import { ProgressManager } from '@app/progress';
import { CliRenderer } from '@app/renderer';
import { StrategyRegistry } from '@app/strategies';
import { TransferCoordinator } from '@app/transfer';
import { TransformerRegistry } from '@app/transformers';
import { ExecutionCoordinator } from 'src/coordinators';

export interface ServiceDependencies {
	htmlClient: HtmlClient;
	streamHttpClient: StreamHttpClient;
	transformerRegistry: TransformerRegistry;
	transferCoordinator: TransferCoordinator;
	jobService: ExecutionCoordinator;
	strategyRegistry: StrategyRegistry;
	progressManager: ProgressManager;
	cliRenderer: CliRenderer;
}
