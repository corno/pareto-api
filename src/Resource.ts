/**
 * an opened resource that will not have an error on closing
 */
export interface IInSafeOpenedResource<ResourceType> {
    readonly resource: ResourceType
    closeSafeOpenedResource(): void
}

/**
 * an opened resource that can have an error on closing
 */
export interface IInUnsafeOpenedResource<ResourceType, CloseError> {
    readonly resource: ResourceType
    /**
     * @param onError onError will be called if an error occurred when the resource was closed
     */
    closeUnsafeOpenedResource(onError: (error: CloseError) => void): void
}

/**
 * a resource that will not have an error during opening
 */
export interface IInSafeOpenableResource<OpenedResource> {
    /**
     * @param onOpened this callback will be called when the resource was opened
     */
    openSafeOpenableResource(onOpened: (openedResource: OpenedResource) => void): void
}

/**
 * a resource that can have an error on opening
 */
export interface IInUnsafeOpenableResource<OpenedResource, OpenError> {
    /**
     * @param onError this callback will be called if an error occurred when the resource was opened
     * @param onOpened this callback will be called when the resource was successfully opened
     */
    openUnsafeOpenableResource(onError: (openError: OpenError) => void, onOpened: (openedResource: OpenedResource) => void): void
}

/**
 * a resource that that does not throw errors either on opening or closing
 */
export interface IInSafeResource<ResourceType> extends IInSafeOpenableResource<IInSafeOpenedResource<ResourceType>> {}

/**
 * a resource that can throw errors on both opening and closing
 * This is a tricky resource because closing errors will occur after the resource has been used and therefor normally will not influence the execution path
 * The question is often: what should be done with the closing error
 */
export interface IInUnsafeResource<ResourceType, OpenError, CloseError> extends IInUnsafeOpenableResource<IInUnsafeOpenedResource<ResourceType, CloseError>, OpenError> {}

/**
 * a resource that can throw errors on opening but not on closing
 */
export interface IInUnsafeOnOpenResource<ResourceType, OpenError> extends IInUnsafeOpenableResource<IInSafeOpenedResource<ResourceType>, OpenError> {}

/**
 * a resource that can throw errors on closing but not on opening. This case is quite exceptional but added for completeness
 */
export interface IInUnsafeOnCloseResource<ResourceType, CloseError> extends IInSafeOpenableResource<IInUnsafeOpenedResource<ResourceType, CloseError>> {}
