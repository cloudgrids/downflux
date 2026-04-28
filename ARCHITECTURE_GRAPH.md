# Downflux Architecture Graph

## High-Level Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER APPLICATION                        │
│                    (Service Consumer)                           │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │   BaseService          │
        │  (Abstract Base)       │
        │                        │
        │ - execute<T>()         │
        │ - validate/sanitize    │
        │ - dependencies         │
        └────────┬───────────────┘
                 │
        ┌────────┴─────────┬──────────────┐
        │                  │              │
        ▼                  ▼              ▼
    ┌─────────┐      ┌──────────┐   ┌─────────────┐
    │ Okporn  │      │ Coomer   │   │ Default     │
    │Service  │      │Service   │   │Service      │
    └────┬────┘      └──────────┘   └─────────────┘
         │
         ▼
  ┌──────────────────┐
  │   JobService     │  ◄─── ORCHESTRATOR
  │                  │        (Central Hub)
  └──────────────────┘
         ▲
         │
    ┌────┼────┬──────────┬────────────┐
    │    │    │          │            │
    ▼    ▼    ▼          ▼            ▼
  ┌──┐ ┌──┐ ┌──┐      ┌──────┐    ┌─────────┐
  │1.│ │2.│ │3.│      │ 4.   │    │  5.     │
  └──┘ └──┘ └──┘      └──────┘    └─────────┘
```

---

## Detailed Architecture with Data Flow

```
INPUT LAYER
═══════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────┐
│                    ExecutionArguments                           │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ targets[], service, method, urlType, executionType, etc.  │ │
│  └────────────────────────────────────────────────────────────┘ │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 ▼
ORCHESTRATION LAYER
═══════════════════════════════════════════════════════════════════

    ┌─────────────────────────────────────┐
    │       JobService.execute<T>()       │
    │  (Main orchestration function)      │
    │                                     │
    │ Params:                             │
    │ • ExecutionArguments                │
    │ • OutputType (JSON/BUFFER/DEVICE)   │
    │ • PipelineHooks[]                   │
    └────────┬────────────────────────────┘
             │
    ┌────────┴────────────────────────────────────────────────┐
    │                                                          │
    ▼ (1) EXTRACTION PHASE                                    │
┌────────────────────────────┐                                │
│ extractMetadata<T>()       │                                │
│                            │                                │
│ For each target URL:       │                                │
│  targets[] ──────────────────────────────────┐              │
└────────┬───────────────────┘                 │              │
         │                                     │              │
         ▼                                     ▼              │
    ┌──────────────────────────────────────────────────────┐ │
    │      TransformerService.transform<T>()              │ │
    │                                                      │ │
    │  Selects service-specific transformer:             │ │
    │  • OkPornTransformer                               │ │
    │  • DefaultTransformer                              │ │
    │                                                     │ │
    │  Each transformer extends BaseTransformer<T>       │ │
    │  and returns T (service-specific metadata)          │ │
    │                                                     │ │
    │  Dependencies:                                      │ │
    │  ├─ HtmlParserService (HTML extraction)            │ │
    │  └─ HttpFetcherService (URL fetching)              │ │
    └──────────────┬──────────────────────────────────────┘ │
                   │                                        │ │
                   ▼                                        │ │
         Returns extracted<T> data                         │ │
         (e.g., OkPornAlbumOutput, VideoOutput, etc)      │ │
                                                           │ │
    ┌──────────────────────────────────────────────────────┐ │
    │  extracted: T[] = []                                │ │
    │  ├─ OkPornAlbumOutput { albumImages[], ... }        │ │
    │  ├─ OkPornVideoOutput { videoSources[], ... }       │ │
    │  ├─ OkPornModelOutput { modelThumbnail, ... }       │ │
    │  └─ DefaultExtractorResult { images[], sources[] }  │ │
    └──────────────┬──────────────────────────────────────┘ │
                   │                                        │ │
                   ▼                                        │ │
         ┌───────────────────────────┐                    │ │
         │ ExecutionResult<T>        │                    │ │
         │ populated with:           │                    │ │
         │ ├─ extracted: T[]         │                    │ │
         │ ├─ service                │                    │ │
         │ ├─ method                 │                    │ │
         │ └─ metadata               │                    │ │
         └───────────────────────────┘                    │ │
                                                           │ │
    ┌──────────────────────────────────────────────────────┐ │
    │              OUTPUT ROUTING                          │ │
    └──────────────────────────────────────────────────────┘ │
                   │                                        │ │
         ┌─────────┼─────────┬─────────────┐              │ │
         │         │         │             │              │ │
         ▼         ▼         ▼             ▼              │ │
    OutputType:                                           │ │
    JSON      BUFFER    DEVICE       RETURN              │ │
    │         │         │            │                   │ │
    ▼         ▼         ▼            ▼                   │ │
  Save    Build    Fire Async   Return                  │ │
  JSON    Buffer   Downloads    Result                  │ │
  File            (Non-blocking)                         │ │
                                                          │ │
    For BUFFER/DEVICE outputs:                          │ │
    (Fire-and-forget async processing)                  │ │
                                                          │ │
    └──────────────────────────────────────────────────────┘ │
                                                              │
    ▼ (2) ASYNC DOWNLOAD PHASE (Background)                  │
┌─────────────────────────────────────────────────┐          │
│ handleDeviceOutputAsync()                       │          │
│ (Non-blocking trigger)                          │          │
└────────────┬────────────────────────────────────┘          │
             │                                               │
             ▼                                               │
┌─────────────────────────────────────────────────────────┐ │
│ processDownloadsInBackground<T>()                       │ │
│                                                         │ │
│ For each metadata item in extracted<T>[]:              │ │
│  1. Build pipeline items from metadata                 │ │
│  2. Download and process each item                     │ │
│  3. Execute hooks (onExtract, onDownload)              │ │
│                                                        │ │
└────────────┬────────────────────────────────────────────┘ │
             │                                              │
             ├─ (3) PIPELINE BUILDING PHASE                │
             │  ▼                                           │
             │  ┌──────────────────────────────────────┐   │
             │  │   PipelineService.build()           │   │
             │  │                                      │   │
             │  │  Routes by ServiceType:              │   │
             │  │  ├─ OkPornPipeline                  │   │
             │  │  ├─ DefaultPipeline                 │   │
             │  │  └─ CustomPipeline                  │   │
             │  │                                      │   │
             │  │  Returns PipelineItem[]:             │   │
             │  │  ├─ sourceUrl                        │   │
             │  │  ├─ downloadUrl                      │   │
             │  │  ├─ resourceType                     │   │
             │  │  └─ service                          │   │
             │  └──────────────┬───────────────────────┘   │
             │                 │                            │
             │                 ▼                            │
             │  ┌──────────────────────────────────────┐   │
             │  │  OkPornPipeline.extractUrls()       │   │
             │  │                                      │   │
             │  │  Priority extraction:                │   │
             │  │  1. albumImages (Albums)            │   │
             │  │  2. videoSources (Videos)           │   │
             │  │  3. modelThumbnail (Models)         │   │
             │  │  4. channelThumbnail (Channels)     │   │
             │  │  5. Fallback to images/sources      │   │
             │  │  6. Last resort: baseUrl            │   │
             │  └──────────────┬───────────────────────┘   │
             │                 │                            │
             │                 ▼                            │
             │    PipelineItem[] (one per URL)             │
             │                                              │
             │                                              │
             ├─ (4) HOOK EXECUTION PHASE                   │
             │  ▼                                           │
             │  ┌──────────────────────────────────────┐   │
             │  │  executeHooks(pipelineHooks)        │   │
             │  │  hookName: 'onExtract'              │   │
             │  │                                      │   │
             │  │  Runs user-defined callbacks        │   │
             │  │  on each PipelineItem               │   │
             │  └──────────────┬───────────────────────┘   │
             │                 │                            │
             │                 ▼                            │
             │                                              │
             ├─ (5) DOWNLOAD PHASE                         │
             │  ▼                                           │
             │  ┌──────────────────────────────────────┐   │
             │  │  DownloaderService.download()       │   │
             │  │                                      │   │
             │  │  Routes by service:                 │   │
             │  │  ├─ OkPornDownloader                │   │
             │  │  ├─ DefaultDownloader               │   │
             │  │  └─ CustomDownloader                │   │
             │  │                                      │   │
             │  │  Returns: DownloadResult            │   │
             │  │  ├─ buffer                          │   │
             │  │  ├─ filename                        │   │
             │  │  ├─ extendedFilename               │   │
             │  │  └─ metadata                        │   │
             │  └──────────────┬───────────────────────┘   │
             │                 │                            │
             │                 ▼                            │
             │                                              │
             ├─ (6) FILE SAVE PHASE                        │
             │  ▼                                           │
             │  ┌──────────────────────────────────────┐   │
             │  │  FileService.saveToDevice()         │   │
             │  │                                      │   │
             │  │  Routes by OutputType:              │   │
             │  │  ├─ DEVICE (filesystem)             │   │
             │  │  ├─ BUFFER (memory)                 │   │
             │  │  └─ Handles directory config        │   │
             │  └──────────────┬───────────────────────┘   │
             │                 │                            │
             │                 ▼                            │
             │                                              │
             └─ (7) DOWNLOAD HOOK EXECUTION                │
                ▼                                           │
                ┌──────────────────────────────────────┐   │
                │  executeDownloadHooks()              │   │
                │  hookName: 'onDownload'              │   │
                │                                      │   │
                │  Runs user-defined callbacks        │   │
                │  on DownloadResult                  │   │
                └──────────────────────────────────────┘   │
                                                            │
└────────────────────────────────────────────────────────────┘


DEPENDENCY INJECTION LAYER
═══════════════════════════════════════════════════════════════════

┌────────────────────────────────────────────────────────────────┐
│           createDefaultDependencies()                          │
│                                                                │
│  Creates singleton instances:                                 │
│  ├─ HtmlParserService                                         │
│  ├─ HttpFetcherService                                        │
│  ├─ FileService                                               │
│  ├─ TransformerService                                        │
│  ├─ ExtractorService                                          │
│  ├─ DownloaderService                                         │
│  └─ PipelineService                                           │
│                                                                │
│  Passed to:                                                   │
│  └─ BaseService (injected via constructor)                   │
└────────────────────────────────────────────────────────────────┘
```

---

## Component Dependencies Map

```
JobService (Central Hub)
│
├─ TransformerService
│  ├─ HtmlParserService
│  │  └─ [jsdom/cheerio for HTML parsing]
│  ├─ HttpFetcherService
│  │  └─ [axios/fetch for HTTP requests]
│  ├─ OkPornTransformer extends BaseTransformer<T>
│  ├─ DefaultTransformer extends BaseTransformer<T>
│  └─ CoomerTransformer extends BaseTransformer<T>
│
├─ PipelineService
│  ├─ BasePipeline
│  ├─ OkPornPipeline extends BasePipeline
│  ├─ DefaultPipeline extends BasePipeline
│  └─ Custom Pipelines...
│
├─ DownloaderService
│  ├─ OkPornDownloader extends BaseDownloader
│  ├─ DefaultDownloader extends BaseDownloader
│  └─ Custom Downloaders...
│
└─ FileService
   ├─ Directory management
   ├─ JSON serialization
   └─ Device output handling
```

---

## Type Flow Diagram

```
ExecutionArguments (Input)
       │
       ├─ targets: string[]
       ├─ service: ServiceType
       ├─ method: ServiceMethod
       └─ options: JobOptions
       │
       ▼
TransformerService.transform<T>(url, request)
       │
       ├─ Selects transformer based on service
       ├─ Fetches HTML from URL
       ├─ Parses HTML to extract metadata
       └─ Returns T (service-specific type)
       │
       ├─ T = OkPornAlbumOutput
       ├─ T = OkPornVideoOutput
       ├─ T = OkPornModelOutput
       ├─ T = DefaultExtractorResult
       └─ T = ... (other service types)
       │
       ▼
extracted: T[] (Array of service-specific metadata)
       │
       ├─ Each T contains:
       │  ├─ URLs (images[], sources[], etc.)
       │  ├─ Metadata (title, description, keywords)
       │  ├─ baseUrl
       │  └─ Service-specific fields
       │
       ▼
PipelineService.build(metadata: T, service: ServiceType)
       │
       ├─ Selects pipeline based on service
       ├─ Extracts URLs from service-specific fields
       └─ Creates PipelineItem[] (one per URL)
       │
       ▼
PipelineItem[] (downloadable resources)
       │
       ├─ sourceUrl: string
       ├─ downloadUrl: string
       ├─ resourceType: 'image' | 'video' | 'audio'
       └─ service: ServiceType
       │
       ▼
DownloaderService.download(pipelineItem, options)
       │
       ├─ Fetches URL
       ├─ Decodes/converts file
       └─ Returns DownloadResult
       │
       ├─ buffer: Buffer
       ├─ filename: string
       ├─ extendedFilename: string
       └─ metadata: any
       │
       ▼
FileService.saveToDevice(buffer, path, filename)
       │
       └─ Writes to filesystem


ExecutionResult<T> (Output)
       │
       ├─ extracted: T[]
       ├─ service: ServiceType
       ├─ method: ServiceMethod
       ├─ targetUrls: string[]
       ├─ downloaded: number
       ├─ failed: number
       ├─ errors: Error[]
       └─ outputType: OutputType
```

---

## Execution Flow Sequence

```
1. USER CALLS SERVICE
   └─ service.execute(ExecutionArguments)

2. SERVICE ROUTES TO JobService
   └─ jobService.execute<T>(request)

3. SYNCHRONOUS EXTRACTION (Returns immediately)
   ├─ extractMetadata<T>(targets, request)
   │  ├─ For each target URL:
   │  │  └─ transformerService.transform<T>(url, request)
   │  │     └─ Returns metadata T
   │  └─ Collect all T[] into extracted[]
   └─ Build ExecutionResult<T> with extracted data

4. OUTPUT ROUTING
   ├─ IF OutputType.JSON
   │  └─ FileService.saveJson() + return result
   ├─ IF OutputType.RETURN
   │  └─ return result immediately
   └─ IF OutputType.DEVICE or BUFFER
      └─ FIRE ASYNC (non-blocking) → goto step 5

5. ASYNC BACKGROUND PROCESSING (Parallel, non-blocking)
   └─ handleDeviceOutputAsync() fires and returns immediately
      └─ processDownloadsInBackground() runs in background
         ├─ For each metadata in extracted[]:
         │  ├─ pipelineService.build(metadata, service)
         │  │  └─ Returns PipelineItem[] (URLs to download)
         │  ├─ For each PipelineItem:
         │  │  ├─ executeHooks(hooks, 'onExtract', item)
         │  │  ├─ downloaderService.download(item, options)
         │  │  ├─ fileService.saveToDevice(buffer, path, filename)
         │  │  └─ executeDownloadHooks(hooks, result)
         │  └─ Catch errors and log
         └─ Return when all items processed
```

---

## Service Type Routing

```
ServiceType Enum
     │
     ├─ OKPORN
     │  ├─ OkPornTransformer.transform()
     │  │  └─ Returns OkPornAlbumOutput | OkPornVideoOutput | ...
     │  ├─ OkPornPipeline.extractUrls()
     │  │  └─ Extracts from albumImages[], videoSources[], etc.
     │  └─ OkPornDownloader.download()
     │     └─ OkPorn-specific download logic
     │
     ├─ DEFAULT
     │  ├─ DefaultTransformer.transform()
     │  │  └─ Returns DefaultExtractorResult
     │  ├─ BasePipeline.extractUrls()
     │  │  └─ Extracts from images[], sources[], etc.
     │  └─ DefaultDownloader.download()
     │     └─ Generic download logic
     │
     └─ COOMER
        ├─ CoomerTransformer.transform()
        ├─ [Coomer-specific pipeline]
        └─ [Coomer-specific downloader]
```

---

## Key Architectural Principles

1. **Service Abstraction**: All services extend BaseService, implement execute<T>()
2. **Generic Type System**: T flows through pipeline maintaining type safety
3. **Async-First**: Metadata returns immediately, downloads fire non-blocking
4. **Hook System**: Users can inject custom callbacks at extraction and download phases
5. **Dependency Injection**: All services receive dependencies via constructor
6. **Service Routing**: Each layer (Transformer, Pipeline, Downloader) routes by ServiceType
7. **Error Handling**: Errors collected but don't break pipeline execution
8. **Progressive Updates**: Hooks enable real-time UI updates during background processing
