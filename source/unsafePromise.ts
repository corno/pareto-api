import {
    Promise as SafePromise,
    PromiseBuilder as SafePromiseBuilder,
    CallerFunction as SafeCallerFunction,
    wrap as wrapInSafePromise,
    psBuilder as safeBuilder
} from "./safePromise"

export type Promise<ResultType, ErrorType> = {
    rework<NewResultType, NewErrorType>(
        onError: (error: ErrorType, pBuilder: PromiseBuilder) => Promise<NewResultType, NewErrorType>,
        onSuccess: (result: ResultType, pBuilder: PromiseBuilder) => Promise<NewResultType, NewErrorType>
    ): Promise<NewResultType, NewErrorType>
    catch<NewResultType>(
        onError: (error: ErrorType, pBuilder: SafePromiseBuilder) => SafePromise<NewResultType>,
        onSuccess: (result: ResultType, pBuilder: SafePromiseBuilder) => SafePromise<NewResultType>
    ): SafePromise<NewResultType>
    map<NewResultType>(onSuccess: (result: ResultType, pBuilder: PromiseBuilder) => Promise<NewResultType, ErrorType>): Promise<NewResultType, ErrorType>
    handle(onError: (error: ErrorType) => void, onSuccess: (result: ResultType) => void): void
}

export type PromiseBuilder = {
    readonly success: <ResultType, ErrorType>(success: ResultType) => Promise<ResultType, ErrorType>,
    readonly error: <ResultType, ErrorType>(error: ErrorType) => Promise<ResultType, ErrorType>
}


export const promiseBuilder: PromiseBuilder = {

    success: <ResultType, ErrorType>(result: ResultType) => {
        const handler: CallerFunction<ResultType, ErrorType> = (_onError: (error: ErrorType) => void, onSuccess: (result: ResultType) => void) => {
            onSuccess(result)
        }
        return wrap<ResultType, ErrorType>(handler)
    },
    error: <ResultType, ErrorType>(error: ErrorType) => {
        const handler: CallerFunction<ResultType, ErrorType> = (onError: (error: ErrorType) => void, _onSuccess: (result: ResultType) => void) => {
            onError(error)
        }
        return wrap<ResultType, ErrorType>(handler)
    },
}

export type CallerFunction<ResultType, ErrorType> = (onError: (error: ErrorType) => void, onResult: (result: ResultType) => void) => void

export function wrap<ResultType, ErrorType>(
    oldStyleFunction: (onError: (error: ErrorType) => void, onResult: (result: ResultType) => void) => void
): Promise<ResultType, ErrorType> {
    let isCalled = false

    const p: Promise<ResultType, ErrorType> = {
        rework: <NewResultType, NewErrorType>(
            onError: (error: ErrorType, pBuilder: PromiseBuilder) => Promise<NewResultType, NewErrorType>,
            onSuccess: (result: ResultType, pBuilder: PromiseBuilder) => Promise<NewResultType, NewErrorType>
        ) => {
            if (isCalled) { throw new Error("already called") }
            isCalled = true
            const newFunc: CallerFunction<NewResultType, NewErrorType> = (newOnError, newOnSuccess) => {
                oldStyleFunction(
                    err => {
                        onError(err, promiseBuilder).handle(newOnError, newOnSuccess)
                    },
                    res => {
                        onSuccess(res, promiseBuilder).handle(newOnError, newOnSuccess)

                    }
                )
            }
            return wrap(newFunc)
        },
        catch: <NewResultType>(
            onError: (error: ErrorType, pBuilder: SafePromiseBuilder) => SafePromise<NewResultType>,
            onSuccess: (result: ResultType, pBuilder: SafePromiseBuilder) => SafePromise<NewResultType>
        ) => {
            if (isCalled) { throw new Error("already called") }
            isCalled = true
            const newFunc: SafeCallerFunction<NewResultType> = onResult => {
                oldStyleFunction(
                    err => {
                        onError(err, safeBuilder).handle(onResult)
                    },
                    res => {
                        onSuccess(res, safeBuilder).handle(onResult)

                    }
                )
            }
            return wrapInSafePromise(newFunc)
        },
        map: <NewResultType>(onSuccess: (result: ResultType, pBuilder: PromiseBuilder) => Promise<NewResultType, ErrorType>) => {
            if (isCalled) { throw new Error("already called") }
            isCalled = true
            const newFunc: CallerFunction<NewResultType, ErrorType> = (newOnError, newOnSuccess) => {
                oldStyleFunction(
                    err => {
                        newOnError(err)
                    },
                    res => {
                        onSuccess(res, promiseBuilder).handle(newOnError, newOnSuccess)

                    }
                )
            }
            return wrap(newFunc)
        },
        handle: (onError, onSuccess) => {

            if (isCalled) { throw new Error("already called") }
            isCalled = true
            oldStyleFunction(onError, onSuccess)
        },
    }
    return p
}
