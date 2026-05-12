import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { SexVidOutput } from './SexVidContracts';

export class SexVidParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<SexVidOutput>>> {
		const { videoUrl: rawVideoUrl, videoAltUrl: rawVideoAltUrl, videoUrlText, videoAltUrlText, licenseCode } = this.getFlashVars(html);

		const videoUrl = rawVideoUrl && licenseCode ? this.kvsResolver.resolveKvsUrl(rawVideoUrl, licenseCode) : rawVideoUrl;
		const videoAltUrl = rawVideoAltUrl && licenseCode ? this.kvsResolver.resolveKvsUrl(rawVideoAltUrl, licenseCode) : rawVideoAltUrl;

		try {
			return {
				customFields: {
					poster: this.extractMetaPropertyContent(html, 'og:image'),
					actor: this.extractMetaPropertyContent(html, 'og:video:actor'),
					duration: parseInt(this.extractMetaPropertyContent(html, 'og:video:duration') ?? '0', 10),
					releasedAt: this.extractMetaPropertyContent(html, 'og:video:release_date'),
					pageUrl: sourceUrl,
					videos: [
						{ url: videoUrl, quality: videoUrlText },
						{ url: videoAltUrl, quality: videoAltUrlText }
					]
				} as SexVidOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.SexVid, 'SexVidParser', { cause: error });
		}
	}

	public getFlashVars(html: string) {
		const extractField = (field: string) => {
			const re = new RegExp(`${field}\\s*:\\s*['"]([^'"]+)['"]`, 'i');

			const match = re.exec(html);

			return match?.[1] ?? null;
		};

		const videoUrl = extractField('video_url')?.match(/((?:function\/0\/)?https.*)/i)?.[0];

		const videoAltUrl = extractField('video_alt_url')?.match(/((?:function\/0\/)?https.*)/i)?.[0];

		const videoUrlHd = extractField('video_url_hd');

		const videoUrlText = extractField('video_url_text');

		const videoAltUrlText = extractField('video_alt_url_text');

		const postfix = extractField('postfix');

		const licenseCode = extractField('license_code');

		const rnd = extractField('rnd');

		const videoId = extractField('video_id');

		return {
			videoId,
			licenseCode,
			rnd,
			postfix,

			videoUrl,
			videoAltUrl,

			videoUrlHd,
			videoUrlText,
			videoAltUrlText
		};
	}
}
