import { ServiceType } from '../util';
import { BaseParserService } from './BaseParserService';
import { OkPornParserService } from './OkPornParserService';
import { WallHavenParserService } from './WallHavenParserService';

export class HtmlParserService {
	private static readonly parsers: Record<ServiceType, BaseParserService> = {
		[ServiceType.OKPORN]: new OkPornParserService(),
		[ServiceType.WALLHAVEN]: new WallHavenParserService(),
		[ServiceType.DEFAULT]: new BaseParserService(),
		[ServiceType.COOMER]: new BaseParserService()
	};

	public static getParser(service: ServiceType): BaseParserService {
		return this.parsers[service] ?? this.parsers[ServiceType.DEFAULT];
	}
}
