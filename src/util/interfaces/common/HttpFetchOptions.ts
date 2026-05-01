/**
 * HTTP fetch options.
 * Controls request headers, retries, timeout, and referer.
 */
export interface HttpFetchOptions {
	/** Custom request headers */
	headers?: Record<string, string>;

	/** Request timeout in milliseconds */
	timeoutMs?: number;

	/** Failed request retry count */
	retries?: number;

	/** Request referer URL */
	referer?: string;
}
