import { Provider } from '@types';
import { GenericContentProvider } from '@provider/shared';
import { MangaDexExecArgs } from './MangaDexContracts';

export class MangaDexProvider extends GenericContentProvider<MangaDexExecArgs> {
	constructor(url: string) {
		super(url, {
			provider: Provider.MangaDex,
			urlPattern: /^(?:www\.)?mangadex\.org$/i,
			metadata: {
				hasHls: true,
				type: 'manga',
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
