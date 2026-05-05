import { DownloadOptions, JobOptions, JobProgressEvent } from '../util';
import { progressMapper } from './BytesMapper';

function writeLine(line: string) {
	process.stdout.clearLine(0);
	process.stdout.cursorTo(0);
	process.stdout.write(line);
}

let lastRenderHeight = 0;
const renderBlock = (lines: string[]) => {
	if (lastRenderHeight > 0) process.stdout.moveCursor(0, -lastRenderHeight);

	lines.forEach((line, i) => {
		writeLine(line);
		if (i < lines.length - 1) process.stdout.write('\n');
	});

	lastRenderHeight = lines.length;
};

export function emitSegmentProgress(options: DownloadOptions, event: JobProgressEvent): void {
	options.onSegmentProgress?.(event);
	if (!options?.logProgress) return;

	const progress = event.downloadedBytes !== undefined ? progressMapper('item', event.downloadedBytes, event.totalBytes) : '';

	const line = [
		`[${event.status}]`,
		event.segment && event.totalSegments ? `SEG ${event.segment}/${event.totalSegments}` : null,
		progress,
		event.message ?? null,
		event.error ? `ERR: ${event.error}` : null
	]
		.filter(Boolean)
		.join(' | ');

	writeLine(line);
}

export const emitProgress = (options: JobOptions, event: JobProgressEvent): void => {
	options.onProgress?.(event);
	if (!options?.logProgress) return;

	const progress =
		event.downloadedBytes !== undefined
			? progressMapper('item', event.downloadedBytes, event.totalBytes)
			: event.progress !== undefined
				? `${event.progress.toFixed(2)}%`
				: '';

	const lines = [
		`[JOB: ${event.status}]`,
		`Progress: ${progress}`,
		`Downloaded: ${event.downloaded ?? 0}`,
		`Failed: ${event.failed ?? 0}`,
		`Total: ${event.totalItems ?? 0}`,
		event.message ?? '',
		event.error ? `Error: ${event.error}` : ''
	].filter(Boolean);

	renderBlock(lines);
};
