import { Provider } from '@types';
import { GenericContentProvider } from '@provider/shared';
import { DeviantArtExecArgs } from './DeviantArtContracts';

export class DeviantArtProvider extends GenericContentProvider<DeviantArtExecArgs> {
	constructor(url: string) {
		super(url, {
			provider: Provider.DeviantArt,
			urlPattern: /^(?:www\.)?deviantart\.com$/i,
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
