import { IUnsafePromise } from "./Promise";

export type ISafeEntryDoesNotExistError = null

export interface ISafeLookup<Type> {
    getEntry(
        entryName: string,
    ): IUnsafePromise<Type, ISafeEntryDoesNotExistError>
}

export interface IUnsafeEntryDoesNotExistError<ErrorType> {
    handle(
        entryDoesNotExist: () => void,
        customError: (error: ErrorType) => void
    ): void
}

export interface IUnsafeLookup<Type, ErrorType> {
    getEntry(
        entryName: string,
    ): IUnsafePromise<Type, IUnsafeEntryDoesNotExistError<ErrorType>>
}
