import { Provider } from '@types';
import { GenericContentProvider } from '@provider/shared';
import { TikTokExecArgs } from './TikTokContracts';

export class TikTokProvider extends GenericContentProvider<TikTokExecArgs> {
	constructor(url: string) {
		super(url, {
			provider: Provider.TikTok,
			urlPattern: /^(?:www\.)?tiktok\.com$/i,
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
				requiresLogin: false,
				cloudflareChallenge: true,
				sniSpoofing: 'untested'
			}
		});
	}
}
