/** Job output mode */
export enum OutputType {
	/** Writes files to device storage */
	DEVICE = 'DEVICE',

	/** Returns downloaded file buffers */
	BUFFER = 'BUFFER',

	/** Writes ExecutionCoordinator metadata as JSON */
	JSON = 'JSON',

	/** Returns extracted metadata without downloading */
	RETURN = 'RETURN'
}
