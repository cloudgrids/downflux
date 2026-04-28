export class PathBuilderService {
	public buildOutputPath(basePath: string, identifier: string | undefined, filename: string): string {
		if (identifier) return `${basePath}/${identifier}/${filename}`;

		return `${basePath}/${filename}`;
	}

	public buildDirectoryPath(basePath: string, identifier: string | undefined): string {
		if (identifier) return `${basePath}/${identifier}`;

		return basePath;
	}
}
