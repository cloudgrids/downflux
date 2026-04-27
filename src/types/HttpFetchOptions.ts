export interface HttpFetchOptions {
	headers?: Record<string, string>;
	timeoutMs?: number;
	retries?: number;
	backoffMs?: number;
}
