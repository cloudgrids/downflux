export class KvsResolver {
	private getLicenseToken(licenseCode: string): number[] {
		const normalized = licenseCode.replace(/\$/g, '');

		const digits = normalized.split('').map(Number);
		const safe = normalized.replace(/0/g, '1');

		const midpoint = Math.floor(safe.length / 2);
		const left = Number(safe.slice(0, midpoint + 1));
		const right = Number(safe.slice(midpoint));

		const seed = String(4 * Math.abs(left - right)).slice(0, midpoint + 1);

		return seed.split('').flatMap((digit, index) => {
			const value = Number(digit);
			return Array.from({ length: 4 }, (_, offset) => (digits[index + offset] + value) % 10);
		});
	}

	private decipherHash(hash: string, licenseCode: string): string {
		const token = this.getLicenseToken(licenseCode);
		const chars = hash.split('');

		let acc = 0;
		for (let idx = chars.length - 1; idx >= 0; idx--) {
			acc += token[idx];
			const target = (idx + acc) % chars.length;
			[chars[idx], chars[target]] = [chars[target], chars[idx]];
		}

		return chars.join('');
	}

	public resolveKvsUrl(videoUrl: string, licenseCode: string): string {
		const match = videoUrl.match(/^function\/\d+\/(.+)$/i);

		if (!match) return videoUrl;

		const url = new URL(match[1]);
		const segments = url.pathname.split('/');
		const tokenPart = segments[3];
		const hash = tokenPart.slice(0, 32);
		const suffix = tokenPart.slice(32);

		const deciphered = this.decipherHash(hash, licenseCode) + suffix;

		segments[3] = deciphered;

		url.pathname = segments.join('/');

		return url.toString();
	}
}
