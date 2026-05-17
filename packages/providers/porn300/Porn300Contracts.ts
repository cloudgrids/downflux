import { DefaultExecutionResult, DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface Porn300ExecArgs extends ExecutionArgs {}

export interface Porn300Output extends DefaultExecutionResult, Porn300VideoOutput {}

export interface Porn300VideoOutput extends DefaultVideoOutput {}
