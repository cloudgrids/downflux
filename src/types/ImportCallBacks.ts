import { DownloadResult } from './DownloadResult';
import { ImportStep } from './ImportStep';

export type StepCallback<T = unknown> = (step: ImportStep<T>) => void | Promise<void>;

export interface ImportCallbacks {
  onFetch?: StepCallback<{ html: string }>;
  onExtract?: StepCallback<{ urls: string[]; count: number }>;
  onDownload?: StepCallback<DownloadResult>;
  onComplete?: StepCallback<{ downloaded: number; failed: number }>;
  onError?: StepCallback<never>;
}
