import { ISafePromise } from "./SafePromise"

export interface ISafePromiseBuilder {
    result<ResultType>(result: ResultType): ISafePromise<ResultType>
}
