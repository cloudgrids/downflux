import { DefaultExecutionResult, DefaultFlashVarsVideoOutput, ExecutionArgs } from '@contracts';

export interface DaNudeExecArgs extends ExecutionArgs {}
export interface DaNudeOutput extends DefaultExecutionResult, DaNudeVideoOutput {}

export interface DaNudeVideoOutput extends DefaultFlashVarsVideoOutput {}
