/**
 * Directory output options.
 * Controls where downloaded files are written.
 */
export interface DirectoryOutputOptions {
	/**
	 * Directory path for written files
	 * @defaultValue process.cwd()
	 */
	directoryPath?: string;

	/** Filename prefix */
	prefix?: string;
}
