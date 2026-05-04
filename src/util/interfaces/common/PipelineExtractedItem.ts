import { MediaType } from '../../enums';
import { AllowedExtension } from '../../types';

export interface PipelineExtractedItem {
	mediaType: MediaType;
	url: string;
	mimeType?: string;
	extension?: AllowedExtension;
	id?: string;
	username?: string;
	secondaryId?: string;
}
