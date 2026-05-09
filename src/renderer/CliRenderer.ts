import { JobProgressEvent } from '@app/contracts';
import { LogManager } from '@app/logger';
import { ProgressFormatter, ProgressManager } from '@app/progress';

export class CliRenderer {
	private readonly logger = new LogManager();
	constructor(private readonly progressManager: ProgressManager) {
		progressManager.on('progress', this.listener);
	}

	private readonly listener = (state: Partial<JobProgressEvent>) => {
		this.render(state);
	};

	public destroy() {
		this.progressManager.off('progress', this.listener);
	}

	private render(state: Partial<JobProgressEvent>) {
		const s = state;

		const formattedProgress = {
			STATUS: s.status ?? 'UNKNOWN',
			CURRENT_TARGET: s.currentTarget,
			CURRENT_ITEM: s.currentItem,
			CURRENT_SEGMENT: s.currentSegment,
			REDIRECTED_URL: s.redirectedUrl,
			HLS_PLAYLIST_URL: s.hlsPlaylistUrl,
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
