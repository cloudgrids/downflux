export interface DownloadResult {
  url: string;
  /** Absolute path on disk (only when target = LOCAL) */
  localPath?: string;
  /** Raw bytes (only when target = BUFFER) */
  buffer?: Buffer;
  filename: string;
  extension: string;
  mimeType: string;
  sizeBytes: number;
}
