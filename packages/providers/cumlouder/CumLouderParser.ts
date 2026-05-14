import { BaseParser } from '@base';
import { DefaultExecutionResult } from '@contracts';
import { GenericException } from '@core/exceptions';
import { ProviderType } from '@types';
import { CumLouderOutput } from './CumLouderContracts';

export class CumLouderParser extends BaseParser {
	public override transform(html: string, sourceUrl: string): Partial<DefaultExecutionResult<Partial<CumLouderOutput>>> {
		const pornStars = this.collectByClassNames(html, 'pornstar-link');

		const videoInfo = this.collectByClassNames(html, 'cum_player_html5_api', { includeInnerHTML: true })?.[0];

		console.log({ pornStars, videoInfo });

		try {
			return {
				customFields: {
					pageUrl: sourceUrl,
					poster: this.extractVideoPosters(html)?.[0]
				} as CumLouderOutput
			};
		} catch (error) {
			throw new GenericException('Unable to parse some fields:', ProviderType.CumLouder, 'CumLouderParser', { cause: error });
		}
	}
}
