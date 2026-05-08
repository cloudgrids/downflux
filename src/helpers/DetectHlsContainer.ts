export function detectHlsContainer(manifest: string): 'ts' | 'fmp4' {
	const isFmp4 = manifest.includes('#EXT-X-MAP') || manifest.includes('.m4s');
	return isFmp4 ? 'fmp4' : 'ts';
}
