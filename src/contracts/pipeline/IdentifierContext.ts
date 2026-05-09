import { MediaType } from '@app/shared';

export interface IdentifierContext<TMetadata> {
	mediaType: MediaType;
	metadata: TMetadata;
	url: string;
	id?: string;
	secondaryId?: string;
	username?: string;
}
