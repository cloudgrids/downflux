import { Provider } from '@types';
import { GenericContentProvider } from '@provider/shared';
import { BehanceExecArgs } from './BehanceContracts';

export class BehanceProvider extends GenericContentProvider<BehanceExecArgs> {
	constructor(url: string) {
		super(url, {
			provider: Provider.Behance,
			urlPattern: /^(?:www\.)?behance\.net$/i,
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
				needsExternalAPI: true,
				requiresLogin: false,
				cloudflareChallenge: false,
				sniSpoofing: 'untested'
			}
		});
	}
}
