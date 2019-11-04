import { IInUnsafePromise } from "./Promise";

export type SafeEntryDoesNotExistError = null

export interface IInSafeLookup<Type> {
    getEntry(
        entryName: string,
    ): IInUnsafePromise<Type, SafeEntryDoesNotExistError>
}

export type UnsafeEntryDoesNotExistError<ErrorType> =
    ["entry does not exist"]
    |
    ["custom", ErrorType]

export interface IInUnsafeLookup<Type, ErrorType> {
    getEntry(
        entryName: string,
    ): IInUnsafePromise<Type, UnsafeEntryDoesNotExistError<ErrorType>>
}
