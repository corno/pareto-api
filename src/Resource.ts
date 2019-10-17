export interface ISafeOpenedResource<ResourceType> {
    readonly resource: ResourceType
    close(): void
}

export interface IUnsafeOpenedResource<ResourceType, CloseError> {
    readonly resource: ResourceType
    close(onError: (error: CloseError) => void): void
}

export interface ISafeOpenableResource<OpenedResource> {
    open(onOpened: (openResource: OpenedResource) => void): void
}

export interface IUnsafeOpenableResource<OpenedResource, OpenError> {
    open(onError: (openError: OpenError) => void, onOpened: (result: OpenedResource) => void): void
}


export type ISafeResource<ResourceType> = ISafeOpenableResource<ISafeOpenedResource<ResourceType>>
export type IUnsafeResource<ResourceType, OpenError, CloseError> = IUnsafeOpenableResource<IUnsafeOpenedResource<ResourceType, CloseError>, OpenError>
export type IUnsafeOnOpenResource<ResourceType, OpenError> = IUnsafeOpenableResource<ISafeOpenedResource<ResourceType>, OpenError>
export type IUnsafeOnCloseResource<ResourceType, CloseError> = ISafeOpenableResource<IUnsafeOpenedResource<ResourceType, CloseError>>
