import { DefaultExecutionResult, DefaultVideoOutput, ExecutionArgs } from '@contracts';

export interface XCafeExecArgs extends ExecutionArgs {}
export interface XCafeOutput extends DefaultExecutionResult, XCafeVideoOutput {}

export interface XCafeVideoOutput extends DefaultVideoOutput {
	uploader: string;
}
