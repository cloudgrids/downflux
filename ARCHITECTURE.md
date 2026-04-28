# ✅ Async-First Architecture - Fire-and-Forget Downloads

## 🎯 Core Principle

**Metadata should NEVER be blocked by downloads**

```
t=0: Extract metadata (FAST) ✅
     ↓
     Return immediately to user ✅
     ↓
     User builds table/UI with data ✅
     ↓
t=1..n: Downloads happen async in background ✅
        ↓
        Hooks fire as each download completes ✅
        ↓
        UI updates progressively (onDownload hook) ✅
```

---

## 📊 Execution Flow

```
extract → return result immediately
         → fire downloads async in background
         → hooks fire progressively
```

---

## 🔧 Implementation Details

### 1. **JobService.execute()**

**Key changes:**

- Returns immediately with `ExecutionResult<T>` containing metadata
- For `OutputType.BUFFER | DEVICE`: fires async downloads WITHOUT awaiting
- Downloads run in `handleDeviceOutputAsync()` (fire-and-forget)

```typescript
// Phase 1: Extract metadata (FAST)
const extracted: T[] = [];
for (const url of targets) {
  const metadata = await extractor.extractFromUrl(url, request) as T;
  extracted.push(metadata);
}

// Phase 2: Return immediately with metadata
return result; // Contains extracted data

// Phase 3: Fire downloads async WITHOUT awaiting ✅
this.handleDeviceOutputAsync(result.extracted, ...);
// ↑ This doesn't block the return above
```

---

### 2. **Background Download Pipeline**

**Method:** `processDownloadsInBackground()`

Runs async without blocking:

- Extracts actual file URLs from metadata (NOT just baseUrl)
- Creates multiple pipeline items per metadata object
- Downloads each file
- Executes `onDownload` hook after each completion
- Users update UI via hooks

```typescript
private async processDownloadsInBackground<T>(...): Promise<void> {
  for (const metadata of extracted) {
    const pipelineItems = this.buildPipelineItems(metadata, service);

    for (const pipelineItem of pipelineItems) {
      await executeHooks('onExtract', pipelineItem);

      const downloadResult = await downloader.downloadFile(...);

      await executeDownloadHooks(hooks, downloadResult);
      // ↑ UI updates here via onDownload hook ✅
    }
  }
}
```

---

### 3. **Extract Actual File URLs**

**Method:** `buildPipelineItems()` + `extractDownloadUrls()`

**CRITICAL FIX:** Don't use `baseUrl` as download URL

```typescript
private extractDownloadUrls(metadata: any): string[] {
  const urls: string[] = [];

  // OkPorn albums: use albumImages
  if (metadata.albumImages) {
    urls.push(...metadata.albumImages);
  }

  // OkPorn videos: use videoSources
  if (metadata.videoSources) {
    urls.push(...metadata.videoSources);
  }

  // Generic: use images/sources
  if (metadata.images && !metadata.albumImages) {
    urls.push(...metadata.images);
  }

  return urls;
}
```

---

### 4. **Service Methods Return Arrays**

**BaseService.execute()** updated to return `T[]` instead of `T`

```typescript
protected async execute<T>(...): Promise<T[]> {
  const result = await this.deps.job.execute<T>(...);

  // Downloads already started async internally ✅
  // Return metadata immediately ✅
  return result.extracted;
}
```

**OkPornService methods:**

```typescript
// Returns immediately with metadata
public async getAlbums(param: Range): Promise<OkPornAlbumOutput[]> {
  return await this.execute<OkPornAlbumOutput>(...);
  // ↑ Returns T[] not T
}

// Same for getAlbum(), getVideos(), etc.
```

---

## 🎯 Usage Pattern (User Code)

### Step 1: Get Metadata (Fast, no downloads)

```typescript
const albums = await service
  .setOutput(OutputType.DEVICE) // Request downloads
  .getAlbums({ type: 'index', start: 1, end: 10 });

// ✅ Returns immediately with:
// [
//   { albumId, albumTitle, albumImages, ... },
//   { albumId, albumTitle, albumImages, ... },
//   ...
// ]
```

### Step 2: Build Table with Metadata

```typescript
const table = albums.map((album) => ({
  id: album.albumId,
  title: album.albumTitle,
  imageCount: album.albumImages.length,
  downloadStatus: 'pending' // Will update via hook
}));
```

### Step 3: Setup Hook for Progressive Updates

```typescript
service.setJobOptions({
  pipelineHooks: [
    {
      onDownload: (result) => {
        // 🔥 This fires as each image/video downloads ✅
        console.log(`Downloaded: ${result.url}`);

        // Update table row
        table[rowId].downloadStatus = 'completed';
        table[rowId].downloadUrl = result.url;
      }
    }
  ]
});
```

---

## ✅ Benefits

| Feature                 | Before               | After        |
| ----------------------- | -------------------- | ------------ |
| **UI Renders**          | Blocked by downloads | Immediate ✅ |
| **Metadata Available**  | Delayed              | Fast ✅      |
| **Progressive Updates** | No                   | Yes ✅       |
| **User Sees Table**     | After downloads      | Instantly ✅ |
| **Blocking?**           | Yes ❌               | No ✅        |

---

## 🚨 Critical Fixes Applied

1. ✅ **Metadata NOT blocked by downloads**
   - Returns immediately
   - Downloads fire async

2. ✅ **Actual file URLs extracted**
   - `albumImages` for albums
   - `videoSources` for videos
   - NOT just `baseUrl`

3. ✅ **Multiple pipeline items**
   - One metadata object → multiple download items
   - Each image/video gets own pipeline item

4. ✅ **Progressive hooks**
   - `onExtract` → fires before download
   - `onDownload` → fires after download completes
   - Users can track progress

5. ✅ **Service methods return arrays**
   - `getAlbums()` returns `OkPornAlbumOutput[]`
   - `getAlbum()` returns `OkPornAlbumOutput[]`
   - Not awaiting downloads in return path

---

## 🔄 Error Handling

Errors in background downloads don't crash metadata:

```typescript
private async processDownloadsInBackground<T>(...) {
  for (const metadata of extracted) {
    try {
      // Download logic
    } catch (err) {
      // Log error, continue with next item ✅
      console.error('Error downloading item:', err);
    }
  }
}
```

---

## 🚀 Next Steps (Production-Ready)

Consider adding:

1. **Event emitter** for download progress
2. **RxJS streams** for reactive UI updates
3. **Parallel download queue** with throttling
4. **Retry logic** for failed downloads
5. **Progress tracking** (bytes/percentage)

---

## 📝 Summary

The system now follows proper async architecture:

✅ Fast metadata extraction
✅ Immediate return to user
✅ Background downloads
✅ Progressive hook-based updates
✅ No blocking UI
✅ Multiple URLs per metadata object
✅ Actual file URLs (not baseUrl)
