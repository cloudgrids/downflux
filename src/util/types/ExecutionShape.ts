export type ExecutionShape = 'single' | 'multiple';

export type InferExecutionShape<T> = T extends any[] ? 'multiple' : 'single';

export type ShapeOutput<T, S extends ExecutionShape> = S extends 'multiple' ? T[] : T;
