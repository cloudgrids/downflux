export interface HttpFetchOptions {
	/** Custom headers to be sent with the HTTP request */
	headers?: Record<string, string>;
	/** The maximum time in milliseconds to wait for a response before timing out, defaults to none */
	timeoutMs?: number;
	/** The number of times to retry the request in case of failure, defaults to 3 times */
	retries?: number;
	/** The referer URL to be sent with the HTTP request, usually managed by this library */
	referer?: string;
}
