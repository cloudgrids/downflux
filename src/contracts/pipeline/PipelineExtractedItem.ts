import { MediaType } from '@app/shared';
import { AllowedExtension } from '@app/types';

export interface PipelineExtractedItem {
	mediaType: MediaType;
	url: string;
	mimeType?: string;
	extension?: AllowedExtension;
	id?: string;
	username?: string;
	secondaryId?: string;
}
