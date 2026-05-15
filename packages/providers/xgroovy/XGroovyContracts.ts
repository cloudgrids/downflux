import { DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface XGroovyExecArgs extends ExecutionArgs {}
export interface XGroovyOutput extends XGroovyVideoOutput {}

export interface XGroovyVideoOutput extends DefaultVideoOutput {
	uploaderId: string;
}
