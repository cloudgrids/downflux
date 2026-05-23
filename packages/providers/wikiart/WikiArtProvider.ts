import { Provider } from '@types';
import { GenericContentProvider } from '@provider/shared';
import { WikiArtExecArgs } from './WikiArtContracts';

export class WikiArtProvider extends GenericContentProvider<WikiArtExecArgs> {
	constructor(url: string) {
		super(url, {
			provider: Provider.WikiArt,
			urlPattern: /^(?:www\.)?wikiart\.org$/i,
			metadata: {
				hasHls: true,
				type: 'art',
				hlsIntegrated: false,
				hasMp4: true,
				mp4Integrated: false,
				hasKvs: false,
				underGeoRestriction: false,
				requiresBrowser: false,
				canDownload: true,
				underDevelopment: true,
				needsExternalAPI: false,
				requiresLogin: false,
				cloudflareChallenge: false,
				sniSpoofing: 'untested'
			}
		});
	}
}
