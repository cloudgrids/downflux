import { BaseProvider } from '@base';
import { ProviderType } from '@types';
import { SexVidExecArgs } from './SexVidContracts';

export class SexVidProvider extends BaseProvider<SexVidExecArgs> {
	protected readonly provider = ProviderType.SexVid;

	constructor(url: string) {
		super(url, {
			provider: ProviderType.SexVid,
			urlPattern: /implementation$/i
		});
	}
}
