import { join, normalize } from 'path';

/**
 * Small helper for provider output paths and identifiers.
 *
 * @remarks
 * Path building is centralized so providers can describe logical media groups
 * without duplicating path separators, normalization, or filename conventions.
 */
export class PathBuilder {
	public buildOutputPath(basePath: string, filename: string, identifier?: string): string {
		const safeBase = normalize(basePath);

		if (identifier) return join(safeBase, identifier, filename);

		return join(safeBase, filename);
	}

	public buildDirectoryPath(filename: string, identifier?: string): string {
		if (identifier) return join(identifier, filename);

		return filename;
	}

	public join(...segments: string[]): string {
		return segments.join('/');
	}

	public spaceNormalizer(input: string = 'unknown'): string {
		return input?.replace(/[^a-zA-Z0-9]/g, '_')?.trim();
	}
}
