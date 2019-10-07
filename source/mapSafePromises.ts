
import { SafePromise, wrapSafeFunction } from "./SafePromise"

export enum SafeMapExecutionType {
    parallel,
    serial,
}

export function mapSafePromises<ResultType>(execution: SafeMapExecutionType, promises: Array<SafePromise<ResultType>>): SafePromise<ResultType[]> {
    let isExecuted = false
    function execute(onResult: (results: ResultType[]) => void) {
        if (isExecuted === true) {
            throw new Error("all promise is already executed")
        }
        isExecuted = true
        let resolvedCount = 0
        const results: ResultType[] = []

        function wrapup() {

            if (resolvedCount > promises.length) {
                const err = new Error("promises are called back more than once")
                throw err
            }
            if (resolvedCount === promises.length) {
                onResult(results)
            }
        }
        if (promises.length === 0) {
            wrapup()
        } else {
            switch (execution) {
                case SafeMapExecutionType.parallel: {
                    promises.forEach((promise, index) => {
                        (() => {
                            promise.handle(
                                result => {
                                    results[index] = result
                                    resolvedCount += 1
                                    wrapup()
                                }
                            )
                        })()
                    })
                    break
                }
                case SafeMapExecutionType.serial: {
                    function processNext() {
                        if (resolvedCount < promises.length) {
                            promises[resolvedCount].handle(
                                output => {
                                    results.push(output)
                                    resolvedCount += 1
                                    wrapup()
                                    processNext()
                                }
                            )
                        }
                    }
                    processNext()
                    break
                }
            }
        }
    }
    return wrapSafeFunction(execute)
}
