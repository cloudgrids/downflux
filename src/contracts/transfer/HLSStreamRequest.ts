import { Writable } from 'stream';

export interface HLSStreamRequest {
	finalUrl: string;
	headers: Record<string, string>;
	isFmp4?: boolean;
	start: (stream: Writable, noDownload?: boolean) => Promise<void>;
}
