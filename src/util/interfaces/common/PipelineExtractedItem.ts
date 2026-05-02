import { MediaType } from '../../enums';

export interface PipelineExtractedItem {
	mediaType: MediaType;
	url: string;
	id?: string;
	username?: string;
	secondaryId?: string;
}
