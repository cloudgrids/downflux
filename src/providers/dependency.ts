import { HlsClient, HtmlClient, StreamHttpClient } from '@app/clients';
import { CoordinatorDependencies } from '@app/contracts';
import { PipelineRegistry } from '@app/pipelines';
import { ProgressManager } from '@app/progress';
import { CliRenderer } from '@app/renderer';
import { FFmpegEngine, FileManager } from '@app/storage';
import { StrategyRegistry } from '@app/strategies';
import { TransferCoordinator } from '@app/transfer';
import { TransformerRegistry } from '@app/transformers';
import { ExecutionCoordinator, TaskCoordinator } from 'src/coordinators';

/**
 * Creates the default service dependency graph.
 * @returns Default service dependencies
 */
export function createDefaultDependencies(): CoordinatorDependencies {
	const progressManager = new ProgressManager();

	const cliRenderer = new CliRenderer(progressManager);

	const ffmpegEngine = new FFmpegEngine(progressManager);
	const fileManager = new FileManager(ffmpegEngine, progressManager);

	const strategyRegistry = new StrategyRegistry(progressManager);

	const htmlClient = new HtmlClient(progressManager);
	const hlsClient = new HlsClient(progressManager);
	const streamHttpClient = new StreamHttpClient(hlsClient, strategyRegistry, progressManager);

	const pipelineRegistry = new PipelineRegistry(fileManager);

	const transformerRegistry = new TransformerRegistry(htmlClient, progressManager);

	const transferCoordinator = new TransferCoordinator(fileManager, streamHttpClient, progressManager);

	const taskCoordinator = new TaskCoordinator(transferCoordinator, fileManager, transformerRegistry, progressManager, pipelineRegistry);
	const executionCoordinator = new ExecutionCoordinator(transformerRegistry, taskCoordinator, progressManager, pipelineRegistry);

	return {
		htmlClient,
		streamHttpClient,
		transformerRegistry,
		transferCoordinator,
		strategyRegistry,
		executionCoordinator,
		progressManager,
		cliRenderer
	};
}
