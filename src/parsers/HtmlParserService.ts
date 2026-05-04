import { ServiceType } from '../util';
import { BaseParserService } from './BaseParserService';
import { OkPornParserService } from './OkPornParserService';
import { PornHubParserService } from './PornHubParserService';
import { WallHavenParserService } from './WallHavenParserService';

export class HtmlParserService {
	private static readonly parsers: Record<ServiceType, BaseParserService> = {
		[ServiceType.OkPorn]: new OkPornParserService(),
		[ServiceType.WallHaven]: new WallHavenParserService(),
		[ServiceType.Default]: new BaseParserService(),
		[ServiceType.Coomer]: new BaseParserService(),
		[ServiceType.PornHub]: new PornHubParserService()
	};

	public static getParser(service: ServiceType): BaseParserService {
		return this.parsers[service] ?? this.parsers[ServiceType.Default];
	}
}
