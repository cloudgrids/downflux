import { DefaultExecutionResult, DefaultFlashVarsVideoOutput, ExecutionArgs } from '@contracts';

export interface BoKepPornExecArgs extends ExecutionArgs {}
export interface BoKepPornOutput extends DefaultExecutionResult, BoKepPornVideoOutput {}

export interface BoKepPornVideoOutput extends DefaultFlashVarsVideoOutput {}
