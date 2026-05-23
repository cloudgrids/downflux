import { Provider } from '@types';
import { GenericContentProvider } from '@provider/shared';
import { UnsplashExecArgs } from './UnsplashContracts';

export class UnsplashProvider extends GenericContentProvider<UnsplashExecArgs> {
	constructor(url: string) {
		super(url, {
			provider: Provider.Unsplash,
			urlPattern: /^(?:www\.)?unsplash\.com$/i,
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
