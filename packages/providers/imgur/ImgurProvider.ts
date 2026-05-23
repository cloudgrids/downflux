import { Provider } from '@types';
import { GenericContentProvider } from '@provider/shared';
import { ImgurExecArgs } from './ImgurContracts';

export class ImgurProvider extends GenericContentProvider<ImgurExecArgs> {
	constructor(url: string) {
		super(url, {
			provider: Provider.Imgur,
			urlPattern: /^(?:i\.)?imgur\.com$/i,
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
