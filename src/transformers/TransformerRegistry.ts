import { HtmlClient } from '@app/clients';
import { ExecutionArgs } from '@app/contracts';
import { ProgressManager } from '@app/progress';
import { ProviderType } from '@app/shared';
import { DefaultTransformer } from './DefaultTransformer';
import { HqPornTransformer } from './HqPornTransformer';
import { OkPornTransformer } from './OkPornTransformer';
import { PornHubTransformer } from './PornHubTransformer';
import { TnAFlixTransformer } from './TnAFlixTransformer';
import { WallHavenTransformer } from './WallHavenTransformer';
import { XHamsterTransformer } from './XHamsterTransformer';

type TransformerCtor = new (html: HtmlClient, progress: ProgressManager) => DefaultTransformer<any, any>;

export class TransformerRegistry {
	private readonly transformers: Record<ProviderType, TransformerCtor> = {
		[ProviderType.Coomer]: DefaultTransformer,
		[ProviderType.Default]: DefaultTransformer,
		[ProviderType.HqPorn]: HqPornTransformer,
		[ProviderType.OkPorn]: OkPornTransformer,
		[ProviderType.PornHub]: PornHubTransformer,
		[ProviderType.TnAFlix]: TnAFlixTransformer,
		[ProviderType.WallHaven]: WallHavenTransformer,
		[ProviderType.XHamster]: XHamsterTransformer
	};

	constructor(
		private readonly htmlClient: HtmlClient,
		private readonly progressManager: ProgressManager
	) {}

	public async transform<TArgs extends ExecutionArgs, TResult>(url: string, request: TArgs): Promise<TResult> {
		const provider = request.provider ?? ProviderType.Default;

		const TransformerClass = this.transformers[provider] ?? this.transformers[ProviderType.Default];

		const transformer = new TransformerClass(this.htmlClient, this.progressManager);

		return (await transformer.transform(url, request)) as TResult;
	}
}
