/** Default service methods */
export enum DefaultMethods {
	/** Raw metadata extraction */
	getRawHtml = 'getRawHtml',

	/** Link extraction */
	getLinks = 'getLinks'
}

export type SniSpoofStatus = 'working' | 'failed' | 'untested';
