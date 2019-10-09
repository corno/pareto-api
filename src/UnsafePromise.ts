import {
    ISafePromise,
    SafeWrappedOrUnwrapped
} from "./SafePromise"


export type UnsafeWrappedOrUnwrapped<ResultType, ErrorType> = [ "success", ResultType ] | [ "error", ErrorType ] | IUnsafePromise<ResultType, ErrorType>

export interface IUnsafePromise<ResultType, ErrorType> {
    rework<NewResultType, NewErrorType>(
        onError: (error: ErrorType) => UnsafeWrappedOrUnwrapped<NewResultType, NewErrorType>,
        onSuccess: (result: ResultType) => UnsafeWrappedOrUnwrapped<NewResultType, NewErrorType>
    ): IUnsafePromise<NewResultType, NewErrorType>
    catch<NewResultType>(
        onError: (error: ErrorType) => SafeWrappedOrUnwrapped<NewResultType>,
        onSuccess: (result: ResultType) => SafeWrappedOrUnwrapped<NewResultType>
    ): ISafePromise<NewResultType>
    map<NewResultType>(onSuccess: (result: ResultType) => UnsafeWrappedOrUnwrapped<NewResultType, ErrorType>): IUnsafePromise<NewResultType, ErrorType>
    handle(onError: (error: ErrorType) => void, onSuccess: (result: ResultType) => void): void
}
