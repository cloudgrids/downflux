export class ProgressFormatter {
	private static formatBytes(bytes: number): string {
		if (!bytes) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
		const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);

		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	}

	private static bytesMapper(downloadedBytes: number, totalBytes?: number): string {
		const downloaded = this.formatBytes(downloadedBytes);
		const total = totalBytes ? this.formatBytes(totalBytes) : '0 Bytes';
		return `${downloaded} / ${total}`;
	}

	private static progressTrack(downloaded: number, total?: number): string {
		const width = 30;

		let percentage = total && total > 0 ? (downloaded / total) * 100 : 0;

		percentage = Math.min(Math.max(percentage, 0), 100);

		const filled = Math.round((percentage / 100) * width);

		return `[${'#'.repeat(filled)}${'-'.repeat(width - filled)}] (${percentage.toFixed(2)}%)`;
	}

	public static createTrack(type: 'items' | 'item', downloaded: number = 0, total: number = 0): string {
		const progress = this.progressTrack(downloaded, total);

		return type === 'item' ? `${this.bytesMapper(downloaded, total)} ${progress}` : `(${downloaded}/${total ?? 0}) ${progress}`;
	}
}
