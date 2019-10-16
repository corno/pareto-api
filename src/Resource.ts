import { ISafePromise, IUnsafePromise } from "./Promise"

export interface ISafeOpenedResource<ResourceType> {
    readonly resource: ResourceType
    close(): void
}

export interface IUnsafeOpenedResource<ResourceType, CloseError> {
    readonly resource: ResourceType
    readonly close: IUnsafePromise<null, CloseError>
}

export type ISafeResource<ResourceType> = ISafePromise<ISafeOpenedResource<ResourceType>>
export type IUnsafeResource<ResourceType, OpenError, CloseError> = IUnsafePromise<IUnsafeOpenedResource<ResourceType, CloseError>, OpenError>
export type IUnsafeOnOpenResource<ResourceType, OpenError> = IUnsafePromise<ISafeOpenedResource<ResourceType>, OpenError>
export type IUnsafeOnCloseResource<ResourceType, CloseError> = ISafePromise<IUnsafeOpenedResource<ResourceType, CloseError>>
