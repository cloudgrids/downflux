export const bytesMapper = (downloadedBytes: number, totalBytes?: number) => {
	const downloaded = formatBytes(downloadedBytes);
	const total = totalBytes ? formatBytes(totalBytes) : 'Unknown';
	return `${downloaded} / ${total}`;
};

const formatBytes = (bytes: number): string => {
	if (!bytes) return 'O Bytes';
	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PT'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const progressMapper = (downloadedBytes: number, totalBytes?: number): string => {
	const percentage = totalBytes ? ((downloadedBytes / totalBytes) * 100).toFixed(2) : 'Unknown';
	return `${bytesMapper(downloadedBytes, totalBytes)} (${percentage}%)`;
};

console.log(bytesMapper(123456789));
console.log(bytesMapper(123456789, 987654321));
