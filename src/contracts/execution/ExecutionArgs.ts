// util/interfaces/ExecutionArgs.ts

import { ExecutionType, ProviderType, UrlType } from '@app/shared';
import { ExecutionShape } from '@app/types';
import { ExecutionOptions } from './ExecutionOptions';

export interface ExecutionArgs<S extends ExecutionShape = ExecutionShape> extends ExecutionOptions {
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
