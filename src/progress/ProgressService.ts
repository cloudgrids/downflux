import { LoggerService } from '../logger';
import { JobOptions, JobProgressEvent, JobProgressStatus } from '../util';

export class ProgressService {
	private readonly logger = new LoggerService();
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

	public init(options: JobOptions) {
		this.options = options;
	}

	private shouldRender(state: JobProgressStatus, now: number): boolean {
		return now - this.lastRender > this.RENDER_INTERVAL || state === 'COMPLETED' || state === 'ABORTED' || state === 'FAILED';
	}

	public update(params: Partial<JobProgressEvent>) {
		const now = Date.now();

		this.state = {
			...this.state,
			...params,
			lastUpdateTime: now
		};

		if (this.shouldRender(this.state.status as JobProgressStatus, now)) {
			this.render();
			this.lastRender = now;
		}
	}

	private render() {
		const s = this.state;
		this.options?.onProgress?.(s as JobProgressEvent);

		if (!this.options?.logProgress) return;

		const formattedProgress = {
			STATUS: s.status ?? 'UNKNOWN',
			CURRENT_TARGET: s.currentTarget,
			CURRENT_ITEM: s.currentItem,
			CURRENT_SEGMENT: s.currentSegment,
			REDIRECTED_URL: s.redirectedUrl,
			HLS_URL: s.hlsSegmentUrl,
			TARGETS: this.createTrack('items', s.resolvedTargets ?? 0, s.totalTargets),
			PROGRESS: this.createTrack('item', s.downloadedBytes ?? 0, s.totalBytes),
			ITEMS: this.createTrack('items', s.resolvedItems ?? 0, s.totalItems),
			SEGMENTS: this.createTrack('items', s.resolvedSegments ?? 0, s.totalSegments),
			FAILED: s.failed,
			ERROR: s.error,
			MESSAGE: s.message
		};

		const logs = Object.entries(formattedProgress)
			.filter(([_, v]) => Boolean(v))
			.map(([k, v]) => `${k.replace(/_/g, ' ')}: ${v}`);

		this.logger.renderBlock(logs);
	}

	private formatBytes(bytes: number): string {
		if (!bytes) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
		const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);

		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	private bytesMapper(downloadedBytes: number, totalBytes?: number): string {
		const downloaded = this.formatBytes(downloadedBytes);
		const total = totalBytes ? this.formatBytes(totalBytes) : 'Unknown';
		return `${downloaded} / ${total}`;
	}

	private progressTrack(downloaded: number, total?: number): string {
		const width = 30;

		let percentage = total ? (downloaded / total) * 100 : 0;

		percentage = Math.min(Math.max(percentage, 0), 100);

		const filled = Math.round((percentage / 100) * width);

		return `[${'#'.repeat(filled)}${'-'.repeat(width - filled)}] (${percentage.toFixed(2)}%)`;
	}

	private createTrack(type: 'items' | 'item', downloaded: number, total?: number): string {
		const progress = this.progressTrack(downloaded, total);

		return type === 'item' ? `${this.bytesMapper(downloaded, total)} ${progress}` : `(${downloaded}/${total}) ${progress}`;
	}
}
