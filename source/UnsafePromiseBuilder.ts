
import { UnsafeCallerFunction, UnsafePromise, wrapUnsafeFunction } from "./UnsafePromise"

export class UnsafePromiseBuilder {
    public success<ResultType, ErrorType>(result: ResultType): UnsafePromise<ResultType, ErrorType> {
        const handler: UnsafeCallerFunction<ResultType, ErrorType> = (_onError: (error: ErrorType) => void, onSuccess: (result: ResultType) => void) => {
            onSuccess(result)
        }
        return wrapUnsafeFunction<ResultType, ErrorType>(handler)
    }
    public error<ResultType, ErrorType>(error: ErrorType): UnsafePromise<ResultType, ErrorType> {
        const handler: UnsafeCallerFunction<ResultType, ErrorType> = (onError: (error: ErrorType) => void, _onSuccess: (result: ResultType) => void) => {
            onError(error)
        }
        return wrapUnsafeFunction<ResultType, ErrorType>(handler)
    }
}

export const unsafePromiseBuilder = new UnsafePromiseBuilder()
