import { PipelineTarget } from './PipelineTarget';
import { UrlType } from './UrlType';

export interface ImportOptions {
  /** href, src, data-src, data-lazy, data-original, source src, video poster, or all https?:// urls */
  urlType: UrlType;
  /** Buffer */
  target: PipelineTarget;
  /** Extra headers forwarded to every request */
  headers?: Record<string, string>;
  /** Filter downloaded URLs by extension */
  allowedExtensions?: string[];
  /** Abort signal to cancel mid-run */
  signal?: AbortSignal;
}
