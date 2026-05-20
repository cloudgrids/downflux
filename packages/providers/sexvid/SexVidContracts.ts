import { DefaultExecutionResult, DefaultFlashVarsVideoOutput, ExecutionArgs } from '@contracts';

export interface SexVidExecArgs extends ExecutionArgs {}
export interface SexVidOutput extends DefaultExecutionResult, SexVidVideoOutput {}

export interface SexVidVideoOutput extends DefaultFlashVarsVideoOutput {}
