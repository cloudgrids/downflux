import { Writable } from 'stream';
import { JobProgressEvent } from '../common';

export interface HLSStreamRequest {
	finalUrl: string;
	headers: Record<string, string>;
	start: (stream: Writable, onProgress?: (event: JobProgressEvent) => void) => Promise<void>;
}
