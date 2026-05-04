import { ExecutionArgs } from '../../common';

/**
 * @interface
 * Interface representing the arguments for executing a PornHub-related operation.
 */
export interface PornHubExecArgs extends ExecutionArgs {
	/** Method to execute for PornHub */
	viewKey: string;
}
