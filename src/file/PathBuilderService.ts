import { join, normalize } from 'path';

export class PathBuilderService {
	public buildOutputPath(basePath: string, filename: string, identifier?: string): string {
		const safeBase = normalize(basePath);

		if (identifier) return join(safeBase, identifier, filename);

		return join(safeBase, filename);
	}

	public buildDirectoryPath(filename: string, identifier?: string): string {
		if (identifier) return join(identifier, filename);

		return filename;
	}
}
