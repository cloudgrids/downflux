import { ServiceType } from '../enums';

export type OkPornMethods = 'getAlbums' | 'getAlbum' | 'getModels' | 'getTags' | 'getChannels' | 'getVideos' | 'getVideo';
export type CoomerMethods = 'getPosts' | 'getPost' | 'getTags' | 'getModels';
export type DefaultMethods = 'getRawHtml' | 'getLinks';

export type SERVICE_METHODS = {
	[ServiceType.OKPORN]: OkPornMethods;
	[ServiceType.COOMER]: CoomerMethods;
	[ServiceType.DEFAULT]: DefaultMethods;
};

export const METHOD_MAPPER: {
	[S in ServiceType.DEFAULT | ServiceType.COOMER | ServiceType.OKPORN]: Record<SERVICE_METHODS[S], SERVICE_METHODS[S]>;
} = {
	[ServiceType.OKPORN]: {
		getAlbums: 'getAlbums',
		getAlbum: 'getAlbum',
		getModels: 'getModels',
		getTags: 'getTags',
		getChannels: 'getChannels',
		getVideos: 'getVideos',
		getVideo: 'getVideo'
	},
	[ServiceType.COOMER]: {
		getPosts: 'getPosts',
		getPost: 'getPost',
		getTags: 'getTags',
		getModels: 'getModels'
	},
	[ServiceType.DEFAULT]: {
		getRawHtml: 'getRawHtml',
		getLinks: 'getLinks'
	}
};
