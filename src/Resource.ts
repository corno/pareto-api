export interface ISafeOpenedResource<ResourceType> {
    readonly resource: ResourceType
    close(): void
}

export interface IUnsafeOpenedResource<ResourceType, CloseError> {
    readonly resource: ResourceType
    close(onError: (error: CloseError) => void): void
}

export interface ISafeOpenableResource<OpenedResource> {
    open(onOpened: (openedResource: OpenedResource) => void): void
}

export interface IUnsafeOpenableResource<OpenedResource, OpenError> {
    open(onError: (openError: OpenError) => void, onOpened: (openedResource: OpenedResource) => void): void
}


export interface ISafeResource<ResourceType> extends ISafeOpenableResource<ISafeOpenedResource<ResourceType>> {}
export interface IUnsafeResource<ResourceType, OpenError, CloseError> extends IUnsafeOpenableResource<IUnsafeOpenedResource<ResourceType, CloseError>, OpenError> {}
export interface IUnsafeOnOpenResource<ResourceType, OpenError> extends IUnsafeOpenableResource<ISafeOpenedResource<ResourceType>, OpenError> {}
export interface IUnsafeOnCloseResource<ResourceType, CloseError> extends ISafeOpenableResource<IUnsafeOpenedResource<ResourceType, CloseError>> {}
