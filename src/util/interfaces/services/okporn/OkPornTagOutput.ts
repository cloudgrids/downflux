export interface OkPornTagOutput {
	/** The URLs of the tags in the page */
	tags: TagsOutput;
}

/** A mapping of tag categories to their respective tag names */
export type TagsOutput = Record<string, string[]>;
