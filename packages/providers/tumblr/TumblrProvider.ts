import { Provider } from '@types';
import { GenericContentProvider } from '@provider/shared';
import { TumblrExecArgs } from './TumblrContracts';

export class TumblrProvider extends GenericContentProvider<TumblrExecArgs> {
	constructor(url: string) {
		super(url, {
			provider: Provider.Tumblr,
			urlPattern: /^(?:www\.)?tumblr\.com$|^(?:[a-z0-9-]+\.)?tumblr\.com$/i,
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
