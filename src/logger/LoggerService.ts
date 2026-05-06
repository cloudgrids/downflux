export class LoggerService {
	private readonly HEADER = 'DOWNFLUX';
	private lastRenderHeight = 0;
	private readonly isTTY = process.stdout.isTTY;

	constructor() {
		this.createHeader(this.HEADER);
	}

	public writeLine(line: string) {
		if (!this.isTTY) {
			console.log(line);
			return;
		}

		// process.stdout.clearLine(0);
		// process.stdout.cursorTo(0);
		process.stdout.write(line.padEnd(process.stdout.columns || 80));
	}

	public createHeader(title: string): string {
		const width = 50;
		const border = '='.repeat(width);
		const paddedTitle = ` ${title.toUpperCase()} `;
		const centered = paddedTitle.padStart((width + paddedTitle.length) / 2).padEnd(width);

		return `${border}\n${centered}\n${border}`;
	}

	public renderBlock(lines: string[]) {
		if (!this.isTTY) {
			console.log(lines.join('\n'));
			return;
		}

		// if (this.lastRenderHeight > 0) {
		// 	process.stdout.moveCursor(0, -this.lastRenderHeight);
		// }

		lines.forEach((line, i) => {
			this.writeLine(line);
			if (i < lines.length - 1) process.stdout.write('\n');
		});

		this.lastRenderHeight = lines.length;
	}
}
