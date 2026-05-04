export function detectHlsContainer(manifest: string): 'ts' | 'fmp4' {
	return ['#EXT-X-MAP', '.m4s'].includes(manifest) ? 'fmp4' : 'ts';
}
