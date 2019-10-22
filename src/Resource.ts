/**
 * an opened resource that will not have an error on closing
 */
export interface ISafeOpenedResource<ResourceType> {
    readonly resource: ResourceType
    close(): void
}

/**
 * an opened resource that can have an error on closing
 */
export interface IUnsafeOpenedResource<ResourceType, CloseError> {
    readonly resource: ResourceType
    /**
     * 
     * @param onError onError will be called if an error occurred when the resource was closed
     */
    close(onError: (error: CloseError) => void): void
}

/**
 * a resource that will not have an error during opening
 */
export interface ISafeOpenableResource<OpenedResource> {
    /**
     * 
     * @param onOpened this callback will be called when the resource was opened
     */
    open(onOpened: (openedResource: OpenedResource) => void): void
}

/**
 * a resource that can have an error on opening
 */
export interface IUnsafeOpenableResource<OpenedResource, OpenError> {
    /**
     * 
     * @param onError this callback will be called if an error occurred when the resource was opened
     * @param onOpened this callback will be called when the resource was successfully opened
     */
    open(onError: (openError: OpenError) => void, onOpened: (openedResource: OpenedResource) => void): void
}

/**
 * a resource that that does not throw errors either on opening or closing
 */
export interface ISafeResource<ResourceType> extends ISafeOpenableResource<ISafeOpenedResource<ResourceType>> {}

/**
 * a resource that can throw errors on both opening and closing
 * This is a tricky resource because closing errors will occur after the resource has been used and therefor normally will not influence the execution path
 * The question is often: what should be done with the closing error
 */
export interface IUnsafeResource<ResourceType, OpenError, CloseError> extends IUnsafeOpenableResource<IUnsafeOpenedResource<ResourceType, CloseError>, OpenError> {}

/**
 * a resource that can throw errors on opening but not on closing
 */
export interface IUnsafeOnOpenResource<ResourceType, OpenError> extends IUnsafeOpenableResource<ISafeOpenedResource<ResourceType>, OpenError> {}

/**
 * a resource that can throw errors on closing but not on opening. This case is quite exceptional but added for completeness
 */
export interface IUnsafeOnCloseResource<ResourceType, CloseError> extends ISafeOpenableResource<IUnsafeOpenedResource<ResourceType, CloseError>> {}
