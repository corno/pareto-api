import {
    ISafePromise,
} from "./SafePromise"
import {
    ISafePromiseBuilder,
} from "./SafePromiseBuilder"
import {
    IUnsafePromiseBuilder,
} from "./UnsafePromiseBuilder"

export interface IUnsafePromise<ResultType, ErrorType> {
    rework<NewResultType, NewErrorType>(
        onError: (error: ErrorType, pBuilder: IUnsafePromiseBuilder) => IUnsafePromise<NewResultType, NewErrorType>,
        onSuccess: (result: ResultType, pBuilder: IUnsafePromiseBuilder) => IUnsafePromise<NewResultType, NewErrorType>
    ): IUnsafePromise<NewResultType, NewErrorType>
    catch<NewResultType>(
        onError: (error: ErrorType, pBuilder: ISafePromiseBuilder) => ISafePromise<NewResultType>,
        onSuccess: (result: ResultType, pBuilder: ISafePromiseBuilder) => ISafePromise<NewResultType>
    ): ISafePromise<NewResultType>
    map<NewResultType>(onSuccess: (result: ResultType, pBuilder: IUnsafePromiseBuilder) => IUnsafePromise<NewResultType, ErrorType>): IUnsafePromise<NewResultType, ErrorType>
    handle(onError: (error: ErrorType) => void, onSuccess: (result: ResultType) => void): void
}
