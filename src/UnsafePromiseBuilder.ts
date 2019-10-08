
import { IUnsafePromise } from "./UnsafePromise"

export interface IUnsafePromiseBuilder {
    success<ResultType, ErrorType>(result: ResultType): IUnsafePromise<ResultType, ErrorType>
    error<ResultType, ErrorType>(error: ErrorType): IUnsafePromise<ResultType, ErrorType>
}
