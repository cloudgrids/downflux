// util/interfaces/ExecutionArgs.ts

import { ExecutionType, ServiceType, UrlType } from '../../enums';
import { ExecutionShape } from '../../types';
import { JobOptions } from './JobOptions';

export interface ExecutionArgs<S extends ExecutionShape = ExecutionShape> extends JobOptions {
	service: ServiceType;
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
