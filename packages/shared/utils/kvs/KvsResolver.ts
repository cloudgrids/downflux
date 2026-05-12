export class KvsResolver {
	private static readonly FUNCTION_PREFIX = 'function/0/';
	private static readonly HASH_LENGTH = 32;

	private getLicenseToken(licenseCode: string): number[] {
		const clean = licenseCode.replace(/\$/g, '');
		const licenseValues = clean.split('').map(Number);

		const modLicense = clean.replace(/0/g, '1');
		const center = Math.floor(modLicense.length / 2);
		const frontHalf = parseInt(modLicense.slice(0, center + 1), 10);
		const backHalf = parseInt(modLicense.slice(center), 10);
		const seedStr = String(4 * Math.abs(frontHalf - backHalf)).slice(0, center + 1);

		const token: number[] = [];
		for (let index = 0; index < seedStr.length; index++) {
			const current = parseInt(seedStr[index], 10);
			for (let offset = 0; offset < 4; offset++) {
				token.push((licenseValues[index + offset] + current) % 10);
			}
		}

		return token;
	}

	public resolveKvsUrl(videoUrl: string, licenseCode: string): string {
		if (!videoUrl.startsWith(KvsResolver.FUNCTION_PREFIX)) return videoUrl;

		const realUrl = videoUrl.slice(KvsResolver.FUNCTION_PREFIX.length);
		const urlObj = new URL(realUrl);
		const parts = urlObj.pathname.split('/');
		const tokenPart = parts[3];
		const hash = tokenPart.slice(0, KvsResolver.HASH_LENGTH);
		const suffix = tokenPart.slice(KvsResolver.HASH_LENGTH);

		const licenseToken = this.getLicenseToken(licenseCode);
		const indices = Array.from({ length: KvsResolver.HASH_LENGTH }, (_, i) => i);

		let acc = 0;
		for (let idx = KvsResolver.HASH_LENGTH - 1; idx >= 0; idx--) {
			acc += licenseToken[idx];
			const dest = (idx + acc) % KvsResolver.HASH_LENGTH;
			[indices[idx], indices[dest]] = [indices[dest], indices[idx]];
		}

		// Reorder hash characters according to the permuted indices
		const deciphered = indices.map((idx) => hash[idx]).join('') + suffix;

		parts[3] = deciphered;
		urlObj.pathname = parts.join('/');

		return urlObj.toString();
	}
}
