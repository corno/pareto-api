import { Promise as UnsafePromise, wrap as wrap } from "./unsafePromise"

export function serialMap<Input, Result, ErrorType>(input: Input[], handler: (input: Input) => UnsafePromise<Result, ErrorType>): UnsafePromise<Result[], ErrorType[]> {
    function execute(onError: (error: ErrorType[]) => void, onSuccess: (results: Result[]) => void) {
        let i = 0
        const results: Result[] = []
        const errors: ErrorType[] = []
        function processNext() {
            if (i < input.length) {
                handler(input[i]).handle(
                    error => {
                        errors.push(error)
                        i += 1
                        processNext()
                    },
                    output => {
                        results.push(output)
                        i += 1
                        processNext()
                    }
                )
            } else {
                if (errors.length > 0) {
                    onError(errors)
                }
                onSuccess(results)
            }
        }
        processNext()
    }
    return wrap(execute)
}
