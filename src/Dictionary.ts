import {
    IInSafeLookup,
    IInUnsafeLookup,
    SafeEntryDoesNotExistError,
    UnsafeEntryDoesNotExistError,
} from "./Lookup"
import {
    IInSafePromise,
    IInUnsafePromise,
} from "./Promise"
import {
    IInStream,
} from "./Stream"


export type TwoWayError = {
    entryDoesNotExist: boolean
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
export interface IInUnsafeLooseDictionary<CreateData, OpenData, CustomErrorType> {
    readonly getKeys: null | (() => IInUnsafePromise<IInStream<string>, CustomErrorType>)

    readonly getEntry: null | ((dbName: string) => IInUnsafePromise<OpenData, UnsafeEntryDoesNotExistError<CustomErrorType>>)

    readonly createEntry: null | ((dbName: string, data: CreateData) => IInUnsafePromise<null, UnsafeEntryAlreadyExistsError<CustomErrorType>>)
    readonly deleteEntry: null | ((dbName: string) => IInUnsafePromise<null, UnsafeEntryDoesNotExistError<CustomErrorType>>)
    readonly renameEntry: null | ((oldName: string, newName: string) => IInUnsafePromise<null, UnsafeTwoWayError<CustomErrorType>>)
    readonly copyEntry: null | ((oldName: string, newName: string) => IInUnsafePromise<null, UnsafeTwoWayError<CustomErrorType>>)
}

/**
 * an interface that gives access to a Dictionary with methods without guaranteed success. If it fails, a custom error is returned.
 * the provider must implement all of the functions
 */
export interface IInUnsafeStrictDictionary<CreateData, OpenData, CustomErrorType> extends IInUnsafeLookup<OpenData, CustomErrorType> {
    readonly getKeys: () => IInUnsafePromise<IInStream<string>, CustomErrorType>

    readonly createEntry: (dbName: string, data: CreateData) => IInUnsafePromise<null, UnsafeEntryAlreadyExistsError<CustomErrorType>>
    readonly deleteEntry: (dbName: string) => IInUnsafePromise<null, UnsafeEntryDoesNotExistError<CustomErrorType>>
    readonly renameEntry: (oldName: string, newName: string) => IInUnsafePromise<null, UnsafeTwoWayError<CustomErrorType>>
    readonly copyEntry: (oldName: string, newName: string) => IInUnsafePromise<null, UnsafeTwoWayError<CustomErrorType>>
}

//Safe

export type SafeEntryAlreadyExistsError = null

export type SafeTwoWayError = TwoWayError

/**
 * an interface that gives access to a Dictionary with guaranteed success
 * the provider can choose to implement only a subset of the functions, therefor all functions have a 'null' alternative
 */
export interface IInSafeLooseDictionary<CreateData, OpenData> {
    readonly getKeys: null | (() => IInSafePromise<IInStream<string>>)

    readonly getEntry: null | ((dbName: string) => IInUnsafePromise<OpenData, SafeEntryDoesNotExistError>)

    readonly createEntry: null | ((dbName: string, data: CreateData) => IInUnsafePromise<null, SafeEntryAlreadyExistsError>)
    readonly deleteEntry: null | ((dbName: string) => IInUnsafePromise<null, SafeEntryDoesNotExistError>)
    readonly renameEntry: null | ((oldName: string, newName: string) => IInUnsafePromise<null, SafeTwoWayError>)
    readonly copyEntry: null | ((oldName: string, newName: string) => IInUnsafePromise<null, SafeTwoWayError>)
}

/**
 * an interface that gives access to a Dictionary with guaranteed success
 * the provider must implement all of the functions
 */
export interface IInSafeStrictDictionary<CreateData, OpenData> extends IInSafeLookup<OpenData> {
    readonly getKeys: () => IInSafePromise<IInStream<string>>

    readonly createEntry: (dbName: string, data: CreateData) => IInUnsafePromise<null, SafeEntryAlreadyExistsError>
    readonly deleteEntry: (dbName: string) => IInUnsafePromise<null, SafeEntryDoesNotExistError>
    readonly renameEntry: (oldName: string, newName: string) => IInUnsafePromise<null, SafeTwoWayError>
    readonly copyEntry: (oldName: string, newName: string) => IInUnsafePromise<null, SafeTwoWayError>
}

