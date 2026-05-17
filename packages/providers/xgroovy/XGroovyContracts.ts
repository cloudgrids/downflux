import { DefaultExecutionResult, DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface XGroovyExecArgs extends ExecutionArgs {}
export interface XGroovyOutput extends DefaultExecutionResult, XGroovyVideoOutput {}

export interface XGroovyVideoOutput extends DefaultVideoOutput {
	uploaderId: string;
}
