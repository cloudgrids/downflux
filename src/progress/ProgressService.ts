import EventEmitter from 'events';
import { JobOptions, JobProgressEvent, JobProgressStatus } from '../util';

interface ProgressEvents {
	progress: (state: Partial<JobProgressEvent>) => void;
}

export class ProgressService extends EventEmitter {
	private lastRender = 0;
	private readonly RENDER_INTERVAL = 500;
	private options?: JobOptions;

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

	public init(options: JobOptions) {
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
