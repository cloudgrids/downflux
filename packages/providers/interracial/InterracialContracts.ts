import { DefaultExecutionResult, DefaultFlashVarsVideoOutput, ExecutionArgs } from '@contracts';

export interface InterracialExecArgs extends ExecutionArgs {}
export interface InterracialOutput extends DefaultExecutionResult, InterracialVideoOutput {}

export interface InterracialVideoOutput extends DefaultFlashVarsVideoOutput {}
