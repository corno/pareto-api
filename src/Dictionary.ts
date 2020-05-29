import {
    ISafeLookup,
    IUnsafeLookup,
    SafeEntryDoesNotExistError,
    UnsafeEntryDoesNotExistError,
} from "./Lookup"
import {
    IValue,
    IUnsafeValue,
} from "./Value"
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
    readonly getKeys: null | (() => IUnsafeValue<IStream<
        string, //the key
        null
    >, CustomErrorType>)

    readonly getEntry: null | ((dbName: string) => IUnsafeValue<OpenData, UnsafeEntryDoesNotExistError<CustomErrorType>>)

    readonly createEntry: null | ((dbName: string, data: CreateData) => IUnsafeValue<null, UnsafeEntryAlreadyExistsError<CustomErrorType>>)
    readonly deleteEntry: null | ((dbName: string) => IUnsafeValue<null, UnsafeEntryDoesNotExistError<CustomErrorType>>)
    readonly renameEntry: null | ((oldName: string, newName: string) => IUnsafeValue<null, UnsafeTwoWayError<CustomErrorType>>)
    readonly copyEntry: null | ((oldName: string, newName: string) => IUnsafeValue<null, UnsafeTwoWayError<CustomErrorType>>)
}

/**
 * an interface that gives access to a Dictionary with methods without guaranteed success. If it fails, a custom error is returned.
 * the provider must implement all of the functions
 */
export interface IUnsafeStrictDictionary<CreateData, OpenData, CustomErrorType> extends IUnsafeLookup<OpenData, CustomErrorType> {
    readonly getKeys: () => IUnsafeValue<IStream<
        string, //the key
        null
    >, CustomErrorType>

    readonly createEntry: (dbName: string, data: CreateData) => IUnsafeValue<null, UnsafeEntryAlreadyExistsError<CustomErrorType>>
    readonly deleteEntry: (dbName: string) => IUnsafeValue<null, UnsafeEntryDoesNotExistError<CustomErrorType>>
    readonly renameEntry: (oldName: string, newName: string) => IUnsafeValue<null, UnsafeTwoWayError<CustomErrorType>>
    readonly copyEntry: (oldName: string, newName: string) => IUnsafeValue<null, UnsafeTwoWayError<CustomErrorType>>
}

//Safe

export type SafeEntryAlreadyExistsError = null

export type SafeTwoWayError = TwoWayError

/**
 * an interface that gives access to a Dictionary with guaranteed success
 * the provider can choose to implement only a subset of the functions, therefor all functions have a 'null' alternative
 */
export interface ISafeLooseDictionary<CreateData, OpenData> {
    readonly getKeys: null | (() => IValue<IStream<
        string, //the key
        null // no end data
    >>)

    readonly getEntry: null | ((dbName: string) => IUnsafeValue<OpenData, SafeEntryDoesNotExistError>)

    readonly createEntry: null | ((dbName: string, data: CreateData) => IUnsafeValue<null, SafeEntryAlreadyExistsError>)
    readonly deleteEntry: null | ((dbName: string) => IUnsafeValue<null, SafeEntryDoesNotExistError>)
    readonly renameEntry: null | ((oldName: string, newName: string) => IUnsafeValue<null, SafeTwoWayError>)
    readonly copyEntry: null | ((oldName: string, newName: string) => IUnsafeValue<null, SafeTwoWayError>)
}

/**
 * an interface that gives access to a Dictionary with guaranteed success
 * the provider must implement all of the functions
 */
export interface ISafeStrictDictionary<CreateData, OpenData> extends ISafeLookup<OpenData> {
    readonly getKeys: () => IValue<IStream<
        string, //the key
        null
    >>

    readonly createEntry: (dbName: string, data: CreateData) => IUnsafeValue<null, SafeEntryAlreadyExistsError>
    readonly deleteEntry: (dbName: string) => IUnsafeValue<null, SafeEntryDoesNotExistError>
    readonly renameEntry: (oldName: string, newName: string) => IUnsafeValue<null, SafeTwoWayError>
    readonly copyEntry: (oldName: string, newName: string) => IUnsafeValue<null, SafeTwoWayError>
}

