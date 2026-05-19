import { DefaultExecutionResult, DefaultFlashVarsVideoOutput, ExecutionArgs } from '@contracts';

export interface ItsPornExecArgs extends ExecutionArgs {}
export interface ItsPornOutput extends DefaultExecutionResult, ItsPornVideoOutput {}

export interface ItsPornVideoOutput extends DefaultFlashVarsVideoOutput {}
