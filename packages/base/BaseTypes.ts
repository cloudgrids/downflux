/** Default service methods */
export enum DefaultMethods {
	/** Link extraction */
	getLinks = 'getLinks',

	/** Image extraction */
	getImages = 'getImages',

	/** Video extraction */
	getVideos = 'getVideos',

	/** Audio extraction */
	getAudio = 'getAudios'
}

export type SniSpoofStatus = 'working' | 'failed' | 'untested';

export type ProviderType =
	| 'adult'
	| 'general'
	| 'socialmedia'
	| 'gallery'
	| 'anime'
	| 'manga'
	| 'tv'
	| 'movie'
	| 'music'
	| 'documentary'
	| 'educational'
	| 'gaming'
	| 'sports'
	| 'news'
	| 'technology'
	| 'comedy'
	| 'art'
	| 'fashion'
	| 'lifestyle'
	| 'travel'
	| 'food'
	| 'health'
	| 'fitness'
	| 'business'
	| 'finance'
	| 'politics'
	| 'history'
	| 'science'
	| 'nature'
	| 'implement';

export type AdultProviders =
	| 'analrz'
	| 'beeg'
	| 'blackporn'
	| 'bokepporn'
	| 'colliderporn'
	| 'cumlouder'
	| 'dafreeporn'
	| 'danude'
	| 'default'
	| 'epicgfs'
	| 'eporner'
	| 'hqporn'
	| 'index.ts'
	| 'interracial'
	| 'itsporn'
	| 'lesbian8'
	| 'megatube'
	| 'momvids'
	| 'mylust'
	| 'okporn'
	| 'perfectgirls'
	| 'porn300'
	| 'porndoe'
	| 'pornhub'
	| 'pornid'
	| 'pornone'
	| 'pornseven'
	| 'pornsok'
	| 'pussyspace'
	| 'sexvid'
	| 'shameless'
	| 'superporn'
	| 'sxyporn'
	| 'theyarehuge'
	| 'tnaflix'
	| 'tubevsex'
	| 'wallhaven'
	| 'xcafe'
	| 'xdegu'
	| 'xgroovy'
	| 'xhamster'
	| 'xnxx'
	| 'xozilla'
	| 'xvideos'
	| 'zbporn'
	| 'zzztube';
