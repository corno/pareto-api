import {
    ISafeLookup,
    IUnsafeLookup,
    SafeEntryDoesNotExistError,
    UnsafeEntryDoesNotExistError,
} from "./Lookup"
import {
    DataOrPromise,
    UnsafeDataOrPromise,
} from "./Promise"
import {
    IStream,
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
export interface IUnsafeLooseDictionary<CreateData, OpenData, CustomErrorType> {
    readonly getKeys: null | (<EndDataType>(endData: EndDataType) => UnsafeDataOrPromise<IStream<string, EndDataType>, CustomErrorType>)

    readonly getEntry: null | ((dbName: string) => UnsafeDataOrPromise<OpenData, UnsafeEntryDoesNotExistError<CustomErrorType>>)

    readonly createEntry: null | ((dbName: string, data: CreateData) => UnsafeDataOrPromise<null, UnsafeEntryAlreadyExistsError<CustomErrorType>>)
    readonly deleteEntry: null | ((dbName: string) => UnsafeDataOrPromise<null, UnsafeEntryDoesNotExistError<CustomErrorType>>)
    readonly renameEntry: null | ((oldName: string, newName: string) => UnsafeDataOrPromise<null, UnsafeTwoWayError<CustomErrorType>>)
    readonly copyEntry: null | ((oldName: string, newName: string) => UnsafeDataOrPromise<null, UnsafeTwoWayError<CustomErrorType>>)
}

/**
 * an interface that gives access to a Dictionary with methods without guaranteed success. If it fails, a custom error is returned.
 * the provider must implement all of the functions
 */
export interface IUnsafeStrictDictionary<CreateData, OpenData, CustomErrorType> extends IUnsafeLookup<OpenData, CustomErrorType> {
    readonly getKeys: <EndDataType> (endData: EndDataType) => UnsafeDataOrPromise<IStream<string, EndDataType>, CustomErrorType>

    readonly createEntry: (dbName: string, data: CreateData) => UnsafeDataOrPromise<null, UnsafeEntryAlreadyExistsError<CustomErrorType>>
    readonly deleteEntry: (dbName: string) => UnsafeDataOrPromise<null, UnsafeEntryDoesNotExistError<CustomErrorType>>
    readonly renameEntry: (oldName: string, newName: string) => UnsafeDataOrPromise<null, UnsafeTwoWayError<CustomErrorType>>
    readonly copyEntry: (oldName: string, newName: string) => UnsafeDataOrPromise<null, UnsafeTwoWayError<CustomErrorType>>
}

//Safe

export type SafeEntryAlreadyExistsError = null

export type SafeTwoWayError = TwoWayError

/**
 * an interface that gives access to a Dictionary with guaranteed success
 * the provider can choose to implement only a subset of the functions, therefor all functions have a 'null' alternative
 */
export interface ISafeLooseDictionary<CreateData, OpenData> {
    readonly getKeys: null | (<EndDataType>(endData: EndDataType) => DataOrPromise<IStream<string, EndDataType>>)

    readonly getEntry: null | ((dbName: string) => UnsafeDataOrPromise<OpenData, SafeEntryDoesNotExistError>)

    readonly createEntry: null | ((dbName: string, data: CreateData) => UnsafeDataOrPromise<null, SafeEntryAlreadyExistsError>)
    readonly deleteEntry: null | ((dbName: string) => UnsafeDataOrPromise<null, SafeEntryDoesNotExistError>)
    readonly renameEntry: null | ((oldName: string, newName: string) => UnsafeDataOrPromise<null, SafeTwoWayError>)
    readonly copyEntry: null | ((oldName: string, newName: string) => UnsafeDataOrPromise<null, SafeTwoWayError>)
}

/**
 * an interface that gives access to a Dictionary with guaranteed success
 * the provider must implement all of the functions
 */
export interface ISafeStrictDictionary<CreateData, OpenData> extends ISafeLookup<OpenData> {
    readonly getKeys: <EndDataType>(endData: EndDataType) => DataOrPromise<IStream<string, EndDataType>>

    readonly createEntry: (dbName: string, data: CreateData) => UnsafeDataOrPromise<null, SafeEntryAlreadyExistsError>
    readonly deleteEntry: (dbName: string) => UnsafeDataOrPromise<null, SafeEntryDoesNotExistError>
    readonly renameEntry: (oldName: string, newName: string) => UnsafeDataOrPromise<null, SafeTwoWayError>
    readonly copyEntry: (oldName: string, newName: string) => UnsafeDataOrPromise<null, SafeTwoWayError>
}

