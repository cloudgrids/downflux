import { Writable } from 'stream';

export interface HLSStreamRequest {
	finalUrl: string;
	headers: Record<string, string>;
	start: (stream: Writable) => Promise<void>;
}
