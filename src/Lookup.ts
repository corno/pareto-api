import { IUnsafePromise } from "./Promise";

export type SafeEntryDoesNotExistError = null

export interface ISafeLookup<Type> {
    getEntry(
        entryName: string,
    ): IUnsafePromise<Type, SafeEntryDoesNotExistError>
}

export type UnsafeEntryDoesNotExistError<ErrorType> =
    ["entry does not exist"]
    |
    ["custom", ErrorType]

export interface IUnsafeLookup<Type, ErrorType> {
    getEntry(
        entryName: string,
    ): IUnsafePromise<Type, UnsafeEntryDoesNotExistError<ErrorType>>
}
