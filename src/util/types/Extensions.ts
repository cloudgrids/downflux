export type IndexRange = { start: number; end: number };
export type PageRange = { page: number; limit: number };
export type Range = IndexRange | PageRange;

export const EXTENSION_MAP = {
	image: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff', 'tif', 'svg', 'ico', 'avif', 'heic', 'heif'],
	video: ['mp4', 'webm', 'mov', 'mkv', 'avi', 'flv', 'wmv', 'm4v', 'mpg', 'mpeg', '3gp', 'ts', 'm3u8'],
	audio: ['mp3', 'wav', 'ogg', 'aac', 'flac', 'm4a', 'wma', 'opus', 'aiff', 'amr'],
	document: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf', 'odt', 'ods', 'odp', 'csv'],
	archive: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz', 'tgz', 'tar.gz'],
	executable: ['exe', 'msi', 'apk', 'dmg', 'bin', 'sh', 'bat'],
	font: ['ttf', 'otf', 'woff', 'woff2', 'eot'],
	subtitle: ['srt', 'vtt', 'ass', 'ssa'],
	data: ['json', 'xml', 'yaml', 'yml'],
	octet: ['bin', 'exe', 'zip', 'rar']
} as const;

export type EXTENSION_CATEGORY = keyof typeof EXTENSION_MAP;

export type EXTENSION = (typeof EXTENSION_MAP)[EXTENSION_CATEGORY][number];

export const EXTENSIONS: Record<EXTENSION_CATEGORY, Set<EXTENSION>> = Object.fromEntries(
	Object.entries(EXTENSION_MAP).map(([key, values]) => [key, new Set(values)])
) as any;

export type EXTENSION_BY_CATEGORY<T extends EXTENSION_CATEGORY> = (typeof EXTENSION_MAP)[T][number];

export type VideoExtension = EXTENSION_BY_CATEGORY<'video'>;
export type ImageExtension = EXTENSION_BY_CATEGORY<'image'>;
export type AudioExtension = EXTENSION_BY_CATEGORY<'audio'>;
export type DocumentExtension = EXTENSION_BY_CATEGORY<'document'>;
export type ArchiveExtension = EXTENSION_BY_CATEGORY<'archive'>;
export type ExecutableExtension = EXTENSION_BY_CATEGORY<'executable'>;
export type FontExtension = EXTENSION_BY_CATEGORY<'font'>;
export type SubtitleExtension = EXTENSION_BY_CATEGORY<'subtitle'>;
export type DataExtension = EXTENSION_BY_CATEGORY<'data'>;
export type OctetExtension = EXTENSION_BY_CATEGORY<'octet'>;

export type AllowedExtension = ImageExtension | VideoExtension | OctetExtension;
