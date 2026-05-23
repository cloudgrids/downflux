import { Provider } from '@types';
import { GenericContentProvider } from '@provider/shared';
import { MastodonExecArgs } from './MastodonContracts';

export class MastodonProvider extends GenericContentProvider<MastodonExecArgs> {
	constructor(url: string) {
		super(url, {
			provider: Provider.Mastodon,
			urlPattern: /^(?:mastodon\.social|mastodon\.online|mstdn\.social|fosstodon\.org|techhub\.social)$/i,
			metadata: {
				hasHls: true,
				type: 'socialmedia',
				hlsIntegrated: false,
				hasMp4: true,
				mp4Integrated: false,
				hasKvs: false,
				underGeoRestriction: true,
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
