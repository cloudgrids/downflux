import { DefaultExecutionResult, DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface CumLouderExecArgs extends ExecutionArgs {}
export interface CumLouderOutput extends DefaultExecutionResult, CumLouderVideoOutput {}

export interface CumLouderVideoOutput extends DefaultVideoOutput {}
