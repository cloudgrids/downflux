import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { MyLustOutput } from './MyLustContracts';

export class MyLustParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<MyLustOutput>>> {
		const scripts = this.extractScriptsByType(html, 'application/ld+json')?.flatMap((script) => JSON.parse(script))?.[0];
		const videos = this.collectSources(html)?.map((source) => ({ url: source?.src, quality: source?.title }));

		try {
			return {
				customFields: {
					pageUrl: sourceUrl,
					actors: scripts?.actor?.map((actor) => actor?.name) || [],
					uploader: scripts?.author?.[0]?.name || 'unknown',
					videoId: html.match(/videoId\s*:\s*['"]([^'"]+)['"]/i)?.[1],
					poster: this.extractMetaPropertyContent(html, 'og:image'),
					videos
				} as MyLustOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.MyLust, 'MyLustParser', { cause: error });
		}
	}
}
