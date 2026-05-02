import { HttpFetcherService } from '../fetcher';
import { ExecutionArgs, ServiceType } from '../util';
import { BaseTransformer } from './BaseTransformer';
import { OkPornTransformer } from './OkPornTransformer';
import { WallHavenTransformer } from './WallHavenTransformer';

type TransformerCtor = new (http: HttpFetcherService) => BaseTransformer<any, any>;

export class TransformerService {
	private readonly transformers: Record<ServiceType, TransformerCtor> = {
		[ServiceType.OKPORN]: OkPornTransformer,
		[ServiceType.WALLHAVEN]: WallHavenTransformer,
		[ServiceType.DEFAULT]: BaseTransformer,
		[ServiceType.COOMER]: BaseTransformer
	};

	constructor(private readonly httpFetcherService: HttpFetcherService) {}

	public async transform<TResult, TArgs extends ExecutionArgs>(url: string, request: TArgs): Promise<TResult> {
		const serviceType = request.service ?? ServiceType.DEFAULT;

		const TransformerClass = this.transformers[serviceType] ?? this.transformers[ServiceType.DEFAULT];

		const transformer = new TransformerClass(this.httpFetcherService);

		return (await transformer.transform(url, request)) as TResult;
	}
}
