import { ISafePromise, IUnsafePromise } from "./Promise"
import { IStream } from "./Stream"


export type TwoWayError = {
    entryDoesNotExist: boolean,
    entryAlreadyExists: boolean | null
}

//Unsafe

export type UnsafeAlreadyExistsError<ErrorType> =
    ["entry already exists"]
    |
    ["custom", ErrorType]


export type UnsafeDoesNotExistError<ErrorType> =
    ["entry does not exist"]
    |
    ["custom", ErrorType]

export type UnsafeTwoWayError<ErrorType> =
    ["twoway", TwoWayError]
    |
    ["custom", ErrorType]

/**
 * an interface that gives access to a Dictionary without guaranteed success
 * the provider can choose to implement only a subset of the functions, therefor all functions have a 'null' alternative
 */
export interface IUnsafeDictionary<CreateData, OpenData, CustomErrorType> {
    readonly getKeys: null | (() => IUnsafePromise<IStream<string>, CustomErrorType>)

    readonly getEntry: null | ((dbName: string) => IUnsafePromise<OpenData, UnsafeDoesNotExistError<CustomErrorType>>)

    readonly createEntry: null | ((dbName: string, data: CreateData) => IUnsafePromise<null, UnsafeAlreadyExistsError<CustomErrorType>>)
    readonly deleteEntry: null | ((dbName: string) => IUnsafePromise<null, UnsafeDoesNotExistError<CustomErrorType>>)
    readonly renameEntry: null | ((oldName: string, newName: string) => IUnsafePromise<null, UnsafeTwoWayError<CustomErrorType>>)
    readonly copyEntry: null | ((oldName: string, newName: string) => IUnsafePromise<null, UnsafeTwoWayError<CustomErrorType>>)
}

//Safe

export type SafeAlreadyExistsError = null

export type SafeDoesNotExistError = null

export type SafeTwoWayError = TwoWayError

/**
 * an interface that gives access to a Dictionary with guaranteed success
 * the provider can choose to implement only a subset of the functions, therefor all functions have a 'null' alternative
 */
export interface ISafeDictionary<CreateData, OpenData> {
    readonly getKeys: null | (() => ISafePromise<IStream<string>>)

    readonly getEntry: null | ((dbName: string) => IUnsafePromise<OpenData, SafeDoesNotExistError>)

    readonly createEntry: null | ((dbName: string, data: CreateData) => IUnsafePromise<null, SafeAlreadyExistsError>)
    readonly deleteEntry: null | ((dbName: string) => IUnsafePromise<null, SafeDoesNotExistError>)
    readonly renameEntry: null | ((oldName: string, newName: string) => IUnsafePromise<null, SafeTwoWayError>)
    readonly copyEntry: null | ((oldName: string, newName: string) => IUnsafePromise<null, SafeTwoWayError>)
}

