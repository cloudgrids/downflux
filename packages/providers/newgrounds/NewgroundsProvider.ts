import { Provider } from '@types';
import { GenericContentProvider } from '@provider/shared';
import { NewgroundsExecArgs } from './NewgroundsContracts';

export class NewgroundsProvider extends GenericContentProvider<NewgroundsExecArgs> {
	constructor(url: string) {
		super(url, {
			provider: Provider.Newgrounds,
			urlPattern: /^(?:www\.)?newgrounds\.com$/i,
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
