import { Provider } from '@types';
import { GenericContentProvider } from '@provider/shared';
import { InstagramExecArgs } from './InstagramContracts';

export class InstagramProvider extends GenericContentProvider<InstagramExecArgs> {
	constructor(url: string) {
		super(url, {
			provider: Provider.Instagram,
			urlPattern: /^(?:www\.)?instagram\.com$/i,
			metadata: {
				hasHls: true,
				type: 'socialmedia',
				hlsIntegrated: false,
				hasMp4: true,
				mp4Integrated: false,
				hasKvs: false,
				underGeoRestriction: false,
				requiresBrowser: true,
				canDownload: true,
				underDevelopment: true,
				needsExternalAPI: true,
				requiresLogin: true,
				cloudflareChallenge: true,
				sniSpoofing: 'untested'
			}
		});
	}
}
