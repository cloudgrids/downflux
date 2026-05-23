import { Provider } from '@types';
import { GenericContentProvider } from '@provider/shared';
import { PexelsExecArgs } from './PexelsContracts';

export class PexelsProvider extends GenericContentProvider<PexelsExecArgs> {
	constructor(url: string) {
		super(url, {
			provider: Provider.Pexels,
			urlPattern: /^(?:www\.)?pexels\.com$/i,
			metadata: {
				hasHls: true,
				type: 'gallery',
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
