export enum PipelineTarget {
  /** Write file to local disk */
  LOCAL = 'LOCAL',
  /** Return raw bytes as a Buffer (for upload pipelines) */
  BUFFER = 'BUFFER',
}
