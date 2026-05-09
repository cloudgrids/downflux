/**
 * @interface
 * Interface representing the output structure for OkPorn channel operations.
 * Contains channel links and count metadata.
 */
export interface OkPornChannelOutput {
	/** Channel URLs or path values */
	channelUrls: string[];

	/** Number of channels found */
	channelCount?: number;
}
