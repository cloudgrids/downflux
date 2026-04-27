import { ServiceType } from '../enums';
import type { PipelineIdentifiers, PipelineResourceType } from './PipelineItem';

export interface DownloadResult<TExtendedMetadata = unknown> {
	service?: ServiceType;
	url: string;
	resourceType?: PipelineResourceType;
	identifiers?: PipelineIdentifiers;
	/** Absolute path on disk (only when target = LOCAL) */
	localPath?: string;
	/** Raw bytes (only when target = BUFFER) */
	buffer?: Buffer;
	extendedFilename: string;
	originalFilename: string;
	extension: string;
	mimeType: string;
	sizeBytes: number;
	metadata?: TExtendedMetadata;
	extra?: TExtendedMetadata;
}

export type ServiceDownloadResult<TService extends ServiceType, TExtendedMetadata = unknown> = DownloadResult<TExtendedMetadata> & {
	service: TService;
};
