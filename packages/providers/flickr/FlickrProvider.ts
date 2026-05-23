import { Provider } from '@types';
import { GenericContentProvider } from '@provider/shared';
import { FlickrExecArgs } from './FlickrContracts';

export class FlickrProvider extends GenericContentProvider<FlickrExecArgs> {
	constructor(url: string) {
		super(url, {
			provider: Provider.Flickr,
			urlPattern: /^(?:www\.)?flickr\.com$/i,
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
