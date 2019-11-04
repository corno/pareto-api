import { IUnsafePromise } from "./Promise";

export type SafeEntryDoesNotExistError = null

export interface IInSafeLookup<Type> {
    getEntry(
        entryName: string,
    ): IUnsafePromise<Type, SafeEntryDoesNotExistError>
}

export type UnsafeEntryDoesNotExistError<ErrorType> =
    ["entry does not exist"]
    |
    ["custom", ErrorType]

export interface IInUnsafeLookup<Type, ErrorType> {
    getEntry(
        entryName: string,
    ): IUnsafePromise<Type, UnsafeEntryDoesNotExistError<ErrorType>>
}
