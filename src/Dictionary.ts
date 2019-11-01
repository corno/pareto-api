import { ISafeLookup, IUnsafeLookup, SafeEntryDoesNotExistError, UnsafeEntryDoesNotExistError } from "./Lookup"
import { ISafePromise, IUnsafePromise } from "./Promise"
import { IStream } from "./Stream"


export type TwoWayError = {
    entryDoesNotExist: boolean,
    entryAlreadyExists: boolean | null
}

//Unsafe

export type UnsafeEntryAlreadyExistsError<ErrorType> =
    ["entry already exists"]
    |
    ["custom", ErrorType]


export type UnsafeTwoWayError<ErrorType> =
    ["twoway", TwoWayError]
    |
    ["custom", ErrorType]

/**
 * an interface that gives access to a Dictionary with methods without guaranteed success. If it fails, a custom error is returned.
 * The provider can choose to implement only a subset of the functions, therefor all methods have a 'null' alternative
 */
export interface IUnsafeLooseDictionary<CreateData, OpenData, CustomErrorType> {
    readonly getKeys: null | (() => IUnsafePromise<IStream<string>, CustomErrorType>)

    readonly getEntry: null | ((dbName: string) => IUnsafePromise<OpenData, UnsafeEntryDoesNotExistError<CustomErrorType>>)

    readonly createEntry: null | ((dbName: string, data: CreateData) => IUnsafePromise<null, UnsafeEntryAlreadyExistsError<CustomErrorType>>)
    readonly deleteEntry: null | ((dbName: string) => IUnsafePromise<null, UnsafeEntryDoesNotExistError<CustomErrorType>>)
    readonly renameEntry: null | ((oldName: string, newName: string) => IUnsafePromise<null, UnsafeTwoWayError<CustomErrorType>>)
    readonly copyEntry: null | ((oldName: string, newName: string) => IUnsafePromise<null, UnsafeTwoWayError<CustomErrorType>>)
}

/**
 * an interface that gives access to a Dictionary with methods without guaranteed success. If it fails, a custom error is returned.
 * the provider must implement all of the functions
 */
export interface IUnsafeStrictDictionary<CreateData, OpenData, CustomErrorType> extends IUnsafeLookup<OpenData, CustomErrorType> {
    readonly getKeys: () => IUnsafePromise<IStream<string>, CustomErrorType>

    readonly createEntry: (dbName: string, data: CreateData) => IUnsafePromise<null, UnsafeEntryAlreadyExistsError<CustomErrorType>>
    readonly deleteEntry: (dbName: string) => IUnsafePromise<null, UnsafeEntryDoesNotExistError<CustomErrorType>>
    readonly renameEntry: (oldName: string, newName: string) => IUnsafePromise<null, UnsafeTwoWayError<CustomErrorType>>
    readonly copyEntry: (oldName: string, newName: string) => IUnsafePromise<null, UnsafeTwoWayError<CustomErrorType>>
}

//Safe

export type SafeEntryAlreadyExistsError = null

export type SafeTwoWayError = TwoWayError

/**
 * an interface that gives access to a Dictionary with guaranteed success
 * the provider can choose to implement only a subset of the functions, therefor all functions have a 'null' alternative
 */
export interface ISafeLooseDictionary<CreateData, OpenData> {
    readonly getKeys: null | (() => ISafePromise<IStream<string>>)

    readonly getEntry: null | ((dbName: string) => IUnsafePromise<OpenData, SafeEntryDoesNotExistError>)

    readonly createEntry: null | ((dbName: string, data: CreateData) => IUnsafePromise<null, SafeEntryAlreadyExistsError>)
    readonly deleteEntry: null | ((dbName: string) => IUnsafePromise<null, SafeEntryDoesNotExistError>)
    readonly renameEntry: null | ((oldName: string, newName: string) => IUnsafePromise<null, SafeTwoWayError>)
    readonly copyEntry: null | ((oldName: string, newName: string) => IUnsafePromise<null, SafeTwoWayError>)
}

/**
 * an interface that gives access to a Dictionary with guaranteed success
 * the provider must implement all of the functions
 */
export interface ISafeStrictDictionary<CreateData, OpenData> extends ISafeLookup<OpenData> {
    readonly getKeys: () => ISafePromise<IStream<string>>

    readonly createEntry: (dbName: string, data: CreateData) => IUnsafePromise<null, SafeEntryAlreadyExistsError>
    readonly deleteEntry: (dbName: string) => IUnsafePromise<null, SafeEntryDoesNotExistError>
    readonly renameEntry: (oldName: string, newName: string) => IUnsafePromise<null, SafeTwoWayError>
    readonly copyEntry: (oldName: string, newName: string) => IUnsafePromise<null, SafeTwoWayError>
}

