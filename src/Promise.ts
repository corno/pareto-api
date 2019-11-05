/**
 * a promise that does not have an error state
 */
export interface IInSafePromise<ResultType> {
    handleSafePromise(onResult: (result: ResultType) => void): void
}

/**
 * a promise with an error state
 */
export interface IInUnsafePromise<ResultType, ErrorType> {
    /**
     * @param onError will be called when the promise can not be fulfilled. This is the first parameter as this case is often shorter to handle
     * @param onSuccess will be called if the promise is fulfilled
     */
    handleUnsafePromise(onError: (error: ErrorType) => void, onSuccess: (result: ResultType) => void): void
}
