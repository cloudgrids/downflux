const formatBytes = (bytes: number): string => {
	if (!bytes) return '0 Bytes';
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
	const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);

	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const bytesMapper = (downloadedBytes: number, totalBytes?: number) => {
	const downloaded = formatBytes(downloadedBytes);
	const total = totalBytes ? formatBytes(totalBytes) : 'Unknown';
	return `${downloaded} / ${total}`;
};

export const progressTracker = (downloaded: number, total?: number): string => {
	const width = 30;

	let percentage = total ? (downloaded / total) * 100 : 0;

	percentage = Math.min(Math.max(percentage, 0), 100);

	const filled = Math.round((percentage / 100) * width);

	return `[${'#'.repeat(filled)}${'-'.repeat(width - filled)}] (${percentage.toFixed(2)}%)`;
};

export const progressMapper = (type: 'items' | 'item', downloaded: number, total?: number): string => {
	const progress = progressTracker(downloaded, total);

	return type === 'item' ? `${bytesMapper(downloaded, total)} ${progress}` : progress;
};

console.log(progressMapper('item', 1024 * 1024 * 1024, 1024 * 1024 * 117));
