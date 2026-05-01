export enum ExecutionType {
	/** Executes tasks one after another, waiting for each to complete before starting the next. */
	SEQUENTIAL = 'SEQUENTIAL',
	/** Executes tasks concurrently, without waiting for each to complete before starting the next. */
	PARALLEL = 'PARALLEL'
}
