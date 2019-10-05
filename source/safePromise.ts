import {
    Promise as UnsafePromise,
    PromiseBuilder as UnsafePromiseBuilder,
    CallerFunction as UnsafeCallerFunction,
    wrap as wrapInUnsafePromise,
    promiseBuilder as unsafeBuilder
} from "./unsafePromise"

export type Promise<ResultType> = {
    handle(onResult: (result: ResultType) => void): void
    map<NewResultType>(onResult: (result: ResultType, pBuilder: PromiseBuilder) => Promise<NewResultType>): Promise<NewResultType>
    try<NewResultType, ErrorType>(onResult: (result: ResultType, pBuilder: UnsafePromiseBuilder) => UnsafePromise<NewResultType, ErrorType>): UnsafePromise<NewResultType, ErrorType>
}

export type PromiseBuilder = {
    readonly result: <ResultType>(result: ResultType) => Promise<ResultType>
}


export type CallerFunction<ResultType> = (onResult: (result: ResultType) => void) => void

export const psBuilder: PromiseBuilder = {
    result: <ResultType>(result: ResultType) => {
        const handler: CallerFunction<ResultType> = (onResult: (result: ResultType) => void) => {
            onResult(result)
        }
        return wrap<ResultType>(handler)
    },
}

export function wrap<ResultType>(callerFunction: CallerFunction<ResultType>): Promise<ResultType> {
    let isCalled = false

    const p: Promise<ResultType> = {
        handle: onSuccess => {
            if (isCalled) { throw new Error("already called") }
            isCalled = true
            callerFunction(onSuccess)
        },
        map: <NewResultType>(onResult: (result: ResultType, pBuilder: PromiseBuilder) => Promise<NewResultType>) => {
            if (isCalled) { throw new Error("already called") }
            isCalled = true
            const newFunc: CallerFunction<NewResultType> = newOnResult => {
                callerFunction(
                    res => {
                        onResult(res, psBuilder).handle(newOnResult)
                    }
                )
            }
            return wrap(newFunc)
        },
        try: <NewResultType, ErrorType>(onResult: (result: ResultType, pBuilder: UnsafePromiseBuilder) => UnsafePromise<NewResultType, ErrorType>) => {
            if (isCalled) { throw new Error("already called") }
            isCalled = true
            const newFunc: UnsafeCallerFunction<NewResultType, ErrorType> = (onError, onSuccess) => {
                callerFunction(
                    res => {
                        onResult(res, unsafeBuilder).handle(onError, onSuccess)
                    }
                )
            }
            return wrapInUnsafePromise(newFunc)
        },
    }
    return p
}