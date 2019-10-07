import { UnsafeCallerFunction, UnsafePromise, wrapUnsafeFunction } from "./UnsafePromise"
import { unsafePromiseBuilder, UnsafePromiseBuilder } from "./UnsafePromiseBuilder"
import { SafePromiseBuilder, safePromiseBuilder } from "./SafePromiseBuilder"

export type SafeCallerFunction<ResultType> = (onResult: (result: ResultType) => void) => void

export class SafePromise<ResultType> {
    private isCalled = false
    private readonly callerFunction: SafeCallerFunction<ResultType>
    constructor(callerFunction: SafeCallerFunction<ResultType>) {
        this.callerFunction = callerFunction
    }
    public handle(onResult: (result: ResultType) => void) {
        if (this.isCalled) { throw new Error("already called") }
        this.isCalled = true
        this.callerFunction(onResult)
    }
    public map<NewResultType>(onResult: (result: ResultType, pBuilder: SafePromiseBuilder) => SafePromise<NewResultType>): SafePromise<NewResultType> {
        if (this.isCalled) { throw new Error("already called") }
        this.isCalled = true
        const newFunc: SafeCallerFunction<NewResultType> = newOnResult => {
            this.callerFunction(
                res => {
                    onResult(res, safePromiseBuilder).handle(newOnResult)
                }
            )
        }
        return wrapSafeFunction(newFunc)
    }
    public try<NewResultType, ErrorType>(onResult: (result: ResultType, pBuilder: UnsafePromiseBuilder) => UnsafePromise<NewResultType, ErrorType>): UnsafePromise<NewResultType, ErrorType> {
        if (this.isCalled) { throw new Error("already called") }
        this.isCalled = true
        const newFunc: UnsafeCallerFunction<NewResultType, ErrorType> = (onError, onSuccess) => {
            this.callerFunction(
                res => {
                    onResult(res, unsafePromiseBuilder).handle(onError, onSuccess)
                }
            )
        }
        return wrapUnsafeFunction(newFunc)
    }
}

export function wrapSafeFunction<ResultType>(callerFunction: SafeCallerFunction<ResultType>): SafePromise<ResultType> {
    return new SafePromise(callerFunction)
}
