import { ISafePromiseBuilder } from "./SafePromiseBuilder"
import { IUnsafePromise } from "./UnsafePromise"
import { IUnsafePromiseBuilder } from "./UnsafePromiseBuilder"

export interface ISafePromise<ResultType> {
    handle(onResult: (result: ResultType) => void): void
    map<NewResultType>(onResult: (result: ResultType, pBuilder: ISafePromiseBuilder) => ISafePromise<NewResultType>): ISafePromise<NewResultType>
    try<NewResultType, ErrorType>(onResult: (result: ResultType, pBuilder: IUnsafePromiseBuilder) => IUnsafePromise<NewResultType, ErrorType>): IUnsafePromise<NewResultType, ErrorType>
}
