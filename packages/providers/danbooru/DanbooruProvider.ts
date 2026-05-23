import { Provider } from '@types';
import { GenericContentProvider } from '@provider/shared';
import { DanbooruExecArgs } from './DanbooruContracts';

export class DanbooruProvider extends GenericContentProvider<DanbooruExecArgs> {
	constructor(url: string) {
		super(url, {
			provider: Provider.Danbooru,
			urlPattern: /^(?:www\.)?danbooru\.donmai\.us$/i,
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
