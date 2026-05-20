import { DefaultExecutionResult, DefaultFlashVarsVideoOutput, ExecutionArgs } from '@contracts';

export interface TheyAreHugeExecArgs extends ExecutionArgs {}
export interface TheyAreHugeOutput extends DefaultExecutionResult, TheyAreHugeVideoOutput {}

export interface TheyAreHugeVideoOutput extends DefaultFlashVarsVideoOutput {}
