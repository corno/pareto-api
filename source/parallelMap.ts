
import {
    Promise as UnsafePromise,
    wrap as wrap
} from "./unsafePromise"

export function parallelMap<ResultType, ErrorType>(promises: Array<UnsafePromise<ResultType, ErrorType>>): UnsafePromise<ResultType[], ErrorType[]> {
    let isExecuted = false
    function execute(onErrors: (errors: ErrorType[]) => void, onSuccess: (results: ResultType[]) => void) {
        if (isExecuted === true) {
            throw new Error("all promise is already executed")
        }
        isExecuted = true
        let resolvedCount = 0
        const results: ResultType[] = []
        const errors: ErrorType[] = []

        function wrapupIfComplete() {

            if (resolvedCount > promises.length) {
                const err = new Error("promises are called back more than once")
                throw err
            }
            if (resolvedCount === promises.length) {
                if (errors.length > 0) {
                    onErrors(errors)
                } else {
                    onSuccess(results)
                }
            }
        }
        if (promises.length === 0) {
            wrapupIfComplete()
        } else {
            promises.forEach((promise, index) => {
                (() => {
                    promise.handle(
                        error => {
                            errors.push(error)
                            resolvedCount += 1
                            wrapupIfComplete()
                        },
                        result => {
                            results[index] = result
                            resolvedCount += 1
                            wrapupIfComplete()
                        }
                    )
                })()

            })
        }
    }
    return wrap(execute)
}
