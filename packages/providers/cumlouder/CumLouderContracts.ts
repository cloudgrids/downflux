import { DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface CumLouderExecArgs extends ExecutionArgs {}
export interface CumLouderOutput extends CumLouderVideoOutput {}

export interface CumLouderVideoOutput extends DefaultVideoOutput {}
