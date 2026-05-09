import { ProviderType } from '@app/shared';
import { DefaultParser } from './DefaultParser';
import { OkPornParser } from './OkPornParser';
import { PornHubParser } from './PornHubParser';
import { TnAFlixParser } from './TnAFlixParser';
import { WallHavenParser } from './WallHavenParser';
import { XHamsterParser } from './XHamsterParser';

export class ParserRegistry {
	private static readonly parsers: Record<ProviderType, DefaultParser> = {
		[ProviderType.Coomer]: new DefaultParser(),
		[ProviderType.Default]: new DefaultParser(),
		[ProviderType.OkPorn]: new OkPornParser(),
		[ProviderType.PornHub]: new PornHubParser(),
		[ProviderType.TnAFlix]: new TnAFlixParser(),
		[ProviderType.WallHaven]: new WallHavenParser(),
		[ProviderType.XHamster]: new XHamsterParser()
	};

	public static getParser(providerType: ProviderType): DefaultParser {
		return this.parsers[providerType] ?? this.parsers[ProviderType.Default];
	}
}
