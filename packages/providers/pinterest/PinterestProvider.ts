import { Provider } from '@types';
import { GenericContentProvider } from '@provider/shared';
import { PinterestExecArgs } from './PinterestContracts';

export class PinterestProvider extends GenericContentProvider<PinterestExecArgs> {
	constructor(url: string) {
		super(url, {
			provider: Provider.Pinterest,
			urlPattern: /^(?:www\.)?pinterest\.[a-z.]+$/i,
			metadata: {
				hasHls: true,
				type: 'gallery',
				hlsIntegrated: false,
				hasMp4: true,
				mp4Integrated: false,
				hasKvs: false,
				underGeoRestriction: false,
				requiresBrowser: true,
				canDownload: true,
				underDevelopment: true,
				needsExternalAPI: true,
				requiresLogin: false,
				cloudflareChallenge: true,
				sniSpoofing: 'untested'
			}
		});
	}
}
