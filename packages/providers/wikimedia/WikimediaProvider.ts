import { Provider } from '@types';
import { GenericContentProvider } from '@provider/shared';
import { WikimediaExecArgs } from './WikimediaContracts';

export class WikimediaProvider extends GenericContentProvider<WikimediaExecArgs> {
	constructor(url: string) {
		super(url, {
			provider: Provider.Wikimedia,
			urlPattern: /^(?:commons\.)?wikimedia\.org$/i,
			metadata: {
				hasHls: true,
				type: 'educational',
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
