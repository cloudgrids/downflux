import { Provider } from '@types';
import { GenericContentProvider } from '@provider/shared';
import { RedditExecArgs } from './RedditContracts';

export class RedditProvider extends GenericContentProvider<RedditExecArgs> {
	constructor(url: string) {
		super(url, {
			provider: Provider.Reddit,
			urlPattern: /^(?:www\.|old\.)?reddit\.com$/i,
			metadata: {
				hasHls: true,
				type: 'socialmedia',
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
