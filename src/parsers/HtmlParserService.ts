import { ServiceType } from '../util';
import { BaseParserService } from './BaseParserService';
import { OkPornParserService } from './OkPornParserService';
import { PornHubParserService } from './PornHubParserService';
import { WallHavenParserService } from './WallHavenParserService';
import { XHamsterParserService } from './XHamsterParserService';
import { TnAFlixParserService } from './TnAFlixParserService';

export class HtmlParserService {
	private static readonly parsers: Record<ServiceType, BaseParserService> = {
		[ServiceType.OkPorn]: new OkPornParserService(),
		[ServiceType.PornHub]: new PornHubParserService(),
		[ServiceType.WallHaven]: new WallHavenParserService(),
		[ServiceType.Coomer]: new BaseParserService(),
		[ServiceType.Default]: new BaseParserService(),
		[ServiceType.XHamster]: new XHamsterParserService(),
		[ServiceType.TnAFlix]: new TnAFlixParserService()
	};

	public static getParser(service: ServiceType): BaseParserService {
		return this.parsers[service] ?? this.parsers[ServiceType.Default];
	}
}
