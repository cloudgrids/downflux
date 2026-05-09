// util/interfaces/ExecutionArgs.ts

import { ExecutionType, ProviderType, UrlType } from '@app/shared';
import { ExecutionShape } from '@app/types';
import { JobOptions } from './JobOptions';

export interface ExecutionArgs<S extends ExecutionShape = ExecutionShape> extends JobOptions {
	provider: ProviderType;
	method: string;
	entryUrl: string;
	targets: string[];
	/**
	 * Internal runtime metadata describing
	 * the structural shape of extracted output.
	 *
	 * single   -> TResult
	 * multiple -> TResult[]
	 */
	executionShape: S;

	executionType: ExecutionType;
	urlType: UrlType;
}
