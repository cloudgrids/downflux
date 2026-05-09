import { ProviderType } from '@app/shared';
import { DefaultParser } from './DefaultParser';
import { OkPornParser } from './OkPornParser';
import { PornHubParser } from './PornHubParser';
import { TnAFlixParser } from './TnAFlixParser';
import { WallHavenParser } from './WallHavenParser';
import { XHamsterParser } from './XHamsterParser';

export class ParserRegistry {
	private static readonly parsers: Record<ProviderType, DefaultParser> = {
		[ProviderType.OkPorn]: new OkPornParser(),
		[ProviderType.PornHub]: new PornHubParser(),
		[ProviderType.WallHaven]: new WallHavenParser(),
		[ProviderType.Coomer]: new DefaultParser(),
		[ProviderType.Default]: new DefaultParser(),
		[ProviderType.XHamster]: new XHamsterParser(),
		[ProviderType.TnAFlix]: new TnAFlixParser()
	};

	public static getParser(providerType: ProviderType): DefaultParser {
		return this.parsers[providerType] ?? this.parsers[ProviderType.Default];
	}
}
