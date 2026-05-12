import { CoordinatorDependencies } from '@contracts';
import { ExecutionCoordinator, TaskCoordinator, TransferCoordinator } from '@core/coordinators';
import { ProgressManager } from '@core/progress';
import { PipelineRegistry, StrategyRegistry, TransformerRegistry } from '@core/registries';
import { CliManager } from '@core/ui';
import { HlsClient, HttpClient, StreamHttpClient } from '@engine/http';
import { FFmpegEngine, FileManager } from '@storage';

/**
 * Creates the default service dependency graph.
 * @returns Default service dependencies
 */
export function createDefaultDependencies(): CoordinatorDependencies {
	const progressManager = new ProgressManager();

	const cliManager = new CliManager(progressManager);

	const ffmpegEngine = new FFmpegEngine(progressManager);
	const fileManager = new FileManager(ffmpegEngine, progressManager);

	const strategyRegistry = new StrategyRegistry(progressManager);

	const httpClient = new HttpClient(progressManager);
	const hlsClient = new HlsClient(progressManager);
	const streamHttpClient = new StreamHttpClient(hlsClient, strategyRegistry, progressManager);

	const pipelineRegistry = new PipelineRegistry(fileManager);

	const transformerRegistry = new TransformerRegistry(httpClient, progressManager);

	const transferCoordinator = new TransferCoordinator(fileManager, streamHttpClient, progressManager);

	const taskCoordinator = new TaskCoordinator(transferCoordinator, fileManager, transformerRegistry, progressManager, pipelineRegistry);
	const executionCoordinator = new ExecutionCoordinator(transformerRegistry, taskCoordinator, progressManager, pipelineRegistry);

	return {
		httpClient,
		streamHttpClient,
		transformerRegistry,
		transferCoordinator,
		strategyRegistry,
		executionCoordinator,
		progressManager,
		cliManager
	};
}
