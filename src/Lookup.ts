import { IUnsafeValue } from "./Value";

export type SafeEntryDoesNotExistError = null

export interface ISafeLookup<Type> {
    getEntry(
        entryName: string,
    ): IUnsafeValue<Type, SafeEntryDoesNotExistError>
}

export type UnsafeEntryDoesNotExistError<ErrorType> =
    ["entry does not exist"]
    |
    ["custom", ErrorType]

export interface IUnsafeLookup<Type, ErrorType> {
    getEntry(
        entryName: string,
    ): IUnsafeValue<Type, UnsafeEntryDoesNotExistError<ErrorType>>
}
