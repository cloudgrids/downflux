export class LogManager {
	private readonly HEADER = 'DOWNFLUX';

	private entered = false;
	private isRendering = false;
	private previousRawMode = false;
	private changedRawMode = false;

	private readonly onInput = (chunk: Buffer): void => {
		if (chunk.includes(3)) {
			this.destroy();
			process.exit(130);
		}
	};

	private readonly onExit = (): void => {
		this.destroy();
	};

	private readonly onSignal = (): void => {
		this.destroy();
		process.exit(130);
	};

	private get isTTY(): boolean {
		return Boolean(process.stdout.isTTY);
	}

	private get terminalWidth(): number {
		return process.stdout.columns || 80;
	}

	private get terminalHeight(): number {
		return process.stdout.rows || 24;
	}

	private get lineWidth(): number {
		return Math.max(1, this.terminalWidth - 1);
	}

	private split(line: string): string[] {
		return line.replace(/\r/g, '').split('\n');
	}

	private logs(lines: string[]): string[] {
		return lines.flatMap((line) => this.split(line));
	}

	private createHeader(title: string): string[] {
		const width = this.lineWidth;
		const border = '='.repeat(width);

		const centered = title
			.toUpperCase()
			.padStart(Math.floor((width + title.length) / 2))
			.padEnd(width);

		return [border, centered, border];
	}

	private truncate(line: string): string {
		const width = this.lineWidth;

		if (line.length <= width) return line;
		if (width <= 3) return '.'.repeat(width);

		return `${line.slice(0, width - 3)}...`;
	}

	private normalize(lines: string[]): string[] {
		return lines
			.flatMap((line) => this.split(line))
			.map((line) => this.truncate(line))
			.slice(0, this.terminalHeight - 1);
	}

	private enter(): void {
		if (this.entered) return;

		process.stdout.write('\x1B[?1049h\x1B[?25l');

		if (process.stdin.isTTY && typeof process.stdin.setRawMode === 'function') {
			this.previousRawMode = process.stdin.isRaw;
			process.stdin.setRawMode(true);
			process.stdin.resume();
			process.stdin.on('data', this.onInput);
			this.changedRawMode = true;
		}

		process.once('exit', this.onExit);
		process.once('SIGINT', this.onSignal);
		process.once('SIGTERM', this.onSignal);

		this.entered = true;
	}

	private clear(): void {
		process.stdout.write('\x1B[H\x1B[2J');
	}

	private render(lines: string[]): void {
		if (this.isRendering) return;

		this.isRendering = true;

		try {
			this.enter();
			this.clear();
			process.stdout.write(this.normalize(lines).join('\n'));
			process.stdout.write('\n');
		} finally {
			this.isRendering = false;
		}
	}

	public renderBlock(lines: string[]): void {
		if (!this.isTTY) return;

		// console.log(this.createHeader(this.HEADER).join('\n'));

		const output = ['', ...this.logs(lines)];

		console.log(output.join('\n'));

		// this.render(output);
	}

	public destroy(): void {
		if (!this.entered) return;

		process.removeListener('exit', this.onExit);
		process.removeListener('SIGINT', this.onSignal);
		process.removeListener('SIGTERM', this.onSignal);

		if (this.changedRawMode) {
			process.stdin.off('data', this.onInput);
			process.stdin.setRawMode(this.previousRawMode);
			process.stdin.pause();
			this.changedRawMode = false;
		}

		process.stdout.write('\x1B[?25h\x1B[?1049l');
		this.entered = false;
	}
}
