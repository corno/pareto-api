/**
 * a promise that does not have an error state
 */
export interface ISafePromise<ResultType> {
    handleSafePromise(onResult: (result: ResultType) => void): void
}

/**
 * a promise with an error state
 */
export interface IUnsafePromise<ResultType, ErrorType> {
    /**
     * @param onError will be called when the promise can not be fulfilled. This is the first parameter as this case is often shorter to handle
     * @param onSuccess will be called if the promise is fulfilled
     */
    handleUnsafePromise(onError: (error: ErrorType) => void, onSuccess: (result: ResultType) => void): void
}

export type DataOrPromise<Type> = [Type] | ISafePromise<Type>

export type UnsafeDataOrPromise<Type, ErrorType> =
    | [true, Type]
    | [false, ErrorType]
    | ISafePromise<Type>