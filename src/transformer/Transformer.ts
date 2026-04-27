import { ServiceType } from '../enums';
import { METHOD_MAPPER } from '../helpers/types';
import { OkPornAlbumOutput } from '../services/okporn/output/okporn-album.output';
import { OkPornVideoOutput } from '../services/okporn/output/okporn-video.output';
import { ExecutionResult, ExtractorResult } from '../types';

type ServiceMethods = typeof METHOD_MAPPER;

type TransformerFn<T = any> = (result: ExecutionResult<T>) => ExecutionResult<T>;

type TransformerMap = {
	[S in keyof ServiceMethods]?: {
		[M in keyof ServiceMethods[S]]?: {
			transform: TransformerFn;
		};
	};
};

export const TRANSFORMER: TransformerMap = {
	[ServiceType.OKPORN]: {
		[METHOD_MAPPER[ServiceType.OKPORN].getAlbums]: {
			transform: (result: ExecutionResult<OkPornAlbumOutput>) => ({
				...result,
				extracted: result.extracted.map((metadata) => ({
					...metadata,
					extra: {
						albumTitle: metadata.title,
						albumUrl: metadata.baseUrl,
						albumKeywords: metadata.keywords,
						albumDescription: metadata.description,
						modelName: metadata.customFields?.modelName,
						albumId: metadata.baseUrl.split('/').filter(Boolean).pop(),
						albumImages: metadata.images,
						albumThumbnail: metadata.images[0],
						albumImageCount: metadata.images.length
					}
				})) as ExtractorResult<OkPornAlbumOutput>[]
			})
		},

		[METHOD_MAPPER[ServiceType.OKPORN].getAlbum]: {
			transform: (result: ExecutionResult<OkPornAlbumOutput>) => ({
				...result,
				extracted: result.extracted.map((metadata) => ({
					...metadata,
					extra: {
						albumTitle: metadata.title,
						albumUrl: metadata.baseUrl,
						albumKeywords: metadata.keywords,
						albumDescription: metadata.description,
						modelName: metadata.customFields?.modelName,
						albumId: metadata.baseUrl.split('/').filter(Boolean).pop(),
						albumImages: metadata.images,
						albumThumbnail: metadata.images[0],
						albumImageCount: metadata.images.length
					}
				})) as ExtractorResult<OkPornAlbumOutput>[]
			})
		},
		[METHOD_MAPPER[ServiceType.OKPORN].getVideos]: {
			transform: (result: ExecutionResult<OkPornVideoOutput>) => ({
				...result,
				extracted: result.extracted.map((metadata) => ({
					...metadata,
					extra: {
						videoTitle: metadata.title,
						videoUrl: metadata.baseUrl,
						videoKeywords: metadata.keywords,
						videoDescription: metadata.description,
						videoId: metadata.baseUrl.split('/').filter(Boolean).pop(),
						videoSources: metadata.sources,
						videoPoster: metadata.customFields?.videoPoster,
						modelName: metadata.customFields?.starredBy?.[0],
						videoAlbumId: metadata.customFields?.videoAlbumId,
						videoCreateDate: metadata.customFields?.videoCreateDate
					}
				})) as ExtractorResult<OkPornVideoOutput>[]
			})
		},
		[METHOD_MAPPER[ServiceType.OKPORN].getVideo]: {
			transform: (result: ExecutionResult<OkPornVideoOutput>) => ({
				...result,
				extracted: result.extracted.map((metadata) => ({
					...metadata,
					extra: {
						videoTitle: metadata.title,
						videoUrl: metadata.baseUrl,
						videoKeywords: metadata.keywords,
						videoDescription: metadata.description,
						videoId: metadata.baseUrl.split('/').filter(Boolean).pop(),
						videoSources: metadata.sources,
						videoPoster: metadata.customFields?.videoPoster,
						modelName: metadata.customFields?.starredBy?.[0],
						videoAlbumId: metadata.customFields?.videoAlbumId,
						videoCreateDate: metadata.customFields?.videoCreateDate
					}
				})) as ExtractorResult<OkPornVideoOutput>[]
			})
		}
	},

	[ServiceType.DEFAULT]: {
		[METHOD_MAPPER[ServiceType.DEFAULT].getLinks]: {
			transform: (result) => result // no-op
		}
	}
};
