import { Provider } from '@types';
import { GenericContentProvider } from '@provider/shared';
import { ArtStationExecArgs } from './ArtStationContracts';

export class ArtStationProvider extends GenericContentProvider<ArtStationExecArgs> {
	constructor(url: string) {
		super(url, {
			provider: Provider.ArtStation,
			urlPattern: /^(?:www\.)?artstation\.com$/i,
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
				needsExternalAPI: false,
				requiresLogin: false,
				cloudflareChallenge: false,
				sniSpoofing: 'untested'
			}
		});
	}
}
