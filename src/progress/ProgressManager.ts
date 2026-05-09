import { ExecutionOptions, JobProgressEvent, JobProgressStatus } from '@app/contracts';
import EventEmitter from 'events';

interface ProgressEvents {
	progress: (state: Partial<JobProgressEvent>) => void;
}

/** For managing progress updates during ExecutionCoordinator execution
 * Emits 'progress' events with the current state of the ExecutionCoordinator, which can be used for rendering progress in the UI or CLI.
 * The `update` method is used to update the current state of the ExecutionCoordinator and emit progress events at a controlled interval to avoid excessive updates.
 * @requires must call `init` with ExecutionOptions before use to set up callbacks and options
 */
export class ProgressManager extends EventEmitter {
	private lastRender = 0;
	private readonly RENDER_INTERVAL = 500;
	private options?: ExecutionOptions;

	private state: Partial<JobProgressEvent> = {
		startTime: Date.now(),
		lastUpdateTime: Date.now(),
		downloadedBytes: 0,
		downloadProgress: 0,
		eta: 0,
		failed: 0,
		prevBytes: 0,
		resolvedItems: 0,
		resolvedSegments: 0,
		resolvedTargets: 0,
		speed: 0,
		totalBytes: 0,
		totalItems: 0,
		totalSegments: 0,
		totalTargets: 0
	};

	public override on<E extends keyof ProgressEvents>(eventName: E, listener: ProgressEvents[E]): this {
		return super.on(eventName, listener);
	}

	public override emit<E extends keyof ProgressEvents>(eventName: E, ...args: Parameters<ProgressEvents[E]>): boolean {
		return super.emit(eventName, ...args);
	}

	public override off<E extends keyof ProgressEvents>(eventName: E, listener: ProgressEvents[E]): this {
		return super.off(eventName, listener);
	}

	public override once<E extends keyof ProgressEvents>(eventName: E, listener: ProgressEvents[E]): this {
		return super.once(eventName, listener);
	}

	public init(options: ExecutionOptions) {
		this.options = options;
	}

	private shouldRender(state: JobProgressStatus, now: number): boolean {
		return now - this.lastRender > this.RENDER_INTERVAL || state === 'COMPLETED' || state === 'ABORTED' || state === 'FAILED';
	}

	public update(params: Partial<JobProgressEvent>): void {
		const now = Date.now();

		this.state = {
			...this.state,
			...params,
			lastUpdateTime: now
		};

		this.options?.onProgress?.(this.state as JobProgressEvent);

		if (!this.options?.logProgress) return;

		if (this.state?.status && this.shouldRender(this.state.status, now)) {
			this.emit('progress', Object.freeze({ ...this.state }));
			this.lastRender = now;
		}
	}
}
