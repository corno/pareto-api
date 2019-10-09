import { IUnsafePromise, UnsafeWrappedOrUnwrapped } from "./UnsafePromise"

export type SafeWrappedOrUnwrapped<ResultType> = [ "result", ResultType ] | ISafePromise<ResultType>


export interface ISafePromise<ResultType> {
    handle(onResult: (result: ResultType) => void): void
    map<NewResultType>(onResult: (result: ResultType) => SafeWrappedOrUnwrapped<NewResultType>): ISafePromise<NewResultType>
    try<NewResultType, ErrorType>(onResult: (result: ResultType) => UnsafeWrappedOrUnwrapped<NewResultType, ErrorType>): IUnsafePromise<NewResultType, ErrorType>
}
