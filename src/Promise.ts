
export interface ISafePromise<ResultType> {
    handle(onResult: (result: ResultType) => void): void
}

export interface IUnsafePromise<ResultType, ErrorType> {
    handle(onError: (error: ErrorType) => void, onSuccess: (result: ResultType) => void): void
}
