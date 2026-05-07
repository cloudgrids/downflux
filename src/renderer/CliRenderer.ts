import { LoggerService } from '../logger';
import { ProgressFormatter, ProgressService } from '../progress';
import { JobProgressEvent } from '../util';

export class CliRenderer {
	private readonly logger = new LoggerService();
	constructor(private readonly progressService: ProgressService) {
		progressService.on('progress', this.listener);
	}

	private readonly listener = (state: Partial<JobProgressEvent>) => {
		this.render(state);
	};

	public destroy() {
		this.progressService.off('progress', this.listener);
	}

	private render(state: Partial<JobProgressEvent>) {
		const s = state;

		const formattedProgress = {
			STATUS: s.status ?? 'UNKNOWN',
			CURRENT_TARGET: s.currentTarget,
			CURRENT_ITEM: s.currentItem,
			CURRENT_SEGMENT: s.currentSegment,
			REDIRECTED_URL: s.redirectedUrl,
			HLS_URL: s.hlsSegmentUrl,
			TARGETS: ProgressFormatter.createTrack('items', s.resolvedTargets, s.totalTargets),
			PROGRESS: ProgressFormatter.createTrack('item', s.downloadedBytes, s.totalBytes),
			ITEMS: ProgressFormatter.createTrack('items', s.resolvedItems, s.totalItems),
			SEGMENTS: ProgressFormatter.createTrack('items', s.resolvedSegments, s.totalSegments),
			FAILED: s.failed,
			ERROR: s.error?.cause,
			MESSAGE: s.message
		};

		const logs = Object.entries(formattedProgress).map(([k, v]) => `${k.replace(/_/g, ' ')}: ${v ?? ''}`);

		this.logger.renderBlock(logs);
	}
}
