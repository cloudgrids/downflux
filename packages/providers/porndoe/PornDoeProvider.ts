import { BaseProvider } from '@base';
import { GenericException } from '@core/exceptions';
import { ExtractionTarget, ProviderType } from '@types';
import { PornDoeExecArgs, PornDoeVideoOutput } from './PornDoeContracts';
import { PornDoeMethods } from './PornDoeTypes';

export class PornDoeProvider extends BaseProvider<PornDoeExecArgs> {
	protected readonly provider = ProviderType.PornDoe;
	private readonly VIDEO_PATH_REGEX = /^https:\/\/(?:(?:www|de|en|fs|pt|es|fr|it)\.)?porndoe\.com\/watch\/([A-Za-z0-9]+)$/i;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.PornDoe,
			urlPattern: /^(?:(?:www|de|en|fs|pt|es|fr|it)\.)?porndoe\.(?:com)$/i,
			metadata: {
				hls: false,
				mp4: true,
				kvs: false,
				geoRestriction: false,
				needsBrowser: false
			}
		});
	}

	get videoUrl(): string {
		const match = this.url.match(this.VIDEO_PATH_REGEX);

		if (!match) throw new GenericException('Invalid video url', this.provider);

		return this.url;
	}

	public async getVideo(): Promise<PornDoeVideoOutput> {
		return await this.execute<PornDoeVideoOutput>({
			targets: [this.videoUrl],
			provider: this.provider,
			method: PornDoeMethods.getVideo,
			executionShape: 'single',
			extractionTarget: ExtractionTarget.SOURCES
		});
	}
}
