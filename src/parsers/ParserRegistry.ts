import { ProviderType } from '@app/shared';
import { DefaultParser } from './DefaultParser';
import { HqPornParser } from './HqPornParser';
import { OkPornParser } from './OkPornParser';
import { Porn300Parser } from './Porn300Parser';
import { PornHubParser } from './PornHubParser';
import { PornOneParser } from './PornOneParser';
import { PornsOkParser } from './PornsOkParser';
import { TnAFlixParser } from './TnAFlixParser';
import { WallHavenParser } from './WallHavenParser';
import { XHamsterParser } from './XHamsterParser';
import { XVideosParser } from './XVideosParser';
import { XnXXParser } from './XnXXParser';

export class ParserRegistry {
	private static readonly parsers: Record<ProviderType, DefaultParser> = {
		[ProviderType.Coomer]: new DefaultParser(),
		[ProviderType.Default]: new DefaultParser(),
		[ProviderType.HqPorn]: new HqPornParser(),
		[ProviderType.OkPorn]: new OkPornParser(),
		[ProviderType.Porn300]: new Porn300Parser(),
		[ProviderType.PornHub]: new PornHubParser(),
		[ProviderType.PornOne]: new PornOneParser(),
		[ProviderType.PornsOk]: new PornsOkParser(),
		[ProviderType.TnAFlix]: new TnAFlixParser(),
		[ProviderType.WallHaven]: new WallHavenParser(),
		[ProviderType.XHamster]: new XHamsterParser(),
		[ProviderType.XVideos]: new XVideosParser(),
		[ProviderType.XnXX]: new XnXXParser()
	};

	public static getParser(providerType: ProviderType): DefaultParser {
		return this.parsers[providerType] ?? this.parsers[ProviderType.Default];
	}
}
