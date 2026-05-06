import { HttpFetcherService } from '../fetcher';
import { ProgressService } from '../progress/ProgressService';
import { ExecutionArgs, ServiceType } from '../util';
import { BaseTransformer } from './BaseTransformer';
import { OkPornTransformer } from './OkPornTransformer';
import { PornHubTransformer } from './PornHubTransformer';
import { WallHavenTransformer } from './WallHavenTransformer';

type TransformerCtor = new (http: HttpFetcherService, progress: ProgressService) => BaseTransformer<any, any>;

export class TransformerService {
	private readonly transformers: Record<ServiceType, TransformerCtor> = {
		[ServiceType.OkPorn]: OkPornTransformer,
		[ServiceType.WallHaven]: WallHavenTransformer,
		[ServiceType.Default]: BaseTransformer,
		[ServiceType.Coomer]: BaseTransformer,
		[ServiceType.PornHub]: PornHubTransformer
	};

	constructor(
		private readonly httpFetcherService: HttpFetcherService,
		private readonly progressService: ProgressService
	) {}

	public async transform<TArgs extends ExecutionArgs, TResult>(url: string, request: TArgs): Promise<TResult> {
		const serviceType = request.service ?? ServiceType.Default;

		const TransformerClass = this.transformers[serviceType] ?? this.transformers[ServiceType.Default];

		const transformer = new TransformerClass(this.httpFetcherService, this.progressService);

		return (await transformer.transform(url, request)) as TResult;
	}
}
