import { DownloadOptions, JobOptions, JobProgressEvent } from '../util';

export function emitSegmentProgress(options: DownloadOptions, event: JobProgressEvent): void {
	options.onSegmentProgress?.(event);
	if (!options?.logProgress) return;

	const totals = [
		event.target && `TARGET = ${event.target}`,
		event.progress && `PROGRESS = ${event.progress}`,
		event.segment && `SEGMENT = ${event.segment}`,
		event.totalSegments && `TOTAL_SEGMENTS = ${event.totalSegments}`,
		event.segment && event.totalSegments && `SEGMENTED = ${event.segment}/${event.totalSegments}`
	]
		.filter(Boolean)
		.join('\n');

	console.log(`\n[Downloading:${event.status}]\n${totals ?? ''}\n`);
}

export const emitProgress = (options: JobOptions, event: JobProgressEvent): void => {
	options.onProgress?.(event);
	if (!options?.logProgress) return;

	const totals = [
		event.downloaded && `DOWNLOADED = ${event.downloaded}`,
		event.failed && `FAILED = ${event.failed}`,
		event.totalItems && `TOTAL = ${event.totalItems}`
	]
		.filter(Boolean)
		.join('\n');

	console.log(`\n[JOB:${event.status}]\n${totals ? ` ${totals}` : ''}\n`);
};
